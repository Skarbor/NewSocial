using NewSocial.Models.User;
using System;

namespace NewSocial.Entities
{
    public class Like : Entity
    {
        public UserEntity User { get; set; }
        public DateTime Date { get; set; }
    }
}
