using Types.DTOs;
using Types.QuestionService;

namespace Interfaces.Repositories
{
    public interface ISubcategoryRepository
    {
        Task<bool> CreateSubcategoryAsync(CreateSubcategoryRequest request, int userId);
        Task<List<SubcategoryDTO>> GetSubcategoriesAsync(int userId, int categoryId);
        Task<bool> UpdateSubcategoryAsync(UpdateSubcategoryRequest request, int userId);
        Task<bool> DeleteSubcategoryAsync(int subcategoryId, int userId);
    }
}
