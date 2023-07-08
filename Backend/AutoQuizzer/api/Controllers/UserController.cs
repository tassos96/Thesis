using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Types.UserService;

namespace Controllers
{
    public class UserController : BaseController
    {
        private readonly IConfiguration _configuration;
        public UserController(IApplicationServiceLayerScoped applicationService, IConfiguration configuration) : base(applicationService)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> SignupUserAsync(UserSignupRequest request)
        {
            await _applicationService.UserService.SignUpUserAsync(request);
            return Ok();
        }
    }
}
