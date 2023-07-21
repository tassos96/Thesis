﻿using Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Types.DTOs;
using Types.QuestionService;

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
        public async Task<List<SubcategoryDTO>> FetchCategoriesAsync()
        {
            var list = await _applicationService.CategoryService.GetCategoriesAsync(base.AppUser.Id);
            return list;
        }
    }
}