using ContactCenter_backend.Helpers.Paginador.type;

namespace ContactCenter_backend.Helpers.Paginador;
public class Paginador
{
    public static IResponseList<T> Format<T>(
   IEnumerable<T> data,
   int count,
   int page,
   int limit,
   string searchTerm = "",
   SortOrder sortOrder = SortOrder.ASC)
    {
        data = !string.IsNullOrWhiteSpace(searchTerm)
               ? data.Where(item => item?.ToString()?.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) == true)
               : data;

        count = data.Count();

        data = sortOrder == SortOrder.DESC
             ? data.OrderByDescending(item => item)
             : data.OrderBy(item => item);

        int totalPages = (int)Math.Ceiling((double)count / limit);

        data = data.Skip((page - 1) * limit).Take(limit);

        return new ResponseList<T>
        {
            TotalPages = totalPages,
            HasPrevPage = page > 1,
            HasNextPage = page < totalPages,
            Page = page,
            Limit = limit,
            TotalDocs = count,
            Data = data
        };
    }
}

