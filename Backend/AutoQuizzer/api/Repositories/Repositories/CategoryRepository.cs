using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Types.DatabaseContext;
using Types.DTOs;
using Types.QuestionService;

namespace Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(AutoQuizzerContext context) : base(context)
        {
        }

        public async Task<bool> CreateCategoryAsync(CreateCategoryRequest request, int userId)
        {
            var existingCategory = await _context.Categories.FirstOrDefaultAsync(x => x.Description == request.Description || x.Title == request.Title);
            if (existingCategory != null) { return false; }

            var category = new Category()
            {
                Title = request.Title,
                Description = request.Description,
                UserId = userId
            };

            await _context.Categories.AddAsync(category);
            return true;
        }

        public async Task<List<SubcategoryDTO>> GetCategoriesAsync(int userId)
        {
            var result = new List<SubcategoryDTO>();
            var categories = await GetListAsync();

            result.AddRange(categories.Where(x=> x.UserId == userId).Select(x => new SubcategoryDTO 
                { CategoryId = x.CategoryId,
                  Description = x.Description
                })
             );

            return result;
        }
    }
}
