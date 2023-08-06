using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class Subcategory
    {
        public Subcategory()
        {
            Questions = new HashSet<Question>();
        }

        public int SubcategoryId { get; set; }
        public int CategoryId { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;

        public virtual Category Category { get; set; } = null!;
        public virtual ICollection<Question> Questions { get; set; }
    }
}
