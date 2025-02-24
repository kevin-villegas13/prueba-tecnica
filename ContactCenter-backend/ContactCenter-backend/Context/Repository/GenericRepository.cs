using ContactCenter_backend.Context.Data;
using ContactCenter_backend.Context.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace ContactCenter_backend.Context.Repository;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly AppDbContext _appDbContext;

    public GenericRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext ?? throw new ArgumentNullException(nameof(appDbContext));
    }

    public async Task<T> Add(T entity)
    {
        if (entity == null)
            throw new ArgumentNullException(nameof(entity), "Entity cannot be null");

        try
        {
            await _appDbContext.Set<T>().AddAsync(entity);
            await _appDbContext.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error adding entity: {ex.Message}");
            throw new Exception("An error occurred while adding the entity.");
        }
    }

    public async Task<T> Delete(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID must be greater than zero", nameof(id));

        try
        {
            var entity = await _appDbContext.Set<T>().FindAsync(id);
            if (entity == null)
                throw new KeyNotFoundException($"Entity with ID {id} not found");

            _appDbContext.Set<T>().Remove(entity);
            await _appDbContext.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting entity: {ex.Message}");
            throw new Exception("An error occurred while deleting the entity.");
        }
    }

    public async Task<IEnumerable<T>> GetAll()
    {
        try
        {
            return await _appDbContext.Set<T>().ToListAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching entities: {ex.Message}");
            throw new Exception("An error occurred while retrieving entities.");
        }
    }

    public async Task<T> GetById(int id)
    {
        if (id <= 0)
            throw new ArgumentException("ID must be greater than zero", nameof(id));

        try
        {
            var entity = await _appDbContext.Set<T>().FindAsync(id);
            if (entity == null)
                throw new KeyNotFoundException($"Entity with ID {id} not found");

            return entity;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching entity: {ex.Message}");
            throw new Exception("An error occurred while retrieving the entity.");
        }
    }

    public async Task<(IEnumerable<T> Items, int TotalCount)> GetPaged(int pageNumber, int pageSize, string? searchQuery = null)
    {
        if (pageNumber <= 0 || pageSize <= 0)
            throw new ArgumentException("Page number and page size must be greater than zero");

        try
        {
            IQueryable<T> query = _appDbContext.Set<T>();

            // Si hay un término de búsqueda, filtramos (requiere que T tenga una propiedad específica para búsqueda)
            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                query = query.Where(item => item.ToString()!.Contains(searchQuery));
            }

            int totalCount = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return (items, totalCount);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching paged entities: {ex.Message}");
            throw new Exception("An error occurred while retrieving paged entities.");
        }
    }

    public async Task<T> Update(T entity)
    {
        if (entity == null)
            throw new ArgumentNullException(nameof(entity), "Entity cannot be null");

        try
        {
            _appDbContext.Set<T>().Update(entity);
            await _appDbContext.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating entity: {ex.Message}");
            throw new Exception("An error occurred while updating the entity.");
        }
    }
}
