using Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Types.DTOs;
using Types.QuestionService;

namespace Controllers
{
    public class QuestionsController : BaseController
    {
        public QuestionsController(IApplicationServiceLayerScoped applicationService) : base(applicationService)
        {
        }

        [HttpGet]
        [Authorize]
        public async Task<List<QuestionDTO>> FetchQuestionsAsync(int categoryId, int subcategoryId)
        {
            var list = await _applicationService.QuestionService.FetchQuestionsAsync(this.AppUser.Id, categoryId, subcategoryId);
            return list;
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteQuestionAsync(int categoryId, int subcategoryId, int questionId)
        {
            var result = await _applicationService.QuestionService.DeleteQuestionAsync(base.AppUser.Id, categoryId, subcategoryId, questionId);
            return result ? Ok(result) : BadRequest();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateQuestionAsync(CreateQuestionRequest request)
        {
            var result = await _applicationService.QuestionService.CreateCategoryAsync(request, base.AppUser.Id);
            return result ? Ok(result) : BadRequest();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateQuestionAsync(UpdateQuestionRequest request)
        {
            var result = await _applicationService.QuestionService.UpdateCategoryAsync(request, base.AppUser.Id);
            return result ? Ok(result) : BadRequest();
        }

        [HttpGet]
        [Authorize]
        public async Task<List<QuestionDTO>> FetchTestQuestionsWithAnswersAsync(int testId)
        {
            var result = await _applicationService.QuestionService.FetchTestQuestionsWithAnswersAsync(testId, base.AppUser.Id);
            return result;
        }

        [HttpGet]
        [Authorize]
        public async Task<List<QuestionDTO>> FetchTestQuestionsWithAnswersForUserAsync(int testId)
        {
            var result = await _applicationService.QuestionService.FetchTestQuestionsWithAnswersForUserAsync(testId, base.AppUser.Id);
            return result;
        }
    }
}
