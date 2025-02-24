using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;

namespace ContactCenter_backend.Application.Services;

public class WebSocketService
{
    private static readonly ConcurrentDictionary<Guid, WebSocket> _sockets = new();

    public async Task HandleConnection(WebSocket webSocket)
    {
        var buffer = new byte[1024 * 4];

        while (webSocket.State == WebSocketState.Open)
        {
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            if (result.MessageType == WebSocketMessageType.Text)
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                Console.WriteLine($"Mensaje recibido: {message}");

                // Responder al cliente
                var response = Encoding.UTF8.GetBytes($"Echo: {message}");
                await webSocket.SendAsync(new ArraySegment<byte>(response, 0, response.Length), WebSocketMessageType.Text, true, CancellationToken.None);
            }
            else if (result.MessageType == WebSocketMessageType.Close)
            {
                await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Conexión cerrada", CancellationToken.None);
            }
        }
    }

    public async Task BroadcastMessage(string message)
    {
        var buffer = Encoding.UTF8.GetBytes(message);
        var tasks = _sockets.Values
            .Where(socket => socket.State == WebSocketState.Open) 
            .Select(socket =>
                socket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None));

        await Task.WhenAll(tasks);
    }
}
