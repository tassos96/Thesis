namespace Types.DTOs
{
    public class ExamDTO
    {
        public int AssignmentId { get; set; }
        public DateTime AssignmentDate { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public int? Grade { get; set; }
        public int? UserId { get; set; }
        public int? TestId { get; set; }
    }
}
