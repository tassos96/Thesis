using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class TestQuestion
    {
        public int TestQuestionsId { get; set; }
        public int? TestId { get; set; }
        public int? QuestionId { get; set; }

        public virtual Question? Question { get; set; }
        public virtual Test? Test { get; set; }
    }
}
