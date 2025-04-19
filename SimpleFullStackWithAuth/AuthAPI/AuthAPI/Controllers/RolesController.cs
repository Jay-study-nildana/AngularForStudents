using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        // 1. Endpoint accessible without any token
        [HttpGet]
        [Route("public/starships")]
        [AllowAnonymous]
        public IActionResult GetPublicStarships()
        {
            var starships = new[]
            {
                "X-Wing",
                "TIE Fighter",
                "Millennium Falcon"
            };

            return Ok(starships);
        }

        // 2. Endpoint accessible with token only (No Role Required)
        [HttpGet]
        [Route("protected/planets")]
        [Authorize]
        public IActionResult GetProtectedPlanets()
        {
            var planets = new[]
            {
                "Tatooine",
                "Hoth",
                "Endor"
            };

            return Ok(planets);
        }

        // 3. Endpoint accessible only to Reader Role
        [HttpGet]
        [Route("reader/characters")]
        [Authorize(Roles = "Reader")]
        public IActionResult GetReaderCharacters()
        {
            var characters = new[]
            {
                "Luke Skywalker",
                "Leia Organa",
                "Han Solo"
            };

            return Ok(characters);
        }

        // 4. Endpoint accessible only to Writer Role
        [HttpGet]
        [Route("writer/vehicles")]
        [Authorize(Roles = "Writer")]
        public IActionResult GetWriterVehicles()
        {
            var vehicles = new[]
            {
                "Speeder Bike",
                "AT-AT Walker",
                "Sandcrawler"
            };

            return Ok(vehicles);
        }

        // 5. Endpoint accessible only to Admin Role
        [HttpGet]
        [Route("admin/forces")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAdminForces()
        {
            var forces = new[]
            {
                "The Force",
                "Dark Side",
                "Light Side"
            };

            return Ok(forces);
        }
    }
}
