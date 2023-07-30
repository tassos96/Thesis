using Types.DTOs;
using Types.QuestionService;

namespace Interfaces.Services
{
    public interface IQuestionService
    {
        Task<List<QuestionDTO>> FetchQuestionsAsync(int userId, int categoryId, int subcategoryId);
        Task<bool> DeleteQuestionAsync(int userId, int categoryId, int subcategoryId, int questionId);
        Task<bool> CreateCategoryAsync(CreateQuestionRequest request, int userId);
        Task<bool> UpdateCategoryAsync(UpdateQuestionRequest request, int userId);
    }
}