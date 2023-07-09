using Types.DatabaseContext;
using Types.UserService;

namespace Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<bool> SignUpUserAsync(UserSignupRequest request);
        Task<User> GetUserAsync(string username, string password);
        Task<User> UpdateUserAsync(UserSignupRequest request, int userId);
    }
}
