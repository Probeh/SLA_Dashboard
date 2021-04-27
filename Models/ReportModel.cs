using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Runtime.InteropServices;

namespace SLA_Report.Models {
  public class ReportModel {
    public IEnumerable<TaskModel> Tasks { get; set; }
    public ReportQuery Options { get; set; }
    public decimal Score { get; set; }

    public ReportModel([Optional] IEnumerable<TaskModel> tasks, [Optional] ReportQuery options) {
      this.Options = options;
      this.Tasks = tasks ?? new Collection<TaskModel>();
      this.Score = -1;
    }
  }
}