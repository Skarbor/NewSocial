using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NewSocial.Database.Abstract;
using NewSocial.Entities.Post;
using NewSocial.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewSocial.Api.Controllers
{
    [Route("api/Comments")]
    [Authorize]
    public class CommentsApiController : Controller
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly IRepository _repository;

        public CommentsApiController(UserManager<UserEntity> userManager, IRepository repository)
        {
            _repository = repository;
            _userManager = userManager;
        }

        [HttpPut("Add")]
        public async Task<IActionResult> Add(int postId, string text)
        {
            try
            {
                var currentUser = await _userManager.GetUserAsync(HttpContext.User);

                _repository.AddComment(currentUser, postId, text);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet("GetAllForPost")]
        public IActionResult GetAllForPost(int postId)
        {
            IEnumerable<PostEntity> allComments;
            try
            {
                allComments = _repository.GetAllCommentsForPost(postId);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok(allComments);
        }
    }
}
