using NewSocial.Models.User;

namespace NewSocial.Database.Abstract
{
    public interface IRepository
    {
        void AddPost(UserEntity user, string text);
    }
}
