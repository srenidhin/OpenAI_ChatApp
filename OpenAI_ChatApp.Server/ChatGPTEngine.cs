using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace OpenAI_ChatApp.Server
{
    public class ChatGPTEngine
    {
        private readonly OpenAI _openAI;
        private HttpClient _httpClient {  get; set; }
        
        public ChatGPTEngine(OpenAI openAI)
        {
            _openAI = openAI;

            _httpClient = new HttpClient();
        }

        internal async Task<string> processUserRequest(List<Message> msgs)
        {
            var val = new AuthenticationHeaderValue("Bearer", _openAI.OpenAi_Key);
            _httpClient.DefaultRequestHeaders.Authorization = val;
            var openAIprompt = new
            {
                model = _openAI.OpenAi_Model,
                messages = msgs,
                temperature = 0.5,
                max_tokens = 1500,
                top_p = 1,
                frequency_penalty = 0,
                presence_penalty = 0
            };

            var content = new StringContent(JsonSerializer.Serialize(openAIprompt), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(_openAI.OpenAi_Endpoint, content);
            var jsonContent = await response.Content.ReadAsStringAsync();
            var choices = JsonDocument.Parse(jsonContent).RootElement.GetProperty("choices")[0].GetProperty("message").GetRawText();
            var result = JsonDocument.Parse(Regex.Replace(choices, @"[\[\]]", string.Empty)).RootElement;
            return result.GetProperty("content").GetString() ?? "" ;
        }
    }
}
