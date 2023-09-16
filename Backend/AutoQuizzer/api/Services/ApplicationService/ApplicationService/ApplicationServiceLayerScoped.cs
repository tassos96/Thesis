using AutoMapper;
using Interfaces.Repositories;
using Interfaces.Services;

namespace ApplicationService
{
    public class ApplicationServiceLayerScoped : IApplicationServiceLayerScoped
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public ApplicationServiceLayerScoped(IUnitOfWork unitOfWork, IMapper mapper, IEmailService emailService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _emailService = emailService;
        }

        public IUserService UserService => new UserService(_unitOfWork, _mapper);
        public ICategoryService CategoryService => new CategoryService(_unitOfWork, _mapper);
        public ISubcategoryService SubategoryService => new SubcategoryService(_unitOfWork, _mapper);
        public IQuestionService QuestionService => new QuestionService(_unitOfWork, _mapper);
        public ITestService TestService => new TestService (_unitOfWork, _mapper, _emailService);
    }
}