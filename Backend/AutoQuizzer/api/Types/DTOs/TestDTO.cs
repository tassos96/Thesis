using Types.Enums;

namespace Types.DTOs
{
    public class TestDTO
    {
        public int TestId { get; set; }
        public string Title { get; set; }
        public string Subject { get; set; }
        public Difficulty Difficulty { get; set; }
        public int QuestionsNumber { get; set; }
        public string Categories { get; set; }
        public string Subcategories { get; set; }
        public int ExaminerId { get; set; }
    }
}
