using NewSocial.Models.User;
using System;

namespace NewSocial.Entities.Post
{
    public class PostEntity
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public UserEntity User { get; set; }
        public DateTime Date { get; set; }
    }
}
