using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class Exam
    {
        public Exam()
        {
            ExamDetails = new HashSet<ExamDetail>();
        }

        public int ExamId { get; set; }
        public DateTime AssignmentDate { get; set; }
        public DateTime? ResolvedDate { get; set; }
        public int? Grade { get; set; }
        public int? UserId { get; set; }
        public int? TestId { get; set; }

        public virtual Test? Test { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<ExamDetail> ExamDetails { get; set; }
    }
}
