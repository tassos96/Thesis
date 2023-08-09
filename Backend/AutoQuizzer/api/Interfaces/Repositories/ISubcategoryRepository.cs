using Types.DTOs;
using Types.SubcategoryService;

namespace Interfaces.Repositories
{
    public interface ISubcategoryRepository
    {
        Task<bool> CreateSubcategoryAsync(CreateSubcategoryRequest request, int userId);
        Task<List<SubcategoryDTO>> GetSubcategoriesAsync(int userId, int categoryId);
        Task<bool> UpdateSubcategoryAsync(UpdateSubcategoryRequest request, int userId);
        Task<bool> DeleteSubcategoryAsync(int subcategoryId, int userId);
        Task<List<SubcategoryDTO>> GetSubcategoriesByCategoriesAsync(int userId, FetchSubcategoriesByCategoriesRequest request);
    }
}
