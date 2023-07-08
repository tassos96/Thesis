using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Types.DTOs;
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

        [HttpPost]
        public async Task<ActionResult<UserDTO>> LoginUserAsync(UserLoginRequest credentials)
        {
            var user = await _applicationService.UserService.LoginUserAsync(credentials);
            if (user == null)
            {
                return Unauthorized();
            }

            var userToken = _applicationService.UserService.CreateUserToken(user.UserId, user.Username, user.Email, _configuration["Authentication:SecretKey"]);
            user.SecurityToken = userToken;

            return Ok(user);
        }
    }
}
