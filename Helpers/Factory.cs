using System;
using System.Collections.Generic;
using SLA_Report.Models;

namespace SLA_Report.Helpers {
  public static class Factory {
    private static DateTime RandomDate() => DateTime.Now.Subtract(new TimeSpan(new Random().Next(1, 35), 0, 0, 0));
    public static List<TaskModel> GenerateTasks(int minCount = 150, int maxCount = 300) {
      var results = new List<TaskModel>();
      for (var i = 0; i < new Random().Next(minCount, maxCount); i++) {
        var instance = new TaskModel();
        instance.Created = RandomDate();
        instance.Department = Convert.ToString(new Random().Next(1, 6));
        instance.Id = new Random().Next(100, 999);
        instance.Status = (TaskStatus) new Random().Next(0, 6);
        instance.StatusName = GetStatusName((TaskStatus) instance.Status);
        instance.IsActive = (bool) (instance.Status != TaskStatus.Completed);

        switch ((TaskStatus) instance.Status) {
          case TaskStatus.Submitted:
            instance.Submitted = RandomDate();
            break;
          case TaskStatus.Progress:
            instance.Progress = RandomDate();
            instance.Submitted = RandomDate();
            break;
          case TaskStatus.Updated:
            instance.Progress = RandomDate();
            instance.Submitted = RandomDate();
            instance.Updated = RandomDate();
            break;
          case TaskStatus.Returned:
            instance.Progress = RandomDate();
            instance.Returned = RandomDate();
            instance.Submitted = RandomDate();
            instance.Updated = RandomDate();
            break;
          case TaskStatus.Completed:
            instance.Submitted = RandomDate();
            instance.Progress = RandomDate();
            instance.Updated = RandomDate();
            instance.Completed = RandomDate();
            break;
        }
        results.Add(instance);
      }
      return results;
    }
    public static string GetStatusName(TaskStatus status) {
      switch (status) {
        case TaskStatus.Created:
          return StatusNames.Created;
        case TaskStatus.Submitted:
          return StatusNames.Submitted;
        case TaskStatus.Progress:
          return StatusNames.Progress;
        case TaskStatus.Updated:
          return StatusNames.Updated;
        case TaskStatus.Returned:
          return StatusNames.Returned;
        case TaskStatus.Completed:
          return StatusNames.Completed;
      }
      return string.Empty;
    }
  }
}