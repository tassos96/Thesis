using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Types.DatabaseContext;
using Types.DTOs;
using Types.QuestionService;

namespace Repositories
{
    public class SubcategoryRepository : BaseRepository<Subcategory>, ISubcategoryRepository
    {
        public SubcategoryRepository(AutoQuizzerContext context) : base(context)
        {
        }

        public async Task<bool> CreateSubcategoryAsync(CreateSubcategoryRequest request, int userId)
        {
            var existingSubcategory = await _context.Categories.Where(x => x.UserId == userId)
                .Include(x => x.Subcategories)
                .SelectMany(x => x.Subcategories)
                .FirstOrDefaultAsync(x => x.Title == request.Title && x.CategoryId == request.CategoryId);

            if (existingSubcategory != null) { return false; }

            var subcategory = new Subcategory
            {
                CategoryId = request.CategoryId,
                Title = request.Title,
                Description = request.Description
            };

            await _context.Subcategories.AddAsync(subcategory);
            return true;
        }

        public async Task<List<SubcategoryDTO>> GetSubcategoriesAsync(int userId, int categoryId)
        {
            var result = new List<SubcategoryDTO>();
            var subcategories = await _context.Categories.Where(x => x.UserId == userId && ((categoryId != 0) ? x.CategoryId == categoryId : true))
                .Include(x => x.Subcategories)
                .SelectMany(x => x.Subcategories)
                .ToListAsync();

            result.AddRange(subcategories.Select(x => new SubcategoryDTO
                {
                    SubcategoryId = x.SubcategoryId,
                    CategoryId = x.CategoryId,
                    Title = x.Title,
                    Description = x.Description
                })
             );

            return result;
        }

        public async Task<bool> UpdateSubcategoryAsync(UpdateSubcategoryRequest request, int userId)
        {
            var existingSubcategory = await _context.Categories.Where(x => x.UserId == userId)
                .Include(x => x.Subcategories)
                .SelectMany(x => x.Subcategories)
                .FirstOrDefaultAsync(x => x.SubcategoryId == request.SubcategoryId);

            if (existingSubcategory == null) { return false; }

            existingSubcategory.Title = request.NewTitle;
            existingSubcategory.Description = request.NewDescription;
            existingSubcategory.CategoryId = request.NewCategoryId;

            _context.Subcategories.Update(existingSubcategory);
            return true;
        }

        public async Task<bool> DeleteSubcategoryAsync(int subcategoryId, int userId)
        {
            var subcategory = await _context.Categories.Where(x => x.UserId == userId)
                .Include(x => x.Subcategories)
                .SelectMany(x => x.Subcategories)
                .FirstOrDefaultAsync(x => x.SubcategoryId == subcategoryId);
            if (subcategory == null) { return false; }

            _context.Subcategories.Remove(subcategory);
            return true;
        }
    }
}
