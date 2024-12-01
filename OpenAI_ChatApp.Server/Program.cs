using Azure.Identity;
using System.Diagnostics;


namespace OpenAI_ChatApp.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

            app.Run();
        }
    }
}
