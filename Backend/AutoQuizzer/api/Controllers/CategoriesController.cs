using Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Types.CategoryService;
using Types.DTOs;

namespace Controllers
{
    public class CategoriesController : BaseController
    {
        public CategoriesController(IApplicationServiceLayerScoped applicationService) : base(applicationService)
        {
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCategoryAsync(CreateCategoryRequest request)
        {
            var result = await _applicationService.CategoryService.CreateCategoryAsync(request, base.AppUser.Id);
            return result ? Ok(result) : BadRequest();
        }

        [HttpGet]
        [Authorize]
        public async Task<List<CategoryDTO>> FetchCategoriesAsync()
        {
            var list = await _applicationService.CategoryService.GetCategoriesAsync(base.AppUser.Id);
            return list;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateCategoryAsync(UpdateCategoryRequest request)
        {
            var result = await _applicationService.CategoryService.UpdateCategoryAsync(request, base.AppUser.Id);
            return result ? Ok(result) : BadRequest();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteCategoryAsync(int categoryId)
        {
            var result = await _applicationService.CategoryService.DeleteCategoryAsync(categoryId, base.AppUser.Id);
            return result ? Ok(result) : BadRequest();
        }
    }
}
