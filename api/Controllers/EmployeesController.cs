using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Model;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly NorthwindContext _context;
        public EmployeesController(NorthwindContext context)
        {
            _context = context;
        }
        // GET api/employees
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
           var employees = await _context.Employees.ToListAsync();

           return Ok(employees);
        }
    }
}