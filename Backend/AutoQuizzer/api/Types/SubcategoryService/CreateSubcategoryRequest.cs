namespace Types.SubcategoryService
{
    public class CreateSubcategoryRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
    }
}
