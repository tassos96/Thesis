using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class QuestionsCategory
    {
        public int QuestionCategoryId { get; set; }
        public int? QuestionId { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Question? Question { get; set; }
    }
}
