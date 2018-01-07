using System;
using NewSocial.Database.Abstract;
using NewSocial.Database.Context;
using NewSocial.Models.User;
using NewSocial.Entities.Post;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
    }
}
