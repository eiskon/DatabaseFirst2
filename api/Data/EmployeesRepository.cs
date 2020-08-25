using System.Collections.Generic;
using System.Threading.Tasks;
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

        public async Task<IEnumerable<Employees>> GetEmployees()
        {
            var employees = await _context.Employees
                .Include(o => o.Orders).ToListAsync();

            return employees;
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