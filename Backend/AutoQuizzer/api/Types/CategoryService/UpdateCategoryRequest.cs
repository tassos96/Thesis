﻿namespace Types.CategoryService
{
    public class UpdateCategoryRequest
    {
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
    }
}
