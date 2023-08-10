using AutoMapper;
using Interfaces.Repositories;
using Interfaces.Services;
using Types.DatabaseContext;
using Types.DTOs;
using Types.QuestionService;

namespace ApplicationService
{
    internal class QuestionService : IQuestionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public QuestionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<QuestionDTO>> FetchQuestionsAsync(int userId, int categoryId, int subcategoryId)
        {
            return await _unitOfWork.QuestionRepository.FetchQuestionsAsync(userId, categoryId, subcategoryId);
        }

        public async Task<bool> DeleteQuestionAsync(int userId, int categoryId, int subcategoryId, int questionId)
        {
            await _unitOfWork.QuestionRepository.DeleteQuestionAsync(userId, categoryId, subcategoryId, questionId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<bool> CreateCategoryAsync(CreateQuestionRequest request, int userId)
        {
            await _unitOfWork.QuestionRepository.CreateQuestionAsync(request, userId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<bool> UpdateCategoryAsync(UpdateQuestionRequest request, int userId)
        {
            await _unitOfWork.QuestionRepository.UpdateQuestionAsync(request, userId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<List<QuestionDTO>> FetchTestQuestionsWithAnswersAsync(int testId, int userId)
        {
            return await _unitOfWork.QuestionRepository.FetchQuestionsWithAnswersAsync(userId, testId);
        }
    }
}
