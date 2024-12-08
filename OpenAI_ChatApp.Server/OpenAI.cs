namespace OpenAI_ChatApp.Server
{
    public class OpenAI
    {
        public string OpenAi_Key {  get; set; }
        public string OpenAi_Model { get; set; }
        public string OpenAi_Endpoint { get; set; }

        public OpenAI(IConfiguration config, ILogger<OpenAI> logger)
        {
            OpenAi_Endpoint = config["OpenAI:OpenAi_Endpoint"];
            OpenAi_Model = config["OpenAI:OpenAi_Model"];
            OpenAi_Key = config["OpenAIKey"]; // Will be in User secrets for dev env. Will be in keyvault for Prod
        }
    }
}
