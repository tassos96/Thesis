using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class Question
    {
        public Question()
        {
            QuestionsCategories = new HashSet<QuestionsCategory>();
            TestQuestions = new HashSet<TestQuestion>();
            UsersRepositories = new HashSet<UsersRepository>();
        }

        public int QuestionId { get; set; }
        public string Difficulty { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string CorrectAnswerDescription { get; set; } = null!;
        public string FirstSuplAnsDesc { get; set; } = null!;
        public string SecSuplAnsDesc { get; set; } = null!;
        public string ThrSuplAnsDesc { get; set; } = null!;

        public virtual ICollection<QuestionsCategory> QuestionsCategories { get; set; }
        public virtual ICollection<TestQuestion> TestQuestions { get; set; }
        public virtual ICollection<UsersRepository> UsersRepositories { get; set; }
    }
}
