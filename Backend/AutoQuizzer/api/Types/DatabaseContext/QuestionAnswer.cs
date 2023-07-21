using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class QuestionAnswer
    {
        public int AnswerId { get; set; }
        public int QuestionId { get; set; }
        public string Description { get; set; } = null!;
        public short IsCorrect { get; set; }

        public virtual Question Question { get; set; } = null!;
    }
}
