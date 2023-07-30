using Types.DTOs;
using Types.Enums;

namespace Types.QuestionService
{
    public class UpdateQuestionRequest
    {
        public int CategoryId { get; set; }
        public int SubcategoryId { get; set; }
        public int QuestionId { get; set; }

        public int NewQuestionId { get; set; }
        public int NewCategoryId { get; set; }
        public int NewSubcategoryId { get; set; }
        public string NewDescription { get; set; }
        public Difficulty NewDifficulty { get; set; }
        public List<AnswerDTO> QuestionAnswers { get; set; }
    }
}
