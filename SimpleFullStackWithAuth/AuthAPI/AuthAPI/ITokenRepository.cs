using Microsoft.AspNetCore.Identity;

namespace AuthAPI
{
    public interface ITokenRepository
    {
        string CreateJwtToken(IdentityUser user, List<string> roles);
    }
}
