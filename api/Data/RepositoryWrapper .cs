using System.Threading.Tasks;
using api.Model;

namespace api.Data
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private NorthwindContext _context;
        private IOrderRepository _orders;

        public IOrderRepository Orders
        {
            get
            {
                if (_orders == null)
                {
                    _orders = new OrderRepository(_context);
                }
                return _orders;
            }
        }
        public RepositoryWrapper(NorthwindContext repositoryContext) 
        { 
            _context = repositoryContext; 
        } 
        
        public async Task SaveAsync() 
        {
            await _context.SaveChangesAsync();
        } 
    }
}