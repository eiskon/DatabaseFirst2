using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Model;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ProductRepository : IProductRepository
    {
        public readonly NorthwindContext _context;
        public ProductRepository(NorthwindContext context)
        {
            this._context = context;
        }
        // !!! error is output in Postmann: ### System.InvalidOperationException: The required column 'OrderID' was not present in the results of a 'FromSql' operation. ###
        // test again when EF 5.0 is released 
        public async Task<List<Orders>> getCustOrderHist(string custId)
        {
             var result =  _context.Orders.FromSqlRaw($"EXECUTE dbo.CustOrderHist {custId}").AsNoTracking().ToListAsync(); 

            return await result;
        }
    }
}