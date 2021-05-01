var tableView = 'standard';
var reportData = {};
$('#table-standard').click(() => {
  document.getElementById('table-detailed').classList.remove('active');
  document.getElementById('table-standard').classList.add('active');
});
$('#table-detailed').click(() => {
  document.getElementById('table-standard').classList.remove('active');
  document.getElementById('table-detailed').classList.add('active');
});
getDate = (date) => {
  const date_options = { year: 'numeric', month: '2-digit', day: '2-digit', /* hour: '2-digit', minute: '2-digit' */ };
  const weekday = new Date(date).toLocaleString('he', { weekday: 'long' });
  return new Date(date).toLocaleString('he', date_options) + ', ' + weekday;
}
updateTable = (report) => {
  reportData = report;
  if (tableView == 'detailed') updateDetailedTable(report.metrics.summarized);
  else if (tableView == 'standard') updateStandardTable(report.tasks);
}

updateStandardTable = (items) => {
  const thead = document.querySelector('thead');
  const tbody = document.querySelector('tbody');
  thead.innerHTML = `
  <tr>
    <th>#</th>
    <th>מזהה</th>
    <th>חטיבה</th>
    <th>סטטוס</th>
    <th>תאריך יצירה</th>
    <th>תאריך הגשה</th>
    <th>תאריך עדכון</th>
    <th>תאריך החזרה</th>
    <th>תאריך סיום</th>
  </tr>`;

  tbody.innerHTML = '';
  for (let index = 0; index < items.length; index++) {
    const current = items[index];
    const datarow = `
    <tr>
      <td>${index + 1}</td>
      <td>${current.id}</td>
      <td>${current.department}</td>
      <td>${TaskStatus[current.status]}</td>
      <td>${current.created ? getDate(current.created) : '---'}</td>
      <td>${current.progress ? getDate(current.progress) : '---'}</td>
      <td>${current.updated ? getDate(current.updated) : '---'}</td>
      <td>${current.returned ? getDate(current.returned) : '---'}</td>
      <td>${current.completed ? getDate(current.completed) : '---'}</td>
    </tr>`;
    tbody.innerHTML += datarow;
  }
}
updateDetailedTable = (items) => {

}