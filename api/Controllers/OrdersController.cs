using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Model;
using Microsoft.AspNetCore.Authorization;
using api.Data;
using AutoMapper;
using api.Dtos;

namespace api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _repo;
        private readonly IMapper _mapper;
        public OrdersController(IOrderRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        // GET api/orders
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _repo.GetOrders();

            var ordersToReturn = _mapper.Map<IEnumerable<OrdersForListDto>>(orders);

            return Ok(ordersToReturn);
        }

        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetOrdersFromEmployee(int employeeId)
        // {
        //     var ordersFromEmployee = await _repo.GetOrdersFromEmployee(employeeId);

        //     var ordersToReturn = _mapper.Map<IEnumerable<OrdersForListDto>>(ordersFromEmployee);

        //     return Ok(ordersToReturn);
        // }
        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetOrder(int id)
        // {
        //     var order = await _context.Orders.FirstOrDefaultAsync(x => x.OrderId == id);

        //     return Ok(order);
        // }
    }
}