﻿namespace Types.DTOs
{
    public class AnswerDTO
    {
        public int AnswerId { get; set; }
        public int QuestionId { get; set; }
        public string Description { get; set; }
        public bool IsCorrect { get; set; }
    }
}
