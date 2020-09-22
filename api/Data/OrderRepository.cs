using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
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
                .Include("OrderDetails.Product")
                .FirstOrDefaultAsync(o => o.OrderId == id);

            return order;
        }

        public async Task<PagedList<Orders>> GetOrders(OrderParams orderParams)
        {
            var orders =  _context.Orders.FromSqlRaw($"SELECT * FROM getOrders()").Include(e => e.Employee).AsQueryable();

            // var orders = _context.Orders.Include(e => e.Employee).AsQueryable();

            if (!orderParams.EmployeeId.Equals(0)) {
                orders = orders.Where(o => o.EmployeeId == orderParams.EmployeeId);
            }

            return await PagedList<Orders>.CreateAsync(orders, orderParams.PageNumber, orderParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}