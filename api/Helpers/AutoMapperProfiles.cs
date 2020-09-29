using api.Dtos;
using api.Model;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Employees
            CreateMap<Employees, EmployeeForListDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.BirthDate.CalculateAge()));
            CreateMap<Employees, EmployeeForDetailedDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.BirthDate.CalculateAge()));
            CreateMap<Employees, EmployeesForOrderListDto>();
            CreateMap<EmployeeForRegisterDto, Employees>();
            CreateMap<EmployeeForUpdateDto, Employees>(MemberList.Source);

            // Orders
            CreateMap<Orders, OrdersForListDto>();

            CreateMap<Orders, OrdersForDetailedDto>();
            CreateMap<OrderDetails, OrderDetailsDto>();
            CreateMap<Products, ProductForOrdersDetailsDto>();

            CreateMap<Orders, OrderForUpdateDto>();
        }
    }
}