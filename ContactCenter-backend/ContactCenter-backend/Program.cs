using DotNetEnv;
using ContactCenter_backend.DependencyInjection;
using Scalar.AspNetCore;
using ContactCenter_backend.Context.Data;
using Microsoft.EntityFrameworkCore;
using ContactCenter_backend.Application.Services;
using System.Net.WebSockets;

var builder = WebApplication.CreateBuilder(args);
Env.Load();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", corsBuilder =>
    {
        corsBuilder.WithOrigins("http://localhost:3000") // Cambiar a la URL de producción si es necesario
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
    });
});

// Agregar servicios
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
                      ?? throw new InvalidOperationException("DATABASE_URL is not set.");

builder.Services.AddDatabaseServices(connectionString);
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Registro del servicio WebSocket
builder.Services.AddSingleton<WebSocketService>();

var app = builder.Build();

// Migrar base de datos
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

// Configurar el middleware
if (app.Environment.IsDevelopment())
{
    app.MapScalarApiReference();
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy"); // Aplicar política CORS

app.UseRouting();          // Habilitar enrutamiento
app.UseAuthorization();    // Habilitar autorización

// Habilitar WebSockets
app.UseWebSockets();

// Mapeo de WebSocket
app.Map("/api/ws", async context =>
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        var webSocketService = context.RequestServices.GetRequiredService<WebSocketService>();
        using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
        await webSocketService.HandleConnection(webSocket);
    }
    else
    {
        context.Response.StatusCode = 400; 
    }
});

app.MapControllers();

app.Run();
