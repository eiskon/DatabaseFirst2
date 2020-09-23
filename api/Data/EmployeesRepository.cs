using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Model;
using api.application;
using Microsoft.EntityFrameworkCore;
using System;
using AutoMapper;
using api.Dtos;

namespace api.Data
{
    public class EmployeesRepository : IEmployeesRepository
    {
        private readonly NorthwindContext _context;

        private readonly IMapper _mapper;

        public EmployeesRepository(NorthwindContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
    ///////////////////////////////////////////////////////////////
        public OperationResult<IEnumerable<Orders>> GetOrdersByEmployeeId(int employeeId, Func<Orders, bool> filter)
        {
            var ordersResult = GetEmployee(employeeId);
            if (ordersResult.IsSuccess == false)
            {
                return OperationResult<IEnumerable<Orders>>.Failure(ResultType.NotFound, new { EmployeeId = employeeId, Orders = "not found" });
            }

            var result = _context.Orders.Where(filter);

            // var ordersToReturn = _mapper.Map<IEnumerable<EmployeeForDetailedDto>>(result);

            return result.Any() == false
                    ? OperationResult<IEnumerable<Orders>>.Failure(ResultType.NotFound, new { EmployeeId = employeeId, Orders = "not found" })
                    : OperationResult<IEnumerable<Orders>>.Success(result);
        }

        public OperationResult<Employees> GetEmployee(int employeeId)
        {
            var employee = _context.Employees.FirstOrDefaultAsync(x => x.EmployeeId == employeeId);
            return employee == null
                    ? OperationResult<Employees>.Failure(ResultType.NotFound, new { EmployeeId = employeeId })
                    :
                     OperationResult<Employees>.Success(employee.Result);
        }
    //////////////////////////////////////////////////////////////
        public async Task<PagedList<Employees>> GetEmployees(EmployeeParams employeeParams)
        {
            var employees = _context.Employees.Include(o => o.Orders).AsQueryable();

            // employees = employees.Where(e => e.EmployeeId != employeeParams.EmpoyeeId);

            if (!string.IsNullOrEmpty(employeeParams.LastName)) {
                employees = employees.Where(e => e.LastName.Contains(employeeParams.LastName));
            }
            
            return await PagedList<Employees>.CreateAsync(employees, employeeParams.PageNumber, employeeParams.PageSize);
        }

        // public async Task<Employees> GetEmployee(int id)
        // {
        //     var employee = await _context.Employees
        //         .Include(o => o.Orders)
        //         .FirstOrDefaultAsync(e => e.EmployeeId == id);

        //     return employee;
        // }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}