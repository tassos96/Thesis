namespace Interfaces.Services
{
    public interface IApplicationServiceLayerScoped
    {
        IUserService UserService { get; }
        ICategoryService CategoryService { get; }
        ISubcategoryService SubategoryService { get; }
        IQuestionService QuestionService { get; }
        ITestService TestService { get; }
    }
}