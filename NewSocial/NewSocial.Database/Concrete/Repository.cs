using System;
using Microsoft.EntityFrameworkCore;
using NewSocial.Database.Abstract;
using NewSocial.Database.Context;


namespace NewSocial.Database.Concrete
{
    public class Repository : IRepository
    {
        private ApplicationDbContext _context;

        public Repository(DbContextOptions<ApplicationDbContext> options) : this(new ApplicationDbContext(options))
        {
        }

        public Repository(ApplicationDbContext context)
        {
            if(context == null) throw  new ArgumentNullException(nameof(context));

            _context = context;
        }
    }
}
