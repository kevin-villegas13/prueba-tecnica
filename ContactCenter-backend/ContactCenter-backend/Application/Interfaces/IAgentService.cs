using ContactCenter_backend.Application.Dto;
using ContactCenter_backend.Helpers;
using Domain.Entities;

namespace ContactCenter_backend.Application.Interfaces;

public interface IAgentService
{
    Task<Response<AgentDto>> CreateAgent(AgentDto agentDto);
    Task<Response<bool>> DeleteAgent(int id);
    Task<Response<Agent>> GetAgentById(int id);
    Task<Response<IEnumerable<Agent>>> GetAllAgents();
    Task<Response<IEnumerable<Agent>>> GetAgentsByStatus(string status);
    Task<Response<AgentDto>> UpdateAgent(int id, AgentDto agentDto);
}