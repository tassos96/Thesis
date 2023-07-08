namespace Interfaces.Services
{
    public interface IApplicationServiceLayerScoped
    {
        IUserService UserService { get; }
    }
}