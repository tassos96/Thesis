namespace Types.DTOs
{
    public class TestUsersDTO
    {
        public int TestId { get; set; }
        public int ExamId { get; set; }
        public int UserId { get; set; }
        public int? Grade { get; set; } //0 - 100
        public DateTime AssignmentDate { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Fullname { get; set; }
        public int? Standing { get; set; }
    }
}
