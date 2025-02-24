using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactCenter_backend.Context.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Agent> Agents { get; set; }
    public DbSet<Client> Clients { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Agent>()
            .HasKey(a => a.Id); 

        modelBuilder.Entity<Agent>()
            .Property(a => a.Status)
            .HasConversion<string>(); 
        
        modelBuilder.Entity<Client>().HasKey(c => c.Id);
    }
}
