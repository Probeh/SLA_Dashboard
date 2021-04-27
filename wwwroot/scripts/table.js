let columns = [];

$('#table-toggle').click((event) => toggleDataTable(event));

toggleDataTable = (event) => {
  const element = document.getElementById('data-table');
  if (element.classList.contains('show')) {
    element.classList.replace('show', 'hide');
  }
  else if (element.classList.contains('hide')) {
    element.classList.replace('hide', 'show');
  }
  else element.classList.add('hide');
}

updateTable = (items) => {
  columns = items.tasks.map(x => Object.keys(x))[0];
  const thead = document.querySelector('thead');
  const tbody = document.querySelector('tbody');
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: 'numeric', /* hour: '2-digit', minute: '2-digit' */ };

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
  for (let index = 0; index < items.tasks.length; index++) {
    const current = items.tasks[index];
    const datarow = `
    <tr>
      <td>${index + 1}</td>
      <td>${current.id}</td>
      <td>${current.departmentId}</td>
      <td>${TaskStatus[current.status]}</td>
      <td>${current.created ? new Date(current.created).toLocaleString('he', options) : '---'}</td>
      <td>${current.submitted ? new Date(current.submitted).toLocaleString('he', options) : '---'}</td>
      <td>${current.updated ? new Date(current.updated).toLocaleString('he', options) : '---'}</td>
      <td>${current.returned ? new Date(current.returned).toLocaleString('he', options) : '---'}</td>
      <td>${current.completed ? new Date(current.completed).toLocaleString('he', options) : '---'}</td>
    </tr>`;
    tbody.innerHTML += datarow;
  }
}