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
    [ApiController]
    [Route("api/[controller]")]
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
        public async Task<ActionResult<IEnumerable<Employees>>> GetEmployees([FromQuery]EmployeeParams employeeParams)
        {
            var employees = await _repo.GetEmployees(employeeParams);

            var employeesToReturn = _mapper.Map<IEnumerable<EmployeeForListDto>>(employees.Result);

            Response.AddPagination(employees.Result.CurrentPage, 
                                employees.Result.PageSize, 
                                employees.Result.TotalCount, 
                                employees.Result.TotalPages);

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
        public ActionResult<IEnumerable<Employees>> UpdateEmployee(int? id, EmployeeForUpdateDto employeeForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            return _repo.Update(id.Value, employeeForUpdateDto).ToActionResult();
        }

        [HttpGet("{employeeId}/Orders/GetAll")]
        public  ActionResult<IEnumerable<Orders>> GetAll(int? employeeId, string shipPostalCode)
        {
            Func<Orders, bool> filter = order => order.EmployeeId == employeeId.Value;
            if (string.IsNullOrWhiteSpace(shipPostalCode) == false)
            {
                filter = order => order.EmployeeId == employeeId.Value 
                        && order.ShipPostalCode.Contains(shipPostalCode);
            }

            return _repo.GetOrdersByEmployeeId(employeeId.Value, filter).ToActionResult();
        }
    }
}