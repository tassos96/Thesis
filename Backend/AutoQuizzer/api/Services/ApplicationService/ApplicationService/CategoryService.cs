using AutoMapper;
using Interfaces.Repositories;
using Interfaces.Services;
using Types.CategoryService;
using Types.DTOs;

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

        public async Task<List<CategoryDTO>> GetCategoriesAsync(int userId)
        {
            return await _unitOfWork.CategoryRepository.GetCategoriesAsync(userId);
        }

        public async Task<bool> UpdateCategoryAsync(UpdateCategoryRequest request, int userId)
        {
            await _unitOfWork.CategoryRepository.UpdateCategoryAsync(request, userId);
            return await _unitOfWork.SaveAsync();
        }

        public async Task<bool> DeleteCategoryAsync(int categoryId, int userId)
        {
            await _unitOfWork.CategoryRepository.DeleteCategoryAsync(categoryId, userId);
            return await _unitOfWork.SaveAsync();
        }
    }
}
