using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Types;

namespace Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BaseController : Controller
    {
        public readonly IApplicationServiceLayerScoped _applicationService;

        protected BaseController(IApplicationServiceLayerScoped applicationService)
        {
            _applicationService = applicationService;
        }

        private ApplicationUser? _AppUser;

        protected ApplicationUser AppUser
        {
            get
            {
                if (User != null && User.Claims != null && User.Claims.Any())
                {

                    var claimsTypes = User.Claims.Select(x => x.Type);
                    if (!claimsTypes.Contains(ClaimTypes.NameIdentifier))
                    {
                        return null;
                    }

                    var id = 0;
                    var userClaimsId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                    int.TryParse(userClaimsId, out id);
                    _AppUser = new ApplicationUser
                    {
                        Id = id
                    };

                    var userClaimsName = User.FindFirst(ClaimTypes.Name)?.Value;
                    _AppUser.Username = userClaimsName;
                    _AppUser.Email = User.FindFirst(ClaimTypes.Email)?.Value;
                    return _AppUser;
                }
                return null;
            }
        }
    }
}