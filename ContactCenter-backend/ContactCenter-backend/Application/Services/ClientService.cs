using System.Text.Json;
using AutoMapper;
using ContactCenter_backend.Application.Dto;
using ContactCenter_backend.Application.Interfaces;
using ContactCenter_backend.Context.Repository.Interface;
using ContactCenter_backend.Helpers;
using Domain.Entities;

namespace ContactCenter_backend.Application.Services;

public class ClientService : IClientService
{
    private readonly IGenericRepository<Client> _clientRepository;
    private readonly IMapper _mapper;
    private readonly WebSocketService _webSocketService;

    public ClientService(IGenericRepository<Client> clientRepository, IMapper mapper, WebSocketService webSocketService)
    {
        _clientRepository = clientRepository;
        _mapper = mapper;
        _webSocketService = webSocketService;
    }

    public async Task<Response<ClientDto>> CreateClient(ClientDto clientDto)
    {
        if (clientDto == null)
            return new Response<ClientDto>(false, "Datos inválidos");

        var currentClients = await _clientRepository.GetAll();

        clientDto.QueuePosition = currentClients.Count() + 1;

        clientDto.WaitTime = CalculateWaitTime(currentClients.Count());

        var client = _mapper.Map<Client>(clientDto);
        var createdClient = await _clientRepository.Add(client);

        await NotifyClients();

        // Retornar respuesta con los datos del cliente
        var clientResponse = _mapper.Map<ClientDto>(createdClient);
        return new Response<ClientDto>(true, "Cliente creado exitosamente", clientResponse);
    }

    public async Task<Response<IEnumerable<Client>>> GetAllClients()
    {
        var clients = await _clientRepository.GetAll();
        var clientResponses = clients.Select(client => _mapper.Map<Client>(client)).ToList();

        return new Response<IEnumerable<Client>>(true, "Lista de clientes obtenida", clientResponses);
    }
    public async Task<Response<IEnumerable<Client>>> GetFilteredClients(int? waitTime)
    {
        var clients = await _clientRepository.GetAll(); 

        if (clients == null || !clients.Any())
            return new Response<IEnumerable<Client>>(false, "No hay clientes en la base de datos", Enumerable.Empty<Client>());
        

        if (waitTime.HasValue)
            clients = clients.Where(c => c.WaitTime == waitTime.Value).ToList();
        
        if (!clients.Any())
            return new Response<IEnumerable<Client>>(true, "No se encontraron clientes que cumplan con el criterio", Enumerable.Empty<Client>());
        
        // Mapea los clientes a la respuesta
        var clientResponses = clients.Select(client => _mapper.Map<Client>(client)).ToList();

        return new Response<IEnumerable<Client>>(true, "Lista de clientes obtenida", clientResponses);
    }


    private static int CalculateWaitTime(int currentQueueLength)
    {
        const int averageWaitTimePerClient = 5; 
        return currentQueueLength * averageWaitTimePerClient;
    }

    private async Task NotifyClients()
    {
        var clientsResponse = await GetAllClients();
        var jsonData = JsonSerializer.Serialize(clientsResponse.Data);
        await _webSocketService.BroadcastMessage(jsonData);
    }

}

