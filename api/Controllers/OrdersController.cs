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
    public class OrdersController : ControllerBase
    {
        private readonly NorthwindContext _context;
        public OrdersController(NorthwindContext context)
        {
            _context = context;
        }
        // GET api/employees
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
           var orders = await _context.Orders.ToListAsync();

           return Ok(orders);
        }
    }
}