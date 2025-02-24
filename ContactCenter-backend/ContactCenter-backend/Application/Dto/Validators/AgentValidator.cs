using FluentValidation;

namespace ContactCenter_backend.Application.Dto.Validators;

public class AgentValidator : AbstractValidator<AgentDto>
{
    public AgentValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MinimumLength(2)
            .MaximumLength(100);

        RuleFor(x => x.Status)
            .IsInEnum();
    }
}

