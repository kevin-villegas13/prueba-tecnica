using Microsoft.AspNetCore.Mvc;

using ContactCenter_backend.Application.Services;
using System.Net.WebSockets;

namespace ContactCenter_backend.Controllers;

[ApiController]
[Route("api")]
public class WebSocketController : ControllerBase
{
    private readonly WebSocketService _webSocketService;

    public WebSocketController(WebSocketService webSocketService)
    {
        _webSocketService = webSocketService;
    }

    [HttpGet("ws")] 
    public async Task Connect()
    {
        WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
        await _webSocketService.HandleConnection(webSocket);
    }
}

