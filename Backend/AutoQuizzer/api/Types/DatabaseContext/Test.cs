using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class Test
    {
        public Test()
        {
            Exams = new HashSet<Exam>();
            TestQuestions = new HashSet<TestQuestion>();
        }

        public int TestId { get; set; }
        public string Title { get; set; } = null!;
        public string Subject { get; set; } = null!;
        public string Difficulty { get; set; } = null!;
        public int QuestionsNumber { get; set; }
        public string Categories { get; set; } = null!;

        public virtual ICollection<Exam> Exams { get; set; }
        public virtual ICollection<TestQuestion> TestQuestions { get; set; }
    }
}
