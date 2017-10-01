using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NewSocial.Entities.Post;
using NewSocial.Models.User;

namespace NewSocial.Database.Context
{
    public class ApplicationDbContext : IdentityDbContext<UserEntity>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=DESKTOP-OMV8OT1\SQLEXPRESS;Initial Catalog=NewSocial;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False;");
        }

        public virtual DbSet<PostEntity> Posts { get; set; }
    }
}
