using System.Collections.Generic;
using System.Threading.Tasks;
using api.Model;
using api.Helpers;

namespace api.Data
{
    public interface IEmployeesRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
        Task<PagedList<Employees>> GetEmployees(EmployeeParams employeeParams);
        Task<Employees> GetEmployee(int id);
         
    }
}