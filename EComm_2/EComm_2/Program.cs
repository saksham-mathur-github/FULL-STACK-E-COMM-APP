using System.Text;
using EComm_2;
using EComm_2.Data_Context;
using EComm_2.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


// Configure database connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("crudconnection")));

// Add missing service registrations
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<OrderService>();


// Configure JWT authentication
ConfigureJwtAuthentication(builder.Services, builder.Configuration);

// Configure CORS (adjust origins as needed)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:57966") // Ensure this matches your Angular app's origin
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Use CORS policy
app.UseCors("AllowMyOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

void ConfigureJwtAuthentication(IServiceCollection services, IConfiguration configuration)
{
    var jwtOptions = configuration.GetSection("Jwt").Get<JwtOptions>();
    var key = Encoding.ASCII.GetBytes(jwtOptions.Key);

    services.AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(o =>
    {
        o.RequireHttpsMetadata = false; // Set to true in production
        o.SaveToken = true;
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Issuer
        };
    });
}
