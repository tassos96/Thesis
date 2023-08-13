using Types.Enums;

namespace Types.DTOs
{
    public class QuestionDTO
    {
        public int QuestionId { get; set; }
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public string Description { get; set; }
        public Difficulty Difficulty { get; set; }
        public int? UserChoise { get; set; }
        public List<AnswerDTO> QuestionAnswers { get; set; }
    }
}
