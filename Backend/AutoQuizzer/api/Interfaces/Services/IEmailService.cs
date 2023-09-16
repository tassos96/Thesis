using Types.EmailService;

namespace Interfaces.Services
{
    public interface IEmailService
    {
        Task SendTestResolvedEmailAsync(TestResolvedEmailContext context);
        Task SendTestAssignmentEmailAsync(TestAssignmentEmailContext context);
    }
}
