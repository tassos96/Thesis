using Microsoft.AspNetCore.Mvc;
using Types.DTOs;
using Types.QuestionService;

namespace Interfaces.Repositories
{
    public interface ICategoryRepository
    {
        Task<bool> CreateCategoryAsync(CreateCategoryRequest request, int userId);
        Task<List<SubcategoryDTO>> GetCategoriesAsync(int userId);
    }
}
