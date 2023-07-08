using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class Category
    {
        public Category()
        {
            QuestionsCategories = new HashSet<QuestionsCategory>();
        }

        public int CategoryId { get; set; }
        public string Description { get; set; } = null!;

        public virtual ICollection<QuestionsCategory> QuestionsCategories { get; set; }
    }
}
