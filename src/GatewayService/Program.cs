using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.Authority = builder.Configuration["IdentityServiceUrl"];
        o.RequireHttpsMetadata = false;//because we are in http right now
        o.TokenValidationParameters.ValidateAudience = false;
        o.TokenValidationParameters.NameClaimType = "username";
    });

var app = builder.Build();

app.MapReverseProxy();

app.UseAuthentication();

app.UseAuthorization();

app.Run();
