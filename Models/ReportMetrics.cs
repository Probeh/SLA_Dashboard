using System;
using System.Collections.Generic;
using System.Linq;

namespace SLA_Report.Models {
	public class ReportMetrics {
		public Dictionary<DateTime, Dictionary<TaskStatus, List<TaskModel>>> Summarized { get; set; }
		public Dictionary<TaskStatus, int> Totals { get; set; }
		public Dictionary<string, int> Assignments { get; set; }
		public Dictionary<string, int> Resolution { get; set; }

		public ReportMetrics(List<TaskModel> tasks, ReportQuery options) {
			this.Assignments = new Dictionary<string, int>();
			this.Resolution = new Dictionary<string, int>();
			this.Summarized = new Dictionary<DateTime, Dictionary<TaskStatus, List<TaskModel>>>();
			this.Totals = new Dictionary<TaskStatus, int>();

			this
				.GetTotals(tasks)
				.GetAssignments(tasks)
				.GetResolution(tasks)
				.GetSummarized(tasks, options);
		}

		private ReportMetrics GetTotals(List<TaskModel> tasks) {
			Enum
				.GetNames(typeof(TaskStatus))
				.ToList()
				.ForEach(status => this.Totals[Enum.Parse<TaskStatus>(status)] = tasks.Where(x => x.Status == Enum.Parse<TaskStatus>(status)).Count());
			return this;
		}
		private ReportMetrics GetAssignments(List<TaskModel> tasks) {
			tasks
				.Select(task => task.Department)
				.Distinct()
				.ToList()
				.ForEach(x => this.Assignments[x] = tasks.Where(task => task.Department.Equals(x)).Count());
			return this;
		}
		private ReportMetrics GetResolution(List<TaskModel> tasks) {
			var labels = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 31 };
			labels
				.ToList()
				.ForEach(x => {
					if (x <= 10) {
						this.Resolution.Add(Convert.ToString(x) + "", tasks.Where(task => task.Status == TaskStatus.Completed ? ((DateTime) task.Completed).Subtract(task.Created).Days == x : DateTime.Now.Subtract(task.Created).Days == x).Count());
					}
					if (x > 10 && x <= 20) {
						this.Resolution.Add("10-20", tasks.Where(task => this.TimeRangeCheck(task, 10, 20)).Count());
					}
					if (x > 20 && x <= 30) {
						this.Resolution.Add("20-30", tasks.Where(task => this.TimeRangeCheck(task, 20, 30)).Count());
					}
					if (x > 30) {
						this.Resolution.Add("30+", tasks.Where(task => this.TimeRangeCheck(task, 30)).Count());
					}
				});
			return this;
		}
		private ReportMetrics GetSummarized(List<TaskModel> tasks, ReportQuery options) {
			int totalMonths = (((DateTime) options.MaxDate).Month + (((DateTime) options.MaxDate).Year * 12)) - (((DateTime) options.MinDate).Month + (((DateTime) options.MinDate).Year * 12));
			for (var month = 0; month < totalMonths; month++) {
				Dictionary<TaskStatus, List<TaskModel>> results = new Dictionary<TaskStatus, List<TaskModel>>();
				DateTime current = ((DateTime) options.MinDate).AddMonths(month);
				Enum
					.GetNames(typeof(TaskStatus))
					.ToList()
					.ForEach(status => {
						TaskStatus task_status = Enum.Parse<TaskStatus>(status);
						results.Add(task_status, tasks.Where(task => task.Status == task_status).Where(task => this.StatusTimeCheck(task, current, this.StatusTimeStamp(task_status, task))).ToList());
					});
				this.Summarized[current] = results;
			}
			return this;
		}
		private bool StatusTimeCheck(TaskModel model, DateTime compare, DateTime timeStamp) => compare.Year == timeStamp.Year && compare.Month == timeStamp.Month;
		private bool TimeRangeCheck(TaskModel task, int minVal, int maxVal = -1) =>
			task.Status == TaskStatus.Completed ?
			((DateTime) task.Completed).Subtract(task.Created).Days > minVal && (maxVal > -1 ? ((DateTime) task.Completed).Subtract(task.Created).Days <= maxVal : true) :
			DateTime.Now.Subtract(task.Created).Days > minVal && (maxVal > -1 ? DateTime.Now.Subtract(task.Created).Days <= maxVal : true);
		private DateTime StatusTimeStamp(TaskStatus status, TaskModel model) =>
			status == TaskStatus.Created   ? (DateTime) model.Created   :
			status == TaskStatus.Submitted ? (DateTime) model.Submitted :
			status == TaskStatus.Progress  ? (DateTime) model.Progress  :
			status == TaskStatus.Returned  ? (DateTime) model.Returned  :
			status == TaskStatus.Completed ? (DateTime) model.Completed :
			DateTime.MaxValue;

	}
}