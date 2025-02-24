using System.ComponentModel.DataAnnotations;

namespace ContactCenter_backend.Application.Dto;

public class ClientDto
{
    [Required, MinLength(2), MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, Range(0, int.MaxValue)]
    public int WaitTime { get; set; }

    public int QueuePosition { get; set; }
}