using ContactCenter_backend.Helpers.Paginador.type;

namespace ContactCenter_backend.Helpers.Paginador;

public class ResponseList<T> : IResponseList<T>
{
    public int TotalPages { get; set; }
    public bool HasPrevPage { get; set; }
    public bool HasNextPage { get; set; }
    public int Page { get; set; }
    public int Limit { get; set; }
    public int TotalDocs { get; set; }
    public IEnumerable<T> Data { get; set; } = [];
}

