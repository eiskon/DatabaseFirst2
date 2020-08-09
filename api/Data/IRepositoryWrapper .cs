using System.Threading.Tasks;

namespace api.Data
{
    public interface IRepositoryWrapper 
    {
         IOrderRepository Orders { get; } 
        Task SaveAsync();
    }
}