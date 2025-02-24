using ContactCenter_backend.Application.Dto;
using ContactCenter_backend.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ContactCenter_backend.Controllers;

[ApiController]
[Route("api/clients")]
public class ClientController(IClientService clientService) : ControllerBase
{
    private readonly IClientService _clientService = clientService;

    [HttpPost]
    public async Task<IActionResult> CreateClient([FromBody] ClientDto clientDto)
    {
        var response = await _clientService.CreateClient(clientDto);
        return response.Status ? Created("", response) : BadRequest(response);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllClients()
    {
        var response = await _clientService.GetAllClients();
        return response.Status ? Ok(response) : BadRequest(response);
    }

    [HttpGet("filtered")]
    public async Task<IActionResult> GetFilteredClients([FromQuery] int? minWaitTime)
    {
        var response = await _clientService.GetFilteredClients(minWaitTime);
        return response.Status ? Ok(response) : BadRequest(response);
    }
}
