using System.Collections.Generic;
using System.Threading.Tasks;
using api.Model;
using api.Helpers;

namespace api.Data
{
    public interface IOrderRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
        Task<PagedList<Orders>> GetOrders(OrderParams orderParams);
        Task<Orders> GetOrder(int id);
    }
}