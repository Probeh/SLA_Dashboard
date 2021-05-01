using System.Collections.Generic;
using System.Linq;
using SLA_Report.Helpers;
using SLA_Report.Models;

namespace SLA_Report.Services {
  public interface IReportRepository<TSource> where TSource : BaseModel<TSource>, new() {
    IEnumerable<TSource> GetModels();
    IEnumerable<TSource> GetModels<TQuery>(TQuery options) where TQuery : BaseQuery;
  }
  public class ReportRepository<TSource> : IReportRepository<TSource> where TSource : BaseModel<TSource>, new() {
    public ReportRepository() { }
    public IEnumerable<TSource> GetModels() => Factory.GenerateTasks() as IEnumerable<TSource>;
    public IEnumerable<TSource> GetModels<TQuery>(TQuery options) where TQuery : BaseQuery =>
      this.GetModels();
      //.Where(x => x.RunQuery<TQuery>(options))
      //.OrderByDescending(x => x.Created);
  }
}