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
            var existingCategory = await _context.Categories.FirstOrDefaultAsync(x => (x.Description == request.Description || x.Title == request.Title) && x.UserId == userId);
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

        public async Task<List<CategoryDTO>> GetCategoriesAsync(int userId)
        {
            var result = new List<CategoryDTO>();
            var categories = await GetListAsync();

            result.AddRange(categories.Where(x=> x.UserId == userId).Select(x => new CategoryDTO 
                { CategoryId = x.CategoryId,
                  Title = x.Title,
                  Description = x.Description
                })
             );

            return result;
        }

        public async Task<bool> UpdateCategoryAsync(UpdateCategoryRequest request, int userId)
        {
            var existingCategory = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == request.CategoryId && x.UserId == userId);
            if (existingCategory == null) { return false; }

            existingCategory.Title = request.Title;
            existingCategory.Description = request.Description;

            _context.Categories.Update(existingCategory);
            return true;
        }

        public async Task<bool> DeleteCategoryAsync(int categoryId, int userId)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == categoryId && x.UserId == userId);
            if (category == null) { return false; }

            _context.Categories.Remove(category);
            return true;
        }
    }
}
