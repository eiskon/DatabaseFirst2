using System.Collections.Generic;
using System.Threading.Tasks;
using api.Model;
using api.Helpers;
using api.application;
using System;

namespace api.Data
{
    public interface IEmployeesRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         bool SaveAll();
        Task<PagedList<Employees>> GetEmployees(EmployeeParams employeeParams);
        OperationResult<Employees> GetEmployee(int id);
        OperationResult<IEnumerable<Orders>> GetOrdersByEmployeeId(int employeeId, Func<Orders, bool> filter);
         
    }
}