using Types.UserService;

namespace Interfaces.Services
{
    public interface IUserService
    {
        Task SignUpUserAsync(UserSignupRequest request);
    }
}
