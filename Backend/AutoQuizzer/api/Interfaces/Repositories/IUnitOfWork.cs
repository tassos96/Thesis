namespace Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository {get;}
        public ICategoryRepository CategoryRepository { get;}

        Task<bool> SaveAsync();
    }
}
