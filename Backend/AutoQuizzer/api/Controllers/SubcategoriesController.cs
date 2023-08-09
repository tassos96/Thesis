using Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Types.DTOs;
using Types.SubcategoryService;

namespace Controllers
{
    public class SubcategoriesController : BaseController
    {
        public SubcategoriesController(IApplicationServiceLayerScoped applicationService) : base(applicationService)
        {
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateSubcategoryAsync(CreateSubcategoryRequest request)
        {
            var result = await _applicationService.SubategoryService.CreateSubcategoryAsync(request, base.AppUser.Id);
            return result ? Ok(result) : BadRequest();
        }

        [HttpGet]
        [Authorize]
        public async Task<List<SubcategoryDTO>> FetchSubcategoriesAsync(int categoryId)
        {
            var list = await _applicationService.SubategoryService.GetSubcategoriesAsync(base.AppUser.Id, categoryId);
            return list;
        }

        [HttpPost]
        [Authorize]
        public async Task<List<SubcategoryDTO>> FetchSubcategoriesByCategoriesAsync(FetchSubcategoriesByCategoriesRequest request)
        {
            var list = await _applicationService.SubategoryService.GetSubcategoriesByCategoriesAsync(base.AppUser.Id, request);
            return list;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateSubcategoryAsync(UpdateSubcategoryRequest request)
        {
            var result = await _applicationService.SubategoryService.UpdateSubcategoryAsync(request, base.AppUser.Id);
            return result ? Ok(result) : BadRequest();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteSubcategoryAsync(int subcategoryId)
        {
            var result = await _applicationService.SubategoryService.DeleteSubcategoryAsync(subcategoryId, base.AppUser.Id);
            return result ? Ok(result) : BadRequest();
        }
    }
}
