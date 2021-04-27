let barChartItem = new Chart($('#barChart'), { type: 'bar', options: { plugins: { tooltip: { rtl: true }, legend: { textDirection: 'rtl', align: 'start', position: 'right', display: false } } }, });
let pieChartItem = new Chart($('#pieChart'), { type: 'pie', options: { plugins: { tooltip: { rtl: true }, legend: { textDirection: 'rtl', align: 'start', position: 'right' } } } });
let polarChartItem = new Chart($('#polarChart'), { type: 'polarArea', options: { plugins: { tooltip: { rtl: true }, legend: { textDirection: 'rtl', align: 'start', position: 'right' } } } });

function updateCharts(report) {
  barChartItem.data = getBarChartData(report);
  pieChartItem.data = getPieChartData(report);
  polarChartItem.data = getPolarChartData(report);
  // lineChartItem.data = getLineChartData(report);

  barChartItem.update();
  pieChartItem.update();
  polarChartItem.update();
  // lineChartItem.update();
}
function getPieChartData(report) {
  const departments = {};
  report.tasks.map(x => x.departmentId)
    .sort((x, y) => x - y)
    .forEach(index => {
      if (!departments[index])
        departments[index] = report.tasks.slice().filter(item => item.departmentId == index).length;
    });
  return {
    labels: Object.keys(departments).map(index => `(${departments[index]}) ${'חטיבה ' + index}`),
    datasets: [{
      data: Object.keys(departments).map(index => departments[index]),
      backgroundColor: background,
      borderColor: borderLine,
      borderWidth: 1,
      hoverOffset: 4
    }]
  }
}
function getPolarChartData(report) {
  const statuscodes = {};
  report.tasks.map(x => x.status)
    .sort((x, y) => x - y)
    .forEach(index => {
      if (!statuscodes[index])
        statuscodes[index] = report.tasks.slice().filter(item => item.status == index).length;
    });

  return {
    labels: Object.keys(statuscodes).map(index => `(${statuscodes[index]}) ${TaskStatus[index]}`),
    datasets: [{
      data: Object.keys(statuscodes).map(index => statuscodes[index]),
      backgroundColor: background,
      borderColor: borderLine,
      borderWidth: 1,
      hoverOffset: 4
    }]
  }
}
function getBarChartData(report) {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 31].reverse();

  return {
    labels: keys.map(x => {
      if (x <= 10) return `${x} ימים`;
      if (x == 20) return `10-20 ימים`;
      if (x == 30) return `20-30 ימים`;
      if (x > 30) return `מעל 30 ימים`;
    }),
    datasets: [{
      data: keys.map(key => report.tasks.slice().filter(task => {
        const difference = () => Math.floor((new Date() - new Date(task.created)) / 86400000);
        if (key == 31 /*  30+  */ ) return difference() > 30;
        if (key == 30 /* 21-30 */ ) return difference() > 20 && difference() <= 30;
        if (key == 20 /* 11-20 */ ) return difference() > 10 && difference() <= 20;
        /* else => key == 1 - 10 */
        return difference() == key;
      }).length),
      backgroundColor: background,
      borderColor: borderLine,
      borderWidth: 1,
      hoverOffset: 4
    }]
  }
}
function getLineChartData(report) {
  const options = { year: 'numeric', month: 'long' };
  const values = {};
  report?.tasks?.forEach(task => {
    const key = new Date(task.created).toLocaleString('he', options);
    if (!values[key]) values[key] = new Array();
    values[key].push(task);
  });
  const keys = Object.keys(values).slice().sort((x, y) => new Date(y) - new Date(x));
  return {
    labels: keys,
    datasets: Object.keys(TaskStatus)
      .map(index => {
        return {
          label: TaskStatus[index],
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          backgroundColor: [background[index]],
          borderColor: [borderLine[index]],
          borderWidth: 1,
          hoverOffset: 4
        }
      })
  }
}