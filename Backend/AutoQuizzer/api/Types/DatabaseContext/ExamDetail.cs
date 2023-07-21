using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class ExamDetail
    {
        public int ExamDetailId { get; set; }
        public int ExamId { get; set; }
        public int TestQuestionId { get; set; }
        public int QuestionGrade { get; set; }

        public virtual Exam Exam { get; set; } = null!;
        public virtual TestQuestion TestQuestion { get; set; } = null!;
    }
}
