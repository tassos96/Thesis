using AutoMapper;
using Interfaces.Repositories;
using Interfaces.Services;
using Types.UserService;

namespace ApplicationService
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task SignUpUserAsync(UserSignupRequest request)
        {
            if (!await _unitOfWork.UserRepository.SignUpUserAsync(request))
                throw new ApplicationException("User Already Exists");
            await _unitOfWork.SaveAsync();
        }
    }
}