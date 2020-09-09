using System;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace api.Helpers
{
    // Diese Klasse wurde getested, ist zur zeit in Startup.cs geaktiviert
    public class LogEmployeeUpdate : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var employeeId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var repo = resultContext.HttpContext.RequestServices.GetService<IEmployeesRepository>();
            var employee = await repo.GetEmployee(employeeId);
            employee.LastUpdate = DateTime.Now;
            await repo.SaveAll();
        }
    }
}