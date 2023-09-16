using Email.Configuration;
using Interfaces.Repositories;
using Interfaces.Services;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System.Reflection;
using Types.EmailService;

namespace Email.Implementation
{
    public class EmailService : IEmailService
    {
        private readonly EmailServiceOptions _options;

        public EmailService(IOptions<EmailServiceOptions> options, IUnitOfWork unitOfWork)
        {
            _options = options.Value;
        }

        public async Task SendTestResolvedEmailAsync(TestResolvedEmailContext context)
        {
            var emailClient = new SmtpClient();
            await emailClient.ConnectAsync(_options.SmtpHost, 587, SecureSocketOptions.StartTls);
            await emailClient.AuthenticateAsync(_options.EmailUsername, _options.EmailPassword);

            var email = new MimeMessage();
            email.From.Add(InternetAddress.Parse(_options.EmailUsername));
            email.To.Add(InternetAddress.Parse(context.ExaminerEmail));
            email.Subject = "Επίλυση Τεστ";

            StreamReader reader = new StreamReader(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "EmailTemplates", "TestResolvedEmailTemplate.html"));
            string body = await reader.ReadToEndAsync();

            body = body.Replace("{testTitle}", context.TestTitle);
            body = body.Replace("{testDetails}", context.TestDetails);
            body = body.Replace("{username}", context.Username);
            body = body.Replace("{userContactInfo}", context.UserContactInfo);
            body = body.Replace("{testGrade}", context.TestGrade);

            email.Body = new TextPart(TextFormat.Html) { Text = body.ToString() };
            await emailClient.SendAsync(email);

            await emailClient.DisconnectAsync(true);
        }

        public async Task SendTestAssignmentEmailAsync(TestAssignmentEmailContext context)
        {
            var emailClient = new SmtpClient();
            await emailClient.ConnectAsync(_options.SmtpHost, 587, SecureSocketOptions.StartTls);
            await emailClient.AuthenticateAsync(_options.EmailUsername, _options.EmailPassword);
            
            var email = new MimeMessage();
            email.From.Add(InternetAddress.Parse(_options.EmailUsername));
            email.Subject = "Ανάθεση Τεστ";

            StreamReader reader = new StreamReader(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "EmailTemplates", "TestAssignmentEmailTemplate.html"));
            string body = await reader.ReadToEndAsync();

            body = body.Replace("{testTitle}", context.TestTitle);
            body = body.Replace("{testDetails}", context.TestDetails);
            body = body.Replace("{testExaminer}", context.TestExaminer);
            body = body.Replace("{testExaminerEmail}", context.TestExaminerEmail);

            email.Body = new TextPart(TextFormat.Html) { Text = body.ToString() };

            foreach(var userEmai in context.UserEmails)
            {
                email.To.Clear();
                email.To.Add(InternetAddress.Parse(userEmai));
                await emailClient.SendAsync(email);
            }

            await emailClient.DisconnectAsync(true);
        }
    }
}
