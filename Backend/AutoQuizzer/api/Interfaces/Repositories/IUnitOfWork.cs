namespace Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository {get;}
        Task<bool> SaveAsync();
    }
}
