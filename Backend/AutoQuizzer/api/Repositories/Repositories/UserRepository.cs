using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Security;
using Types.DatabaseContext;
using Types.UserService;

namespace Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(AutoQuizzerContext context) : base(context)
        {
        }

        public async Task<bool> SignUpUserAsync(UserSignupRequest request)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(x => x.Username == request.Username || x.Email == request.Email);
            if (existingUser != null)
                return false;

            var user = new User()
            {
                Username = request.Username,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Password = EncryptionHelper.Encrypt(request.Password),
                Institution = request.Institution,
                PhoneNumber = request.PhoneNumber,
                UserRole = request.UserRole.ToString()
            };

            await _context.Users.AddAsync(user);
            return true;
        }

        public async Task<User> GetUserAsync(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username || x.Email == username);
            if (user == null)
            {
                return null;
            }
            if (!EncryptionHelper.IsValidPassword(password, user.Password))
            {
                return null;
            }
            return user;
        }
    }
}