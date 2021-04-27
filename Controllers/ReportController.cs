using Microsoft.AspNetCore.Mvc;
using SLA_Report.Models;
using SLA_Report.Services;

namespace SLA_Report.Controllers {
  [ApiController]
  [Route("api/[controller]")]
  public class ReportController : ControllerBase {
    private readonly IReportRepository<TaskModel> _repository;
    public ReportController(IReportRepository<TaskModel> repository) => this._repository = repository;

    [HttpGet]
    public IActionResult GetFilteredData([FromQuery] ReportQuery options) {
      return Ok(new ReportModel(this._repository.GetModels(options), options));
    }
  }
}