using System.ComponentModel;

namespace Domain.Enums;

public enum AgentStatus
{
    [Description("Available")]
    Available = 0,

    [Description("Busy")]
    Busy = 1,

    [Description("Unavailable")]
    Unavailable = 2
}
