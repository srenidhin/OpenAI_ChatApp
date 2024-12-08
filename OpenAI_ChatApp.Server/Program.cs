using Azure.Identity;
using System.Diagnostics;
using Serilog;


namespace OpenAI_ChatApp.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.WithEnvironmentName()
                .MinimumLevel.Verbose()
                .WriteTo.Console()
                .CreateLogger();

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSerilog();

            builder.Services.AddControllers();
            
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            if (!Debugger.IsAttached)
            {
                builder.Configuration.AddAzureKeyVault(new System.Uri("KeyVault Endpoint goes here"), new DefaultAzureCredential()); //When hosted in App Service, uses Managed Identity to maximize security
            }

            builder.Services.AddSingleton<OpenAI>(); //Inject using DI

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.UseMiddleware<LoggingMiddleware>();

            app.Run();
        }
    }
}
