using FluentValidation;

namespace ContactCenter_backend.Application.Dto.Validators;

public class ClientValidator : AbstractValidator<ClientDto>
{
    public ClientValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MinimumLength(2)
            .MaximumLength(100);

        RuleFor(x => x.WaitTime)
            .GreaterThanOrEqualTo(0);
    }
}
