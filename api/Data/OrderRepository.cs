using System.Collections.Generic;
using System.Linq;
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

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Orders> GetOrder(int id)
        {
             var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.OrderId == id);

            return order;
        }

        public async Task<IEnumerable<Orders>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(e => e.Employee).ToListAsync();

            return orders;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}