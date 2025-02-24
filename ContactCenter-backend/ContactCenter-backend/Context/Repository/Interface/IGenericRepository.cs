namespace ContactCenter_backend.Context.Repository.Interface;

public interface IGenericRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAll();
    Task<T> GetById(int id);
    Task<T> Add(T entity);
    Task<T> Update(T entity);
    Task<T> Delete(int id);
    Task<(IEnumerable<T> Items, int TotalCount)> GetPaged(int pageNumber, int pageSize, string? searchQuery = null);
}
