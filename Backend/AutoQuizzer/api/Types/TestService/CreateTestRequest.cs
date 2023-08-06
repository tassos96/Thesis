using Types.Enums;

namespace Types.TestService
{
    public class CreateTestRequest
    {
        public string Title { get; set; }
        public string Subject { get; set; }
        public Difficulty Difficulty { get; set; }
        public int QuestionsNumber { get; set; }
        public int[] Categories { get; set; }
        public int[] Subcategories { get; set; }

        public string[] UsersToAssign { get; set; } // contains usernames or emails of other users for assignment
    }
}
