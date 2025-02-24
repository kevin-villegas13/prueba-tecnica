namespace ContactCenter_backend.Helpers.Paginador.type;

public interface IResponseList<T>
{
    int TotalPages { get; set; }
    bool HasPrevPage { get; set; }
    bool HasNextPage { get; set; }
    int Page { get; set; }
    int Limit { get; set; }
    int TotalDocs { get; set; }
    IEnumerable<T> Data { get; set; }
}

public enum SortOrder
{
    ASC,
    DESC
}
