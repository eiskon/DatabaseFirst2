using System.Collections.Generic;
using System.Threading.Tasks;
using api.Model;
using api.Helpers;
using api.application;
using System;
using api.Dtos;

namespace api.Data
{
    public interface IEmployeesRepository
    {
         bool SaveAll();
        // Task<PagedList<Employees>> GetEmployees(EmployeeParams employeeParams);
        Task<OperationResult<PagedList<Employees>>> GetEmployees(EmployeeParams employeeParams);
        Task<OperationResult<Employees>> GetEmployee(int id);
        Task<OperationResult<IEnumerable<Orders>>> GetOrdersByEmployeeId(int employeeId, Func<Orders, bool> filter);
        Task<OperationResult<Employees>> Update(int employeeId, EmployeeForUpdateDto employeeForUpdateDto);
         
    }
}