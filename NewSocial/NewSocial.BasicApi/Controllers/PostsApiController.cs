using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NewSocial.Database.Abstract;
using NewSocial.Database.Concrete;
using NewSocial.Entities.Post;
using NewSocial.Models.User;
using System;
using System.Collections;
using System.Collections.Generic;
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

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            IEnumerable<PostEntity> allPosts;
            try
            {
                allPosts = _repository.GetAllPosts();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok(allPosts);      
        }

        [HttpPost("Like")]
        public async Task<IActionResult> Like(int postId)
        {
            try
            {
                var currentUser = await _userManager.GetUserAsync(HttpContext.User);
                _repository.LikePost(postId, currentUser);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet("DoesUserLikePost")]
        public async Task<IActionResult> DoesUserLikePost(int postId)
        {
            try
            {
                var currentUser = await _userManager.GetUserAsync(HttpContext.User);
                return Ok(_repository.DoesUserLikePost(postId, currentUser));
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
