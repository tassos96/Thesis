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
    }
}
