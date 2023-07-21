using AutoMapper;
using Interfaces.Repositories;
using Interfaces.Services;
using Types.DTOs;
using Types.QuestionService;

namespace ApplicationService
{
    internal class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<bool> CreateCategoryAsync(CreateCategoryRequest request, int userId)
        {
            await _unitOfWork.CategoryRepository.CreateCategoryAsync(request, userId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<List<SubcategoryDTO>> GetCategoriesAsync(int userId)
        {
            return await _unitOfWork.CategoryRepository.GetCategoriesAsync(userId);
        }
    }
}
