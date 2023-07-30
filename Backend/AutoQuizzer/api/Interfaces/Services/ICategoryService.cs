using Microsoft.AspNetCore.Mvc;
using Types.CategoryService;
using Types.DTOs;

namespace Interfaces.Services
{
    public interface ICategoryService
    {
        Task<bool> CreateCategoryAsync(CreateCategoryRequest request, int userId);
        Task<List<CategoryDTO>> GetCategoriesAsync(int userId);
        Task<bool> UpdateCategoryAsync(UpdateCategoryRequest request, int userId);
        Task<bool> DeleteCategoryAsync(int categoryId, int id);
    }
}
