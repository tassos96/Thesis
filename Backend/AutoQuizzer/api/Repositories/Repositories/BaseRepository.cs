using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Types.DatabaseContext;

namespace Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        public readonly AutoQuizzerContext _context;
        private readonly DbSet<T> _table;

        public BaseRepository(AutoQuizzerContext context)
        {
            _context = context;
            _table = _context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetListAsync()
        {
            var entities = await _table.ToListAsync();
            return entities;
        }

        public async Task<T> GetAsync(int id)
        {
            var entity = await _table.FindAsync(id);
            return entity;
        }

        public async Task AddAsync(T entity)
        {
            await _table.AddAsync(entity);
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await _table.AddRangeAsync(entities);
        }

        public void Update(T entity)
        {
            _table.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public async Task DeleteAsync(int id)
        {
            T existing = await _table.FindAsync(id);
            _table.Remove(existing);
        }

        public async Task<int> GetCountAsync()
        {
            var count = await _table.CountAsync();
            return count;
        }

    }
}
