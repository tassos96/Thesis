using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class UsersRepository
    {
        public int RepositoryId { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int? UserId { get; set; }
        public int? QuestionId { get; set; }

        public virtual Question? Question { get; set; }
        public virtual User? User { get; set; }
    }
}
