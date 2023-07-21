using Types.Enums;

namespace Types.DTOs
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Institution { get; set; } = null!;
        public UserRole UserRole { get; set; }
        public string SecurityToken { get; set; }

        public List<ExamDTO> Assignments { get; set; }
    }
}
