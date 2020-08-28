using System;
using api.Enums;

namespace api.Models
{
    public class Message
    {
        public string UserName { get; set; }
        public string Content { get; set; }
        public EMessageType Type { get; set; }
        public DateTime CreatedAt { get; set; }

        public Message(string userName, string content, EMessageType type)
        {
            UserName = userName;
            Content = content;
            Type = type;
            CreatedAt = DateTime.Now;
        }
    }
}