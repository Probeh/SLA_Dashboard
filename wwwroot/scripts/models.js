class BaseModel {
  created = undefined;
  id = 0;
  isActive = true;
  name = "";
  updated = undefined;
  constructor(args = undefined) {
    args ? Object.assign(this, args) : {};
  }
}
class ReportModel extends BaseModel {
  options = new ReportQuery();
  score = 0;
  tasks = [];
  constructor(args = undefined) {
    super(args);
    this.options = args?.options ?? new ReportQuery();
    this.tasks = args?.tasks ?? new Array();
  }
}
class TaskModel extends BaseModel {
  completed = undefined;
  department = 0;
  lastUpdate = undefined;
  status = 0;
  returned = undefined;
  submitted = undefined;
  constructor(args = undefined) {
    super(args);
  }
}
class ReportQuery {
  departmentId = 0;
  maxDate = undefined;
  minDate = undefined;
  status = 0;
  taskId = 0;
  constructor(args = undefined) { }
}
const TaskStatus = {
  [0]: 'נוצר',
  [1]: 'בטיפול',
  [2]: 'עודכן',
  [3]: 'הוחזר',
  [4]: 'הסתיים'
}