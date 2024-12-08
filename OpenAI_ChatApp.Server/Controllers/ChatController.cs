using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace OpenAI_ChatApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private ChatEngine chatGPTEngine;
        private ChatEngine2 chatGPTEngine2;
        private readonly ILogger<ChatController> _logger;

        public ChatController(OpenAI openAI, ILogger<ChatController> logger)
        { 
            _logger = logger;
            chatGPTEngine = new ChatEngine(openAI);
        }

        [HttpPost(Name = "talkWithHTTP")]
        public async Task<string> Chat(List<Message> messages)
        {
            return await chatGPTEngine.processUserRequest(messages);
        }

        [HttpPost(Name = "talkWithPackage")]
        public string Chat2(List<Message> messages)
        {
            return "Hi";
        }
    }
}
