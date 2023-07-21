using Microsoft.AspNetCore.Mvc;
using Types.DTOs;
using Types.QuestionService;

namespace Interfaces.Services
{
    public interface ICategoryService
    {
        Task<bool> CreateCategoryAsync(CreateCategoryRequest request, int userId);
        Task<List<SubcategoryDTO>> GetCategoriesAsync(int userId);
    }
}
