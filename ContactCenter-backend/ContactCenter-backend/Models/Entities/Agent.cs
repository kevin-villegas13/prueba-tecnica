using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Enums;

namespace Domain.Entities;

[Table("agents")]
public class Agent
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [MinLength(2)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public AgentStatus Status { get; set; } = AgentStatus.Available;

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
