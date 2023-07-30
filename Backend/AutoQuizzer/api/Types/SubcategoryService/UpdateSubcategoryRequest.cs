namespace Types.SubcategoryService
{
    public class UpdateSubcategoryRequest
    {
        public int SubcategoryId { get; set; }
        public int NewCategoryId { get; set; }
        public string NewDescription { get; set; }
        public string NewTitle { get; set; }
    }
}
