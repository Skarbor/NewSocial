using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NewSocial.Database.Abstract;
using NewSocial.Database.Concrete;
using NewSocial.Models.User;
using System;
using System.Threading.Tasks;

namespace NewSocial.Api.Controllers
{
    [Route("api/Posts")]
    [Authorize]
    public class PostsApiController : Controller
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly IRepository _repository;

        public PostsApiController(UserManager<UserEntity> userManager, IRepository repository)
        {
             _repository = repository;
            _userManager = userManager;
        }

        [HttpPut("Create")]
        public async Task<IActionResult> Create(string postText)
        {
            try
            {
                var currentUser = await _userManager.GetUserAsync(HttpContext.User);

                _repository.AddPost(currentUser, postText);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
