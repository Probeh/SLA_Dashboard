using System;

namespace SLA_Report.Extensions {
  public static partial class Extensions {
    public static int GetIndex<T>(this T value) where T : struct, Enum => (int) (IConvertible) value;
    public static string GetName<T>(this T value) where T : struct, Enum => Enum.GetName<T>(value);
  }
}