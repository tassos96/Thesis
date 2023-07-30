using Types.DTOs;
using Types.QuestionService;

namespace Interfaces.Repositories
{
    public interface IQuestionRepository
    {
        Task<List<QuestionDTO>> FetchQuestionsAsync(int userId, int categoryId, int subcategoryId);
        Task<bool> DeleteQuestionAsync(int userId, int categoryId, int subcategoryId, int questionId);
        Task<bool> CreateQuestionAsync(CreateQuestionRequest request, int userId);
        Task<bool> UpdateQuestionAsync(UpdateQuestionRequest request, int userId);
    }
}
