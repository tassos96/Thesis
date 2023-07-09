using AutoMapper;
using Interfaces.Repositories;
using Interfaces.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Types.DTOs;
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

        public async Task<UserDTO> LoginUserAsync(UserLoginRequest request)
        {
            var user = await _unitOfWork.UserRepository.GetUserAsync(request.Username, request.Password);
            if (user == null)
            {
                return null;
            }
            var userDTO = _mapper.Map<UserDTO>(user);
            return userDTO;
        }

        public string CreateUserToken(int userId, string userName, string email, string appSecurityKey)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(appSecurityKey));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claimsInfo = new List<Claim>();
            claimsInfo.Add(new Claim(ClaimTypes.Name, userName));
            claimsInfo.Add(new Claim(ClaimTypes.NameIdentifier, userId.ToString()));
            claimsInfo.Add(new Claim(ClaimTypes.Email, email));
            var jwtSecurityToken = new JwtSecurityToken(null, null, claimsInfo, DateTime.UtcNow, DateTime.UtcNow.AddHours(3), signingCredentials);

            var userToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            return "Bearer " + userToken;
        }

        public async Task<UserDTO> UpdateUserAccountInfoAsync(UserSignupRequest request, int userId)
        {
            var user = await _unitOfWork.UserRepository.UpdateUserAsync(request, userId);
            await _unitOfWork.SaveAsync();

            return _mapper.Map<UserDTO>(user);
        }
    }
}