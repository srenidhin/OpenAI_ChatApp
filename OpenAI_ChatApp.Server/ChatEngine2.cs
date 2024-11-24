using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;

namespace OpenAI_ChatApp.Server
{
    public class ChatEngine2
    {
        private Kernel _kernel;
        private IChatCompletionService _chatCompletionService;

        public ChatEngine2(OpenAI openAI)
        {
            var builder = Kernel.CreateBuilder();
            builder.AddAzureOpenAIChatCompletion(openAI.OpenAi_Model, openAI.OpenAi_Endpoint, openAI.OpenAi_Key);
            builder.Services.AddLogging(services => services.AddConsole().SetMinimumLevel(LogLevel.Trace));
            _kernel = builder.Build();

            _chatCompletionService = _kernel.Services.GetRequiredService<IChatCompletionService>();
        }

        public async Task<string> ProcessUserRequest(ChatHistory chat)
        {
            PromptExecutionSettings promptExecutionSettings = new PromptExecutionSettings() { FunctionChoiceBehavior = FunctionChoiceBehavior.Auto(autoInvoke:false)};
            var result = await _chatCompletionService.GetChatMessageContentAsync(chat, promptExecutionSettings, _kernel);
            return result.Content;
        }

    }
}
