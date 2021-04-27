using System;
using System.ComponentModel.DataAnnotations;

namespace SLA_Report.Models {
  public class BaseQuery {
    [DataType(DataType.DateTime)]
    public DateTime? MaxDate { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime? MinDate { get; set; }
  }
}