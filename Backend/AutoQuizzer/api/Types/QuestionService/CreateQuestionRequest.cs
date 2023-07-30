using Types.DTOs;
using Types.Enums;

namespace Types.QuestionService
{
    public class CreateQuestionRequest
    {
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public string Description { get; set; }
        public Difficulty Difficulty { get; set; }
        public List<AnswerDTO> QuestionAnswers { get; set; }
    }
}
