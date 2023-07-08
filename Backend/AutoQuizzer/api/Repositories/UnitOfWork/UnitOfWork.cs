using Interfaces.Repositories;
using Types.DatabaseContext;

namespace UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AutoQuizzerContext _context;

        public IUserRepository UserRepository => throw new NotImplementedException();

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}