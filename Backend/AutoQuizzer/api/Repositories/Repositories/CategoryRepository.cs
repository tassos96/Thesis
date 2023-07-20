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
            var existingCategory = await _context.Categories.FirstOrDefaultAsync(x => x.Description == request.Description);
            if (existingCategory != null) { return false; }

            var category = new Category()
            {
                Description = request.Description,
                UserId = userId
                //User = _context.Users.FirstOrDefault(x => x.UserId == userId),
            };

            await _context.Categories.AddAsync(category);
            return true;
        }

        public async Task<List<CategoryDTO>> GetCategoriesAsync(int userId)
        {
            var result = new List<CategoryDTO>();
            var categories = await GetListAsync();

            result.AddRange(categories.Where(x=> x.UserId == userId).Select(x => new CategoryDTO 
                { CategoryId = x.CategoryId,
                  Description = x.Description
                }));

            return result;
        }
    }
}
