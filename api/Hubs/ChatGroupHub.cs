using System;
using System.Threading.Tasks;
using api.Enums;
using api.Models;
using Microsoft.AspNetCore.SignalR;

namespace api.Hubs
{
    public class ChatGroupHub : Hub
    {
        public async Task<bool> EnterGroup(string groupName, string userName)
        {
            try
            {
                string ConnectionId = Context.ConnectionId;
                await Groups.AddToGroupAsync(ConnectionId, groupName);
                await Clients.GroupExcept(groupName, ConnectionId).SendAsync("ReceiveMessages", new Message("Chat", $"{userName} entrou no grupo", EMessageType.Log));

                Console.WriteLine($"{userName} entrou no grupo");

                return true;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<bool> SendMessage(string groupName, string userName, string content, EMessageType type)
        {
            try
            {
                Message message = new Message(userName, content, type);
                await Clients.Group(groupName).SendAsync("ReceiveMessages", message);
                
                Console.WriteLine("Send Message " + groupName);

                return true;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public async Task<bool> LeaveGroup(string groupName, string userName)
        {
            try
            {
                string ConnectionId = Context.ConnectionId;
                await Groups.RemoveFromGroupAsync(ConnectionId, groupName);
                await Clients.GroupExcept(groupName, ConnectionId).SendAsync("ReceiveMessages", new Message("Chat", $"{userName} saiu do grupo", EMessageType.Log));

                Console.WriteLine($"{userName} saiu do grupo");

                return true;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}