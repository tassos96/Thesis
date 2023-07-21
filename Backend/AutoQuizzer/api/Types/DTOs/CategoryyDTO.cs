namespace Types.DTOs
{
    public class CategoryyDTO
    {
        public int RepositoryId { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int? UserId { get; set; }
        public int? QuestionId { get; set; }
    }
}
