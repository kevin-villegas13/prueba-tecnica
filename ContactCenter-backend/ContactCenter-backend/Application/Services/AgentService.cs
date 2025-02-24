using AutoMapper;
using ContactCenter_backend.Application.Dto;
using ContactCenter_backend.Application.Interfaces;
using ContactCenter_backend.Context.Repository.Interface;
using ContactCenter_backend.Helpers;
using Domain.Entities;
using Domain.Enums;
using System.Text.Json;

namespace ContactCenter_backend.Application.Services;

public class AgentService : IAgentService
{
    private readonly IGenericRepository<Agent> _agentRepository;
    private readonly IMapper _mapper;
    private readonly WebSocketService _webSocketService;

    public AgentService(IGenericRepository<Agent> agentRepository, IMapper mapper, WebSocketService webSocketService)
    {
        _agentRepository = agentRepository;
        _mapper = mapper;
        _webSocketService = webSocketService;
    }

    public async Task<Response<AgentDto>> CreateAgent(AgentDto agentDto)
    {
        if (agentDto == null)
            return new Response<AgentDto>(false, "Datos inválidos");

        var agent = _mapper.Map<Agent>(agentDto);
        var createdAgent = await _agentRepository.Add(agent);

        await NotifyClients();

        var agentResponse = _mapper.Map<AgentDto>(createdAgent);
        return new Response<AgentDto>(true, "Agente creado exitosamente", agentResponse);
    }

    public async Task<Response<bool>> DeleteAgent(int id)
    {
        var agent = await _agentRepository.GetById(id);
        if (agent == null)
            return new Response<bool>(false, "Agente no encontrado");

        await _agentRepository.Delete(id);
        await NotifyClients();

        return new Response<bool>(true, "Agente eliminado correctamente", true);
    }

    public async Task<Response<Agent>> GetAgentById(int id)
    {
        var agent = await _agentRepository.GetById(id);
        if (agent == null)
            return new Response<Agent>(false, "Agente no encontrado");

        return new Response<Agent>(true, "Agente obtenido correctamente", _mapper.Map<Agent>(agent));
    }

    public async Task<Response<IEnumerable<Agent>>> GetAllAgents()
    {
        var agents = await _agentRepository.GetAll();
        var agentResponses = agents.Select(agent => new Agent
        {
            Id = agent.Id,
            Name = agent.Name,
            Status = agent.Status,
            CreatedAt = agent.CreatedAt
        }).ToList();

        return new Response<IEnumerable<Agent>>(true, "Lista de agentes obtenida", agentResponses);
    }

    public async Task<Response<IEnumerable<Agent>>> GetAgentsByStatus(string status)
    {
        if (Enum.TryParse<AgentStatus>(status, true, out var parsedStatus))
        {
            var agents = await _agentRepository.GetAll();
            var filteredAgents = agents.Where(a => a.Status == parsedStatus).ToList();

            return new Response<IEnumerable<Agent>>(true, "Agentes filtrados por estado obtenidos", filteredAgents);
        }

        return new Response<IEnumerable<Agent>>(false, "Estado de agente no válido");
    }

    public async Task<Response<AgentDto>> UpdateAgent(int id, AgentDto agentDto)
    {
        var agent = await _agentRepository.GetById(id);
        if (agent == null)
            return new Response<AgentDto>(false, "Agente no encontrado");

        _mapper.Map(agentDto, agent);
        var updatedAgent = await _agentRepository.Update(agent);

        await NotifyClients();

        return new Response<AgentDto>(true, "Agente actualizado correc tamente", _mapper.Map<AgentDto>(updatedAgent));
    }

    private async Task NotifyClients()
    {
        var agentsResponse = await GetAllAgents();
        var jsonData = JsonSerializer.Serialize(agentsResponse.Data);
        await _webSocketService.BroadcastMessage(jsonData);
    }
}
