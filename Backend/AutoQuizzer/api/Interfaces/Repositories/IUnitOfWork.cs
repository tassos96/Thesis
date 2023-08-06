namespace Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository {get;}
        public ICategoryRepository CategoryRepository { get;}
        public ISubcategoryRepository SubcategoryRepository { get;}
        public IQuestionRepository QuestionRepository { get;}
        public ITestRepository TestRepository { get;}

        Task<bool> SaveAsync();
    }
}
