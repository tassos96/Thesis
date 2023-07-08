namespace Interfaces.Repositories
{
    public interface IBaseRepository<T>
    {
        Task<IEnumerable<T>> GetListAsync();

        Task<T> GetAsync(int id);

        Task AddAsync(T entity);

        Task AddRangeAsync(IEnumerable<T> entities);

        void Update(T entity);

        Task DeleteAsync(int id);

        Task<int> GetCountAsync();
    }
}
