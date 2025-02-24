namespace ContactCenter_backend.Helpers;

public class Response<T>(bool status, string message, T? data = default)
{
    public bool Status { get; set; } = status;
    public string Message { get; set; } = message;
    public T? Data { get; set; } = data;

    public static Response<T> Success(T data, string message = "Operación exitosa")
        => new(true, message, data);

    public static Response<T> Error(string message)
        => new(false, message, default);
}
