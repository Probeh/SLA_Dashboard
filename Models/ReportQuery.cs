using System.ComponentModel.DataAnnotations;

namespace SLA_Report.Models {
  public class ReportQuery : BaseQuery {

    [EnumDataType(typeof(TaskStatus))]
    public TaskStatus? Status { get; set; }
    public string Department { get; set; }
    public int TaskId { get; set; }
  }
}