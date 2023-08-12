namespace Types.DTOs
{
    public class UserExamsDTO
    {
        public int ExamId { get; set; }
        public DateTime AssignmentDate { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public int? Grade { get; set; }
        public TestDTO Test { get; set; }
    }
}
