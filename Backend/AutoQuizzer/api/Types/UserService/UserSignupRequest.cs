using System.Runtime.Serialization;
using Types.Enums;

namespace Types.UserService
{
    [DataContract]
    public class UserSignupRequest
    {
        [DataMember(Name = "email")]
        public string Email { get; set; } = string.Empty;

        [DataMember(Name = "username")]
        public string Username { get; set; } = string.Empty;

        [DataMember(Name = "firstname")]
        public string FirstName { get; set; } = string.Empty;

        [DataMember(Name = "lastname")]
        public string LastName { get; set; } = string.Empty;

        [DataMember(Name = "password")]
        public string Password { get; set; } = string.Empty;

        [DataMember(Name = "phoneNumber")]
        public string PhoneNumber { get; set; } = string.Empty;

        [DataMember(Name = "institution")]
        public string Institution { get; set; } = string.Empty;
        
        [DataMember(Name = "userRole")]
        public UserRole UserRole { get; set; } 
    }
}
