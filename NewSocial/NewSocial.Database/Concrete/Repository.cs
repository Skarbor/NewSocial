using System;
using NewSocial.Database.Abstract;
using NewSocial.Database.Context;
using NewSocial.Models.User;
using NewSocial.Entities.Post;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using NewSocial.Entities;

namespace NewSocial.Database.Concrete
{
    public class Repository : IRepository
    {
        private ApplicationDbContext _context;

        public Repository(ApplicationDbContext context)
        {
            if(context == null) throw  new ArgumentNullException(nameof(context));

            _context = context;
        }

        public void AddComment(UserEntity user, int postId, string text)
        {
            _context.Posts.Add(new PostEntity { User = user, ParentId = postId, Text = text, Date = DateTime.Now });

            _context.SaveChanges();
        }

        public void AddPost(UserEntity user, string text)
        {
            _context.Posts.Add(new PostEntity { User = user, Text = text, Date = DateTime.Now });

            _context.SaveChanges();
        }

        public IEnumerable<PostEntity> GetAllCommentsForPost(int postId)
        {
            return _context.Posts.Where(post => post.ParentId == postId).Include(post => post.User);
        }

        public IEnumerable<PostEntity> GetAllPosts()
        {
            return _context.Posts.Where(post => post.ParentId == null).Include(post => post.User);
        }

        public void LikePost(int postId, UserEntity user)
        {
            if (!DoesUserLikePost(postId, user))
            {
                var post = _context.Posts.Where(_post => _post.Id == postId).Include(_post => _post.Likes).Single();
                post.Likes.Add(new Like() { Date = DateTime.Now, User = user });

                _context.SaveChanges();
            }
        }

        public bool DoesUserLikePost(int postId, UserEntity user)
        {
            var post = _context.Posts.Where(_post => _post.Id == postId).Include(_post => _post.Likes).Single();

            if (post.Likes.Where(like => like.User.Id == user.Id).SingleOrDefault() != null) return true;
            return false;
        }
    }
}
