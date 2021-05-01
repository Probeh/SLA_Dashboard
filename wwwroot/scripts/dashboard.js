let barChartItem = new Chart($('#barChart'), { type: 'bar', options: { plugins: { tooltip: { rtl: true }, legend: { textDirection: 'rtl', align: 'start', position: 'right', display: false } } }, });
let pieChartItem = new Chart($('#pieChart'), { type: 'pie', options: { plugins: { tooltip: { rtl: true }, legend: { textDirection: 'rtl', align: 'start', position: 'right' } } } });
let polarChartItem = new Chart($('#polarChart'), { type: 'polarArea', options: { plugins: { tooltip: { rtl: true }, legend: { textDirection: 'rtl', align: 'start', position: 'right' } } } });

function updateCharts(report) {
  barChartItem.data = getBarChartData(report);
  pieChartItem.data = getPieChartData(report);
  polarChartItem.data = getPolarChartData(report);

  barChartItem.update();
  pieChartItem.update();
  polarChartItem.update();
}
function getPieChartData(report) {
  const departments = {};
  report.tasks.map(x => x.department)
    .sort((x, y) => x - y)
    .forEach(index => {
      if (!departments[index])
        departments[index] = report.tasks.slice().filter(item => item.department == index).length;
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
  const keys = Object.keys(report.metrics.resolution).reverse().map(key => key + ' ימים');
  const vals = Object.keys(report.metrics.resolution).reverse().map(key => report.metrics.resolution[key]);

  return {
    labels: keys,
    datasets: [{
      data: vals,
      backgroundColor: colorStyle.cyan.back,
      borderColor: colorStyle.cyan.line,
      borderWidth: 1,
      hoverOffset: 4
    }]
  }
}