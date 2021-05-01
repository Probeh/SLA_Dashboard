using System;

namespace SLA_Report.Models {
  public abstract class BaseModel {
    public int Id { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public bool IsActive { get; set; }
    public string Name { get; set; }
    protected BaseModel() { }
  }
  public abstract class BaseModel<TSource> : BaseModel where TSource : BaseModel<TSource> {
    protected BaseModel() : base() { }
    public abstract bool RunQuery<TQuery>(TQuery options) where TQuery : BaseQuery;
  }
}