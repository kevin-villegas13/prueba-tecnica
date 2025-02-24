using AutoMapper;
using ContactCenter_backend.Application.Dto;
using Domain.Entities;

namespace ContactCenter_backend.Utility;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Agent, AgentDto>().ReverseMap();
        CreateMap<Client, ClientDto>().ReverseMap();
    }
}

