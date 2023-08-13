namespace Types.TestService
{
    public class ValidateExamAsnwersRequest
    {
        public List<UserAnswer> Answers { get; set; }
    }

    public class UserAnswer
    {
        public int UserOption { get; set; }
        public int ExamId { get; set; }
        public int QuestionId { get; set; }
    }
}
