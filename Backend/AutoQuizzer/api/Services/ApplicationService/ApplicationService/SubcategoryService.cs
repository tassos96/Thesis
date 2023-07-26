using AutoMapper;
using Interfaces.Repositories;
using Interfaces.Services;
using Types.DTOs;
using Types.QuestionService;

namespace ApplicationService
{
    internal class SubcategoryService : ISubcategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SubcategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<bool> CreateSubcategoryAsync(CreateSubcategoryRequest request, int userId)
        {
            await _unitOfWork.SubcategoryRepository.CreateSubcategoryAsync(request, userId);
            return await _unitOfWork.SaveAsync();
        }
        public async Task<List<SubcategoryDTO>> GetSubcategoriesAsync(int userId, int categoryId)
        {
            return await _unitOfWork.SubcategoryRepository.GetSubcategoriesAsync(userId, categoryId);
        }
        public async Task<bool> UpdateSubcategoryAsync(UpdateSubcategoryRequest request, int userId)
        {
            await _unitOfWork.SubcategoryRepository.UpdateSubcategoryAsync(request, userId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<bool> DeleteSubcategoryAsync(int subcategoryId, int userId)
        {
            await _unitOfWork.SubcategoryRepository.DeleteSubcategoryAsync(subcategoryId, userId);
            return await _unitOfWork.SaveAsync();
        }
    }
}
