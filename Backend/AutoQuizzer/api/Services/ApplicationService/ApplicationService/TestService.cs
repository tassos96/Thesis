using AutoMapper;
using Interfaces.Repositories;
using Interfaces.Services;
using Types.DatabaseContext;
using Types.DTOs;
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
    }
}
