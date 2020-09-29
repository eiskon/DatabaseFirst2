using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class EmployeesRepository : IEmployeesRepository
    {
        private readonly NorthwindContext _context;

        public EmployeesRepository(NorthwindContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<PagedList<Employees>> GetEmployees(EmployeeParams employeeParams)
        {
            var employees = _context.Employees.Include(o => o.Orders).AsQueryable();

            if (!string.IsNullOrEmpty(employeeParams.LastName)) {
                employees = employees.Where(e => e.LastName.Contains(employeeParams.LastName));
            }
            
            return await PagedList<Employees>.CreateAsync(employees, employeeParams.PageNumber, employeeParams.PageSize);
        }

        public async Task<Employees> GetEmployee(int id)
        {
            var employee = await _context.Employees
                .Include(o => o.Orders)
                .FirstOrDefaultAsync(e => e.EmployeeId == id);

            return employee;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}