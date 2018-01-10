using NewSocial.Entities;
using NewSocial.Entities.Post;
using NewSocial.Models.User;
using System.Collections.Generic;

namespace NewSocial.Database.Abstract
{
    public interface IRepository
    {
        void AddPost(UserEntity user, string text);

        IEnumerable<PostEntity> GetAllPosts();

        void AddComment(UserEntity user, int postId, string text);

        IEnumerable<PostEntity> GetAllCommentsForPost(int postId);

        void LikePost(int postId, UserEntity user);

        bool DoesUserLikePost(int postId, UserEntity user);
    }
}
