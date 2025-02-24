using ContactCenter_backend.Application.Interfaces;
using ContactCenter_backend.Application.Services;
using ContactCenter_backend.Context.Data;
using ContactCenter_backend.Context.Repository;
using ContactCenter_backend.Context.Repository.Interface;
using ContactCenter_backend.Utility;
using Microsoft.EntityFrameworkCore;

namespace ContactCenter_backend.DependencyInjection;

public static class DatabaseServiceCollectionExtensions
{
    public static void AddDatabaseServices(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        services.AddScoped<IAgentService, AgentService>();
        services.AddScoped<IClientService, ClientService>();
        services.AddSingleton<WebSocketService>();
        services.AddAutoMapper(typeof(AutoMapperProfile));
    }
}

