using System.Collections.Generic;
using System.Threading.Tasks;
using api.Model;

namespace api.Data
{
    public interface IProductRepository
    {
        Task<List<Orders>> getCustOrderHist(string custId);
    }
}