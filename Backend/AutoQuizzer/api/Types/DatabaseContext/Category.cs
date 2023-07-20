using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class Category
    {
        public Category()
        {
            Questions = new HashSet<Question>();
        }

        public int CategoryId { get; set; }
        public string Description { get; set; } = null!;
        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Question> Questions { get; set; }
    }
}
