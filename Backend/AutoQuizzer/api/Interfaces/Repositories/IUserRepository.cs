using Types.UserService;

namespace Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<bool> SignUpUserAsync(UserSignupRequest request);
    }
}
