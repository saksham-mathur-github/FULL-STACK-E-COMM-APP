using Microsoft.AspNetCore.Mvc;
using EComm_2.Service;
using EComm_2.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Linq;

namespace EComm_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn(UserCredentials credentials)
        {
            var user = await _userService.GetUserByEmailAsync(credentials.Email);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Assuming you have a method to verify the password
            if (!VerifyPassword(credentials.Password, user.Password))
            {
                return Unauthorized("Incorrect password.");
            }

            // If the user is found and the password is correct, return the user or a success message
            return Ok("Signin Successful");
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser()
        {
            // Extract user ID from JWT token
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User not authenticated.");
            }

            int currentUserId = int.Parse(userIdClaim.Value);
            await _userService.DeleteUserAsync(currentUserId);
            return Ok("User Deleted Successfully");
        }


        // Assuming you have a method to verify the password
        private bool VerifyPassword(string password, string storedPassword)
        {
            // Implement password verification logic here
            // This is a placeholder and should be replaced with actual password verification logic
            // For simplicity, let's assume the password is verified by comparing the input password with the stored password
            return password == storedPassword;
        }

        // UserCredentials model
        public class UserCredentials
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}
