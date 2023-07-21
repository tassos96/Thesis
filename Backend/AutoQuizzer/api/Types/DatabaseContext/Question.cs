using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class Question
    {
        public Question()
        {
            QuestionAnswers = new HashSet<QuestionAnswer>();
            TestQuestions = new HashSet<TestQuestion>();
        }

        public int QuestionId { get; set; }
        public string Difficulty { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int SubcategoryId { get; set; }

        public virtual Subcategory Subcategory { get; set; } = null!;
        public virtual ICollection<QuestionAnswer> QuestionAnswers { get; set; }
        public virtual ICollection<TestQuestion> TestQuestions { get; set; }
    }
}
