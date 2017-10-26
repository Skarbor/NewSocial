using NewSocial.Entities.Post;
using NewSocial.Models.User;
using System.Collections.Generic;

namespace NewSocial.Database.Abstract
{
    public interface IRepository
    {
        void AddPost(UserEntity user, string text);

        IEnumerable<PostEntity> GetAllPosts();
    }
}
