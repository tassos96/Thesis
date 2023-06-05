namespace Types.DatabaseContext
{
    public partial class Assignment
    {
        public int AssignmentId { get; set; }
        public DateTime AssignmentDate { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public int? Grade { get; set; }
        public int? UserId { get; set; }
        public int? TestId { get; set; }

        public virtual Test? Test { get; set; }
        public virtual User? User { get; set; }
    }
}
