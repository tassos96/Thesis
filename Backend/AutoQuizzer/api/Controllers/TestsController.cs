using Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Types.DTOs;
using Types.TestService;

namespace Controllers
{
    public class TestsController : BaseController
    {
        public TestsController(IApplicationServiceLayerScoped applicationService) : base(applicationService)
        {
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateTestAsync(CreateTestRequest request)
        {
            if (request.QuestionsNumber > 30)
                return BadRequest();

            var result = await _applicationService.TestService.CreateTestAsync(request, base.AppUser.Id);

            return result ? Ok() : BadRequest();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AssignTestAsync(AssignTestRequest request)
        {
            var result = await _applicationService.TestService.AssignTestAsync(request, base.AppUser.Id);
            return result ? Ok() : BadRequest();
        }

        [HttpGet]
        [Authorize]
        public async Task<List<TestDTO>> FetchTestsAsync(string difficulty)
        {
            var list = await _applicationService.TestService.FetchTestsAsync(base.AppUser.Id, difficulty);
            return list;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateTestAsync(UpdateTestRequest request)
        {
            var result = await _applicationService.TestService.UpdateTestAsync(request, base.AppUser.Id);
            return result ? Ok() : BadRequest();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteTestAsync(int testId)
        {
            var result = await _applicationService.TestService.DeleteTestAsync(testId, base.AppUser.Id);
            return result ? Ok(result) : BadRequest();
        }

        [HttpGet]
        [Authorize]
        public async Task<List<TestUsersDTO>> FetchTestUsersAsync(int testId)
        {
            var list = await _applicationService.TestService.FetchTestUsersAsync(base.AppUser.Id, testId);
            return list;
        }

        [HttpGet]
        [Authorize]
        public async Task<TestStatisticsDTO> FetchTestStatisticsAsync(int testId)
        {
            var list = await _applicationService.TestService.FetchTestStatisticsAsync(base.AppUser.Id, testId);
            return list;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> DeleteTestAssignmentAsync(DeleteTestAssignmentRequest request)
        {
            var result = await _applicationService.TestService.DeleteTestAssignmentAsync(request, base.AppUser.Id);
            return result ? Ok(result) : BadRequest();
        }

        [HttpGet]
        [Authorize]
        public async Task<List<UserExamsDTO>> FetchUserExamsAsync(string difficulty)
        {
            var list = await _applicationService.TestService.FetchUserExamsAsync(base.AppUser.Id, difficulty);
            return list;
        }

        [HttpGet]
        [Authorize]
        public async Task<List<QuestionFullDTO>> FetchExamQuestionsAsync(int examId)
        {
            var list = await _applicationService.TestService.FetchExamQuestionsAsync(base.AppUser.Id, examId);
            return list;
        }
    }
}
