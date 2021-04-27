using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;

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
    protected BaseModel([Optional] TSource model) : base() => this.Update(model);
    protected TSource Update(TSource source) {
      if (source is not null) {
        source.GetType().GetProperties().ToList().ForEach(prop => {
          if ((bool) prop?.CanRead && prop?.GetValue(prop) is not null) {
            var oldValue = this.GetType().GetProperty(prop.Name).GetValue(this);
            if (this.GetType().GetProperty(prop.Name).CanWrite) {
              this.GetType().GetProperty(prop.Name).SetValue(this, oldValue ?? prop.GetValue(source));
            }
          }
        });
      }
      return this as TSource;
    }
    public abstract bool RunQuery<TQuery>(TQuery options) where TQuery : BaseQuery;
  }
}