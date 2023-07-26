namespace Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository {get;}
        public ICategoryRepository CategoryRepository { get;}
        public ISubcategoryRepository SubcategoryRepository { get;}

        Task<bool> SaveAsync();
    }
}
