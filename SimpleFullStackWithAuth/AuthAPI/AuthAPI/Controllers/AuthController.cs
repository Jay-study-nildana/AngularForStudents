using System.Security.Claims;
using AuthAPI.Data;
using AuthAPI.Domain;
using AuthAPI.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;
        private readonly UserProfileDbContext userProfileDbContext;

        public AuthController(UserManager<IdentityUser> userManager,
            ITokenRepository tokenRepository,
            UserProfileDbContext userProfileDbContext)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
            this.userProfileDbContext = userProfileDbContext;
        }

        // POST: {apibaseurl}/api/auth/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            // Check Email
            var identityUser = await userManager.FindByEmailAsync(request.Email);

            if (identityUser is not null)
            {
                // Check Password
                var checkPasswordResult = await userManager.CheckPasswordAsync(identityUser, request.Password);

                if (checkPasswordResult)
                {
                    var roles = await userManager.GetRolesAsync(identityUser);

                    // Create a Token and Response
                    var jwtToken = tokenRepository.CreateJwtToken(identityUser, roles.ToList());

                    var response = new LoginResponseDto()
                    {
                        Email = request.Email,
                        Roles = roles.ToList(),
                        Token = jwtToken
                    };

                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or Password Incorrect");


            return ValidationProblem(ModelState);
        }


        // POST: {apibaseurl}/api/auth/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            // Create IdentityUser object
            var user = new IdentityUser
            {
                UserName = request.Email?.Trim(),
                Email = request.Email?.Trim()
            };

            // Create User
            var identityResult = await userManager.CreateAsync(user, request.Password);

            if (identityResult.Succeeded)
            {
                // Add Role to user (Reader)
                identityResult = await userManager.AddToRoleAsync(user, "Reader");

                if (identityResult.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    if (identityResult.Errors.Any())
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }
            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }

            return ValidationProblem(ModelState);
        }

        // GET: {apibaseurl}/api/auth/users
        [HttpGet]
        [Route("users")]
        public async Task<IActionResult> GetUsers()
        {
            // Retrieve all users
            var users = userManager.Users.Select(user => new
            {
                user.Id,
                user.UserName,
                user.Email
            }).ToList();

            return Ok(users);
        }

        // GET: {apibaseurl}/api/auth/users-with-roles
        [HttpGet]
        [Route("users-with-roles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var usersWithRoles = new List<object>();

            foreach (var user in userManager.Users.ToList())
            {
                var roles = await userManager.GetRolesAsync(user);
                usersWithRoles.Add(new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    Roles = roles
                });
            }

            return Ok(usersWithRoles);
        }

        [HttpPost]
        [Route("request-password-reset")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] PasswordResetRequestDto request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Generate password reset token
            var token = await userManager.GeneratePasswordResetTokenAsync(user);

            // Return the token in the response (for classroom purposes)
            return Ok(new { Token = token });
        }

        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] PasswordResetDto request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Reset the password
            var result = await userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);

            if (result.Succeeded)
            {
                return Ok("Password has been reset successfully.");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }

            return ValidationProblem(ModelState);
        }

        [HttpPost]
        [Route("generate-password-reset-link")]
        public async Task<IActionResult> GeneratePasswordResetLink([FromBody] PasswordResetRequestDto request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Generate password reset token
            var token = await userManager.GeneratePasswordResetTokenAsync(user);

            // Generate the reset link
            var resetLink = Url.Action(
                action: "ResetPassword", // This is the action name for resetting the password
                controller: "Auth", // This is the controller name
                values: new { email = request.Email, token = token },
                protocol: Request.Scheme // Ensures the link includes the correct protocol (http/https)
            );

            return Ok(new { ResetLink = resetLink });
        }

        [HttpPost]
        [Route("update-user-details")]
        [Authorize] // Ensure the endpoint is authenticated
        public async Task<IActionResult> UpdateUserDetails([FromBody] UpdateUserDetailsDto request)
        {
            // Get the authenticated user's email
            //var email = User?.Identity?.Name;

            //if (string.IsNullOrEmpty(email))
            //{
            //    return Unauthorized("User is not authenticated.");
            //}

            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("Email claim is missing.");
            }

            // Check if the user profile exists
            var userProfile = await userProfileDbContext.UserProfiles.FirstOrDefaultAsync(up => up.Email == email);

            if (userProfile == null)
            {
                // Create a new user profile if it doesn't exist
                userProfile = new UserProfile
                {
                    Email = email,
                    PrimaryMobileNumber = request.PrimaryMobileNumber,
                    SecondaryMobileNumber = request.SecondaryMobileNumber,
                    HomeAddress = request.HomeAddress,
                    OfficeAddress = request.OfficeAddress,
                    SecondaryEmail = request.SecondaryEmail,
                    AdditionalInfo = request.AdditionalInfo
                };

                userProfileDbContext.UserProfiles.Add(userProfile);
            }
            else
            {
                // Update the existing user profile
                userProfile.PrimaryMobileNumber = request.PrimaryMobileNumber;
                userProfile.SecondaryMobileNumber = request.SecondaryMobileNumber;
                userProfile.HomeAddress = request.HomeAddress;
                userProfile.OfficeAddress = request.OfficeAddress;
                userProfile.SecondaryEmail = request.SecondaryEmail;
                userProfile.AdditionalInfo = request.AdditionalInfo;

                userProfileDbContext.UserProfiles.Update(userProfile);
            }

            // Save changes to the database
            await userProfileDbContext.SaveChangesAsync();

            // Return the updated user profile
            return Ok(userProfile);
        }

        [HttpGet]
        [Route("user-details")]
        [Authorize]
        public async Task<IActionResult> GetUserDetails()
        {
            // Get the authenticated user's email from claims
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("Email claim is missing.");
            }

            // Retrieve the UserProfile from the database
            var userProfile = await userProfileDbContext.UserProfiles.FirstOrDefaultAsync(up => up.Email == email);

            // Map UserProfile to UserProfileDto
            var userProfileDto = userProfile == null ? null : new UserProfileDto
            {
                Email = userProfile.Email,
                PrimaryMobileNumber = userProfile.PrimaryMobileNumber,
                SecondaryMobileNumber = userProfile.SecondaryMobileNumber,
                HomeAddress = userProfile.HomeAddress,
                OfficeAddress = userProfile.OfficeAddress,
                SecondaryEmail = userProfile.SecondaryEmail,
                AdditionalInfo = userProfile.AdditionalInfo
            };

            // Retrieve the user's claims
            var userClaims = User.Claims.Select(c => new ClaimDto
            {
                Type = c.Type,
                Value = c.Value
            }).ToList();

            // Create the response DTO
            var response = new UserDetailsResponseDto
            {
                UserProfile = userProfileDto,
                Claims = userClaims
            };

            return Ok(response);
        }


        [HttpGet]
        [Route("debug-claims")]
        [Authorize]
        public IActionResult DebugClaims()
        {
            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
            return Ok(claims);
        }

    }
}
