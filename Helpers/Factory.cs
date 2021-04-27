using System;
using System.Collections.Generic;
using SLA_Report.Models;

namespace SLA_Report.Helpers {
  public static class Factory {
    private static DateTime RandomDate() => new DateTime(2021, DateTime.Now.Month, new Random().Next(1, DateTime.Now.Day));
    public static List<TaskModel> GenerateTasks(int minCount = 150, int maxCount = 300) {
      var results = new List<TaskModel>();
      for (var i = 0; i < new Random().Next(minCount, maxCount); i++) {
        var instance = new TaskModel();
        instance.Created = RandomDate();
        instance.DepartmentId = new Random().Next(1, 6);
        instance.Id = new Random().Next(100, 999);
        instance.IsActive = (bool) (new Random().Next(0, 2) == 1);
        instance.Status = (TaskStatus) new Random().Next(0, 5);

        switch (instance.Status) {
          case TaskStatus.Progress:
            instance.Progress = RandomDate();
            break;
          case TaskStatus.Updated:
            instance.Progress = RandomDate();
            instance.Updated = RandomDate();
            break;
          case TaskStatus.Returned:
            instance.Progress = RandomDate();
            instance.Updated = RandomDate();
            instance.Returned = RandomDate();
            break;
          case TaskStatus.Completed:
            instance.Progress = RandomDate();
            instance.Updated = RandomDate();
            instance.Completed = RandomDate();
            break;
        }
        results.Add(instance);
      }
      return results;
    }
  }
}