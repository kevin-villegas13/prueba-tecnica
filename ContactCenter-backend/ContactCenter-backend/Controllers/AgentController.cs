using ContactCenter_backend.Application.Dto;
using ContactCenter_backend.Application.Interfaces;
using ContactCenter_backend.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace ContactCenter_backend.Controllers;

[ApiController]
[Route("api/agents")]
public class AgentController : ControllerBase
{
    private readonly IAgentService _agentService;

    public AgentController(IAgentService agentService)
    {
        _agentService = agentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAgents()
    {
        var response = await _agentService.GetAllAgents();
        return response.Status ? Ok(response) : BadRequest(response);
    }

    [HttpGet("filter")]
    public async Task<IActionResult> GetAgentsByStatus([FromQuery] string status)
    {
        var response = await _agentService.GetAgentsByStatus(status);
        return response.Status ? Ok(response) : NotFound(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAgentById(int id)
    {
        var response = await _agentService.GetAgentById(id);
        return response.Status ? Ok(response) : NotFound(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAgent([FromBody] AgentDto agentDto)
    {
        var response = await _agentService.CreateAgent(agentDto);
        return response.Status ? Created("", response) : BadRequest(response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAgent(int id, [FromBody] AgentDto agentDto)
    {
        var response = await _agentService.UpdateAgent(id, agentDto);
        return response.Status ? Ok(response) : NotFound(response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAgent(int id)
    {
        var response = await _agentService.DeleteAgent(id);
        return response.Status ? Ok(response) : NotFound(response);
    }
}