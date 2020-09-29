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
using api.Filters;

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
        public async Task<IActionResult> GetEmployees([FromQuery]EmployeeParams employeeParams)
        {
            var employees = await _repo.GetEmployees(employeeParams);

            var employeesToReturn = _mapper.Map<IEnumerable<EmployeeForListDto>>(employees);

            Response.AddPagination(employees.CurrentPage, employees.PageSize, employees.TotalCount, employees.TotalPages);

            return Ok(employeesToReturn);
        }
        
        [HttpGet("{id}", Name = "GetEmployee")]
        public async Task<IActionResult> GetEmployee(int? id)
        {
            var employee = await _repo.GetEmployee(id.Value);

            var employeeToReturn = _mapper.Map<EmployeeForDetailedDto>(employee);

            return Ok(employeeToReturn);
        }

        [Profile]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int? id, EmployeeForUpdateDto employeeForUpdateDto) 
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var employeeFromRepo = await _repo.GetEmployee(id.Value);

            _mapper.Map(employeeForUpdateDto, employeeFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating employee {id.Value} faled on save");
        }
    }
}