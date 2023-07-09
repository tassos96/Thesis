using Types.DTOs;
using Types.UserService;

namespace Interfaces.Services
{
    public interface IUserService
    {
        Task SignUpUserAsync(UserSignupRequest request);
        Task<UserDTO> LoginUserAsync(UserLoginRequest credentials);
        string CreateUserToken(int userId, string userName, string email, string securityKey);

        Task<UserDTO> UpdateUserAccountInfoAsync(UserSignupRequest request, int userId);
    }
}
