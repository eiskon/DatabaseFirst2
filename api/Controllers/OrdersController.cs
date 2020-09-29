using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using api.Data;
using AutoMapper;
using api.Dtos;
using api.Helpers;
using api.Filters;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
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
        public async Task<IActionResult> GetOrders([FromQuery]OrderParams orderParams)
        {
            var orders = await _repo.GetOrders(orderParams);

            var ordersToReturn = _mapper.Map<IEnumerable<OrdersForListDto>>(orders);

            Response.AddPagination(orders.CurrentPage, orders.PageSize, orders.TotalCount, orders.TotalPages);

            return Ok(ordersToReturn);
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _repo.GetOrder(id);

            var orderToReturn = _mapper.Map<OrdersForDetailedDto>(order);

            return Ok(orderToReturn);
        }
    }
}   