using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Model;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        
        private readonly NorthwindContext _context;
        public CategoriesController(NorthwindContext context)
        {
            _context = context;
        }
        // GET api/employees
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
           var categories = await _context.Categories.ToListAsync();

           return Ok(categories);
        }
    }
}