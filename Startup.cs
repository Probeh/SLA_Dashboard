using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SLA_Report.Services;

namespace SLA_Report {
  public class Startup {
    public IConfiguration Configuration { get; }
    public Startup(IConfiguration configuration) => Configuration = configuration;

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services) => services
      .AddScoped(typeof(IReportRepository<>), typeof(ReportRepository<>))
      .AddControllers();
    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
      if (env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
      }

      app
        .UseHttpsRedirection()
        .UseRouting()
        .UseStaticFiles()
        .UseEndpoints(endpoints => endpoints.MapControllers());
    }
  }
}