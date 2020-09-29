using System;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace api.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ProfileAttribute : Attribute, IActionFilter
    {
        private readonly Stopwatch _watch = new Stopwatch();
        public void OnActionExecuting(ActionExecutingContext context)
        {
            _watch.Start();
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            _watch.Stop();
            System.Console.WriteLine($"executing action: {context.ActionDescriptor.DisplayName} [{_watch.ElapsedMilliseconds}] ms");  
            System.Console.WriteLine($"[{_watch.ElapsedMilliseconds}] ms");
            if (context.Result is OkObjectResult result)
            {
                var wrapped = new 
                {
                    // Elapsed = $"stopping action: {context.ActionDescriptor.DisplayName} [{_watch.ElapsedMilliseconds}] ms",
                    Wrapped = result.Value
                };
                context.Result = new OkObjectResult(wrapped);
            }
        }
    }
}