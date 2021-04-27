using System;

namespace SLA_Report.Models {
  public class TaskModel : BaseModel<TaskModel> {
    public DateTime? Completed { get; set; }
    public DateTime? Returned { get; set; }
    public DateTime? Submitted { get; set; }
    public TaskStatus Status { get; set; }
    public int DepartmentId { get; set; }

    public TaskModel() : base() { }

    public override bool RunQuery<TQuery>(TQuery options) {
      var filters = options as ReportQuery;

      if (filters.TaskId != 0 && this.Id != filters.TaskId)
        return false;
      if (filters.DepartmentId != 0 && this.DepartmentId != filters.DepartmentId)
        return false;
      if (filters.Status != 0 && this.Status != filters.Status)
        return false;
      if (filters.MaxDate != null && this.Created > filters.MaxDate)
        return false;
      if (filters.MinDate != null && this.Created < filters.MinDate)
        return false;

      return true;
    }
  }
}