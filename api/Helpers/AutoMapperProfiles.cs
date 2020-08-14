using api.Dtos;
using api.Model;
using AutoMapper;
using api.Helpers;

namespace api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employees, EmployeeForListDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.BirthDate.CalculateAge()));
            CreateMap<Employees, EmployeeForDetailedDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.BirthDate.CalculateAge()));
            CreateMap<Orders, OrdersForDetailedDto>();
        }
    }
}