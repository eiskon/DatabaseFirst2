using System.Collections.Generic;
using System.Threading.Tasks;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class OrderRepository : IOrderRepository
    {
        public readonly NorthwindContext _context;
        public OrderRepository(NorthwindContext context)
        {
            this._context = context;
        }

        Task<Orders> IOrderRepository.GetOrder(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<Orders>> GetOrders()
        {
            List<Orders> orders = await _context.Orders.ToListAsync();

           return orders;
        }
    }
}