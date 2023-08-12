using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Types.Enums;

namespace Types.DTOs
{
    public class QuestionFullDTO
    {
        public int QuestionId { get; set; }
        public string Description { get; set; }
        public Difficulty Difficulty { get; set; }
        public List<QuestionAnswerChoicesDTO> Choises {get; set;}
    }
}
