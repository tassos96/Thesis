using Email.Configuration;
using Email.Implementation;
using Interfaces.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Email.DiExtentions
{
    public static class EmailServiceDiExtensions
    {
        public static IServiceCollection AddEmailService(this IServiceCollection services, WebApplicationBuilder builder)
        {
            services.Configure<EmailServiceOptions>(builder.Configuration.GetSection(EmailServiceOptions.ConfigurationSection));
            services.AddTransient<IEmailService, EmailService>();
            return services;
        }
    }
}
