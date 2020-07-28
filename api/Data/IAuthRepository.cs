using System.Threading.Tasks;
using api.Model;

namespace api.Data
{
    public interface IAuthRepository
    {
         Task<Employees> Register(Employees employe , string password);
         Task<Employees> Login(string employename , string password);
         Task<bool> EmployeExists(string employename);
    }
}