using AutoMapper;
using Interfaces.Repositories;
using Interfaces.Services;
using Types.DTOs;
using Types.Enums;
using Types.TestService;

namespace ApplicationService
{
    public class TestService : ITestService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TestService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<bool> CreateTestAsync(CreateTestRequest request, int userId)
        {
            await _unitOfWork.TestRepository.CreateTestAsync(request, userId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<bool> AssignTestAsync(AssignTestRequest request, int userId)
        {
            await _unitOfWork.TestRepository.AssignTestAsync(request, userId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<List<TestDTO>> FetchTestsAsync(int userId, string difficulty)
        {
            return await _unitOfWork.TestRepository.FetchTestsAsync(userId, difficulty);
        }

        public async Task<bool> UpdateTestAsync(UpdateTestRequest request, int userId)
        {
            await _unitOfWork.TestRepository.UpdateTestAsync(request, userId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<bool> DeleteTestAsync(int testId, int userId)
        {
            await _unitOfWork.TestRepository.DeleteTestAsync(testId, userId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<List<TestUsersDTO>> FetchTestUsersAsync(int userId, int testId)
        {
            return await _unitOfWork.TestRepository.FetchTestUsersAsync(userId, testId);
        }

        public async Task<TestStatisticsDTO> FetchTestStatisticsAsync(int userId, int testId)
        {
            var testUsers = await _unitOfWork.TestRepository.FetchTestUsersAsync(userId, testId);

            var grades = testUsers.Where(x => x.Grade != null).Select(x => Convert.ToInt32(x.Grade)).ToList();

            if (grades.Count == 0)
                return new TestStatisticsDTO();


            var distributions = CalculateGradeDistribution(grades);

            return new TestStatisticsDTO
            {
                First = distributions.ElementAt(0).Value,
                Second = distributions.ElementAt(1).Value,
                Third = distributions.ElementAt(2).Value,
                Fourth = distributions.ElementAt(3).Value,
            };
        }


        private Dictionary<string, int> CalculateGradeDistribution(List<int>? grades)
        {
            Dictionary<string, int> distribution = new Dictionary<string, int>();

            int totalGrades = grades.Count;
            int topRange = 100;
            int bottomRange = 75;
            int rangeSize = 25; // Adjust the range size as needed

            while (bottomRange < 100 && bottomRange >= 0)
            {
                int countInRange = grades.Count(grade => grade <= topRange && grade > bottomRange);
                if (bottomRange == 0)
                    countInRange += grades.Where(x => x == 0).Count();
                int percentage = ((int)countInRange / totalGrades) * 100;
                string rangeLabel = $"{topRange}-{bottomRange}";
                distribution.Add(rangeLabel, percentage);

                topRange = bottomRange - 1;
                bottomRange = bottomRange - rangeSize;
            }

            return distribution;
        }

        public async Task<bool> DeleteTestAssignmentAsync(DeleteTestAssignmentRequest request, int userId)
        {
            await _unitOfWork.TestRepository.DeleteTestAssignmentAsync(request, userId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<List<UserExamsDTO>> FetchUserExamsAsync(int userId, string difficulty)
        {
            return await _unitOfWork.TestRepository.FetchUserExamsAsync(userId, difficulty);
        }

        public async Task<List<QuestionFullDTO>> FetchExamQuestionsAsync(int userId, int examId)
        {
            return await _unitOfWork.TestRepository.FetchExamQuestionsAsync(userId, examId);
        }
    }
}
