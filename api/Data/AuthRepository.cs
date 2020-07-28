using System.Threading.Tasks;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AuthRepository : IAuthRepository
    {
        public readonly NorthwindContext _context;
        public AuthRepository(NorthwindContext context)
        {
            this._context = context;
        }
        public async Task<bool> EmployeExists(string employename)
        {
            if (await this._context.Employees.AnyAsync(x => x.LastName == employename))
                return true;

            return false;
        }

        public async Task<Employees> Login(string employename, string password)
        {
            var employe = await this._context.Employees.FirstOrDefaultAsync(x => x.LastName == employename);

            if (employe == null)
                return null;

            if (!VerifyPasswordHash(password, employe.PasswordHash, employe.PasswordSalt))
                return null;

            return employe;
        }
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }
        public async Task<Employees> Register(Employees employe, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            employe.PasswordHash = passwordHash;
            employe.PasswordSalt = passwordSalt;

            await _context.Employees.AddAsync(employe);
            await _context.SaveChangesAsync();

            return employe;
        }
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}