using Azure.Core;
using Azure;
using System.Diagnostics;
using System;

namespace OpenAI_ChatApp.Server
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<LoggingMiddleware> _logger;

        public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            _logger.LogInformation("Request content type: {@ContentType} \n Request path: {@Path}", httpContext.Request.Headers["Accept"], httpContext.Request.Path);
            await _next(httpContext);
            _logger.LogInformation("Response type: {@ContentType} \n Response length: {@ContentLength}", httpContext.Response.ContentType, httpContext.Response.ContentLength);
        }
    }
}
