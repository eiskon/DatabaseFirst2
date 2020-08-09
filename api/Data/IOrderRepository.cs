using System.Collections.Generic;
using System.Threading.Tasks;
using api.Model;

namespace api.Data
{
    public interface IOrderRepository
    {
        Task<List<Orders>> GetOrders();
        Task<Orders> GetOrder(int id);
        // Task<Orders>  UpdateOrder(Orders order);
         
    }
}