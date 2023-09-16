namespace Email.Configuration
{
    public class EmailServiceOptions
    {
        public const string ConfigurationSection = "EmailSettings";
        public string SmtpHost { get; set; }
        public string EmailUsername { get; set; }
        public string EmailPassword { get; set; }
    }
}
