using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using NewSocial.Database.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NewSocial.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using NewSocial.Database.Abstract;
using NewSocial.Database.Concrete;

namespace NewSocial.BasicApi
{
    public class Startup
    {
        private readonly IHostingEnvironment _environment;
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            _environment = environment;
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<UserEntity, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddTransient<IRepository, Repository>();

            ConfigureCookies(services);

            services.AddMvc(opt =>
            {
                if (_environment.IsDevelopment())
                {
                    opt.SslPort = 44354;
                }
                opt.Filters.Add(new RequireHttpsAttribute());
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseAuthentication();
            app.UseMvc();
        }

        private static void ConfigureCookies(IServiceCollection services)
        {
            services.ConfigureApplicationCookie(options =>
            {
                options.Events =
                    new CookieAuthenticationEvents
                    {
                        OnRedirectToLogin = ctx =>
                        {
                            // If we were redirect to login from api..
                            if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                            {
                                ctx.Response.StatusCode = 401;
                                return Task.FromResult<object>(null);
                            }

                            ctx.Response.Redirect(ctx.RedirectUri);
                            return Task.FromResult<object>(null);
                        },
                        OnRedirectToAccessDenied = ctx =>
                        {
                            // If access is denied from api...
                            if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                            {
                                ctx.Response.StatusCode = 403;
                                return Task.FromResult<object>(null);
                            }

                            ctx.Response.Redirect(ctx.RedirectUri);
                            return Task.FromResult<object>(null);
                        }
                    };
            });
        }
    }
}
