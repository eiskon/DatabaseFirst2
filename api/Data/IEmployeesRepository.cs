using System.Collections.Generic;
using System.Threading.Tasks;
using api.Model;

namespace api.Data
{
    public interface IEmployeesRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
        Task<IEnumerable<Employees>> GetEmployees();
        Task<Employees> GetEmployee(int id);
         
    }
}