using Interfaces.Repositories;
using Types.DatabaseContext;

namespace Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AutoQuizzerContext _context;
        public IUserRepository UserRepository => new UserRepository(_context);

        public UnitOfWork(AutoQuizzerContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}