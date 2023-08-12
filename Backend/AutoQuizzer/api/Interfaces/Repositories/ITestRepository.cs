using Types.DatabaseContext;
using Types.DTOs;
using Types.TestService;

namespace Interfaces.Repositories
{
    public interface ITestRepository
    {
        Task<bool> CreateTestAsync(CreateTestRequest request, int userId);

        Task<bool> AssignTestAsync(string[] usersToAssing, Test test);
        Task<bool> AssignTestAsync(AssignTestRequest request, int userId);
        Task<List<TestDTO>> FetchTestsAsync(int userId, string difficulty);
        Task<bool> UpdateTestAsync(UpdateTestRequest request, int userId);
        Task<bool> DeleteTestAsync(int testId, int userId);
        Task<List<TestUsersDTO>> FetchTestUsersAsync(int userId, int testId);
        Task<bool> DeleteTestAssignmentAsync(DeleteTestAssignmentRequest request, int userId);
        Task<List<UserExamsDTO>> FetchUserExamsAsync(int userId, string difficulty);
        Task<List<QuestionFullDTO>> FetchExamQuestionsAsync(int userId, int examId);
    }
}
