using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Runtime.InteropServices;
using SLA_Report.Helpers;

namespace SLA_Report.Models {
  public class ReportModel {
    public IEnumerable<TaskModel> Tasks { get; set; }
    public IEnumerable<string> Departments { get; set; }
    public IEnumerable<string> StatusCodes { get; set; }
    public ReportMetrics Metrics { get; set; }
    public ReportQuery Options { get; set; }

    public ReportModel([Optional] IEnumerable<TaskModel> tasks, [Optional] ReportQuery options) {
      this.Options = options ?? new ReportQuery();
      this.Options.MinDate = this.Options.MinDate ?? new DateTime(DateTime.Now.Year - 1, DateTime.Now.Month, DateTime.Now.Day);
      this.Options.MaxDate = this.Options.MaxDate ?? DateTime.Now;

      this.Departments = tasks.OrderBy(x => x.Department).Select(x => x.Department).Distinct();
      this.StatusCodes = Enum.GetNames(typeof(TaskStatus)).Select(x => Factory.GetStatusName(Enum.Parse<TaskStatus>(x))).Distinct();
      this.Tasks = tasks ?? new Collection<TaskModel>();
      this.Metrics = new ReportMetrics(this.Tasks.ToList(), this.Options);
    }
  }
}