using System;
using Microsoft.EntityFrameworkCore;
using NewSocial.Database.Abstract;
using NewSocial.Database.Context;
using NewSocial.Models.User;
using NewSocial.Entities.Post;

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

        public void AddPost(UserEntity user, string text)
        {
            _context.Posts.Add(new PostEntity { User = user, Text = text, Date = DateTime.Now });

            _context.SaveChanges();
        }
    }
}
