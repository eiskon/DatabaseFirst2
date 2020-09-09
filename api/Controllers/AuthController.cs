using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Model;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(EmployeeForRegisterDto employeeForRegisterDto)
        {
            if (employeeForRegisterDto is null)
            {
                throw new System.ArgumentNullException(nameof(employeeForRegisterDto));
            }
            // validate request

            employeeForRegisterDto.LastName = employeeForRegisterDto.LastName;
            employeeForRegisterDto.FirstName = employeeForRegisterDto.FirstName;

            if (await _repo.EmployeExists(employeeForRegisterDto.LastName))
                return BadRequest("Employename already existst");

            var employeeToCreate = _mapper.Map<Employees>(employeeForRegisterDto);

            var createdEmployee = await _repo.Register(employeeToCreate, employeeForRegisterDto.Password);

            var employeeToReturn = _mapper.Map<EmployeeForDetailedDto>(createdEmployee);

            return CreatedAtRoute("GetEmployee", new {controller = "Employees", id = createdEmployee.EmployeeId}, employeeToReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(EmployeeForLoginDto employeeForLoginDto)
        {
            var employeeFromRepo = await _repo.Login(employeeForLoginDto.LastName, employeeForLoginDto.Password);

            if (employeeFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                    new Claim(ClaimTypes.NameIdentifier, employeeFromRepo.EmployeeId.ToString()),
                    new Claim(ClaimTypes.Name, employeeFromRepo.LastName)
                };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var employeeToReturn = _mapper.Map<EmployeeForListDto>(employeeFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user = employeeToReturn
            });
        }

    }
}