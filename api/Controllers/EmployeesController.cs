using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.Data;
using AutoMapper;
using api.Dtos;
using api.Helpers;
using api.application;
using api.Model;

namespace api.Controllers
{
    // [ServiceFilter(typeof(LogEmployeeUpdate))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeesRepository _repo;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeesRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        // GET api/employees
        [HttpGet]
        public async Task<IActionResult> GetEmployees([FromQuery]EmployeeParams employeeParams)
        {
            var employees = await _repo.GetEmployees(employeeParams);

            var employeesToReturn = _mapper.Map<IEnumerable<EmployeeForListDto>>(employees);

            Response.AddPagination(employees.CurrentPage, employees.PageSize, employees.TotalCount, employees.TotalPages);

            return Ok(employeesToReturn);
        }
        
        [HttpGet("{id}", Name = "GetEmployee")]
        public IActionResult GetEmployee(int id)
        {
            var employee = _repo.GetEmployee(id);

            var employeeToReturn = _mapper.Map<EmployeeForDetailedDto>(employee.Result);

            return Ok(employeeToReturn);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, EmployeeForUpdateDto employeeForUpdateDto) 
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var employeeFromRepo = _repo.GetEmployee(id);

            _mapper.Map(employeeForUpdateDto, employeeFromRepo);

            if (_repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating employee {id} faled on save");
        }

        /////////////////////////////////////////////////////////////////
         [HttpPost("{employeeId}/Orders/batch")]
         public ActionResult<IEnumerable<Orders>> CreateBatch(int employeeId, [FromBody] IEnumerable<Orders> inputs)
        {
            var employeeResult = EmployeeUseCases.GetEmployee(employeeId);
            if (employeeResult.IsSuccess == false)
            {
                return OperationResult<IEnumerable<Orders>>.Failure(ResultType.NotFound, new { EmployeeId = employeeId })
                        .ToActionResult();
            }

            var employee = employeeResult.Result;
            var result = inputs.Select(x => EmployeeUseCases.AddToOrders(employee, x).Result);

            return OperationResult<IEnumerable<Orders>>.Success(result).ToActionResult();
        }

        [HttpGet("{employeeId}/Orders/GetAll")]
        public ActionResult<IEnumerable<Orders>> GetAll(int employeeId, [FromQuery]string shipPostalCode)
        {
            Func<Orders, bool> filter = order => order.EmployeeId == employeeId;
            if (string.IsNullOrWhiteSpace(shipPostalCode) == false)
            {
                filter = order => order.EmployeeId == employeeId 
                        && order.ShipPostalCode.Contains(shipPostalCode);
            }


            // var ordersToReturn = _mapper.Map<EmployeeForDetailedDto>(filter);

            return _repo.GetOrdersByEmployeeId(employeeId, filter).ToActionResult();
        }

           [HttpGet("{employeeId}/Orders/{id}")]
        public ActionResult<Orders> GetbyId(int employeeId, int id)
        {
            var orderResult = EmployeeUseCases.GetOrders(employeeId, x => x.EmployeeId == id);

            if (orderResult.IsSuccess)
            {
                return OperationResult<Orders>.Success(orderResult.Result.Single()).ToActionResult();
            }
            else
            {
                return OperationResult<Orders>.Failure(ResultType.NotFound, new 
                {
                    OrderId = id, EmployeeId = employeeId
                }).ToActionResult();
            }
        }

        [HttpPut("{employeeId}/Orders")]
        public ActionResult<Orders> Update(int employeeId, [FromBody]Orders order)
        {
            return EmployeeUseCases.Update(employeeId, order).ToActionResult();
        }

        [HttpDelete("{employeeId}/Orders/{id}")]
        public ActionResult<Orders> Delete(int employeeId, int id)
        {
            return EmployeeUseCases.Delete(employeeId, id).ToActionResult();
        }
    }
}