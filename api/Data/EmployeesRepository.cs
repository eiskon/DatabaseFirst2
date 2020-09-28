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
        // is not called from frontend on - was only tested with Postmann
        public async Task<OperationResult<IEnumerable<Orders>>> GetOrdersByEmployeeId(int employeeId, Func<Orders, bool> filter)  // #######OK##########
        {
            var ordersResult = await GetEmployee(employeeId);
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

        public async Task<OperationResult<Employees>> GetEmployee(int employeeId) // ##########OK#######
        {
            var employee = _context.Employees.FirstOrDefaultAsync(x => x.EmployeeId == employeeId);

            return await employee == null
                    ? OperationResult<Employees>.Failure(ResultType.NotFound, new { EmployeeId = employeeId })
                    :
                     OperationResult<Employees>.Success(employee.Result);
        }

        public async Task<OperationResult<Employees>> Update(int employeeId, EmployeeForUpdateDto employeeForUpdateDto) // ##########OK#######
        {
            var employeeFromRepo = await GetEmployee(employeeId);

            var employeeToReturn =_mapper.Map(employeeForUpdateDto, employeeFromRepo.Result);

            if (SaveAll())
                return OperationResult<Employees>.Success(employeeToReturn);

            return OperationResult<Employees>.Failure(ResultType.NotFound, new {EmployeeForUpdateDto = employeeForUpdateDto});
        }
    //////////////////////////////////////////////////////////////
        public async Task<OperationResult<PagedList<Employees>>> GetEmployees(EmployeeParams employeeParams)
        {
            var employees =  _context.Employees.Include(o => o.Orders).AsQueryable();

            if (!string.IsNullOrEmpty(employeeParams.LastName)) {
                employees = employees.Where(e => e.LastName.Contains(employeeParams.LastName));
            }
            
            var result = await PagedList<Employees>.CreateAsync(employees, employeeParams.PageNumber, employeeParams.PageSize);

            return OperationResult<PagedList<Employees>>.Success(result);
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}