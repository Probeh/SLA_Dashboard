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
  const getDate = (date) => {
    const date_options = { year: 'numeric', month: '2-digit', day: '2-digit', /* hour: '2-digit', minute: '2-digit' */ };
    const weekday = new Date(date).toLocaleString('he', { weekday: 'long' });
    const date_string = new Date(date).toLocaleString('he', date_options);
    return `${date_string}, ${weekday}`;
  }
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
      <td>${current.created ? getDate(current.created) : '---'}</td>
      <td>${current.progress ? getDate(current.progress) : '---'}</td>
      <td>${current.updated ? getDate(current.updated) : '---'}</td>
      <td>${current.returned ? getDate(current.returned) : '---'}</td>
      <td>${current.completed ? getDate(current.completed) : '---'}</td>
    </tr>`;
    tbody.innerHTML += datarow;
  }
}