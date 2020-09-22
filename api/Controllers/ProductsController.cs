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

namespace api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
     private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        public ProductsController(IProductRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        
        [HttpGet("{custId}", Name = "getCustOrderHist")]
        public async Task<IActionResult> getCustOrderHist(string custId)
        {
            var history = await _repo.getCustOrderHist(custId);

            return Ok(history);
        }
    }
}