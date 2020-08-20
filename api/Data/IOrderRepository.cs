using System.Collections.Generic;
using System.Threading.Tasks;
using api.Model;

namespace api.Data
{
    public interface IOrderRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
        Task<IEnumerable<Orders>> GetOrders();
        // Task<IEnumerable<Orders>> GetOrdersFromEmployee(int employeeId);
        Task<Orders> GetOrder(int id);
        // Task<Orders>  UpdateOrder(Orders order);
         
    }
}