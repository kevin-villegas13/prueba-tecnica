using ContactCenter_backend.Application.Dto;
using ContactCenter_backend.Helpers;
using Domain.Entities;

namespace ContactCenter_backend.Application.Interfaces;

public interface IClientService
{
    Task<Response<ClientDto>> CreateClient(ClientDto clientDto);
    Task<Response<IEnumerable<Client>>> GetAllClients();
    Task<Response<IEnumerable<Client>>> GetFilteredClients(int? minWaitTime);
}
