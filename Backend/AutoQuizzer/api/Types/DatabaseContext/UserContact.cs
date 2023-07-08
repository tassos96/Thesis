using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class UserContact
    {
        public int UserContactId { get; set; }
        public int UserId { get; set; }
        public int ContactId { get; set; }

        public virtual User Contact { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
