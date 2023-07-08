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
                FullName = request.FullName,
                Password = EncryptionHelper.Encrypt(request.Password),
                Institution = request.Institution,
                PhoneNumber = request.PhoneNumber,
                UserRole = request.UserRole.ToString()
            };

            await _context.Users.AddAsync(user);
            return true;
        }
    }
}