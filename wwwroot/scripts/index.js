let reportResult = new ReportModel();
let filterResult = new ReportModel();
const endpoint = 'api/Report';
const background = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'];
const borderLine = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)']
const colorStyle = {
  pink: {
    back: background[0],
    line: borderLine[0]
  },
  blue: {
    back: background[1],
    line: borderLine[1]
  },
  yellow: {
    back: background[2],
    line: borderLine[2]
  },
  cyan: {
    back: background[3],
    line: borderLine[3]
  },
  purple: {
    back: background[4],
    line: borderLine[4]
  },
  orange: {
    back: background[5],
    line: borderLine[5]
  }
}
var fields = {
  ['departmentId']: $('#form-dept'),
  ['maxDate']: $('#form-maxDate'),
  ['minDate']: $('#form-minDate'),
  ['status']: $('#form-status'),
  ['taskId']: $('#form-taskId'),
}

isValid = (key) => fields[key].val() && fields[key].val() != 0;

getParams = () => Object.keys(fields)
  .some(key => isValid(key)) ?
  '?' + Object
    .keys(fields)
    .filter(key => isValid(key))
    .map(x => `${x}=${fields[x].val()}`)
    .join('&')
  : '';

initData = () => fetch(endpoint).then(async (report) => {
  const result = await report.json();
  reportResult = result;
  updateCharts(result);
  updateTable(result);

  const counter = {
    completed: {
      val: result.tasks.slice().filter(x => x.status == 4).length,
      ref: $('#alert-completed-value'),
    },
    created: {
      val: result.tasks.length,
      ref: $('#alert-created-value'),
    },
    progress: {
      val: result.tasks.slice().filter(x => x.status == 1).length + result.tasks.slice().filter(x => x.status == 2).length,
      ref: $('#alert-progress-value'),
    },
    returned: {
      val: result.tasks.slice().filter(x => x.status == 3).length,
      ref: $('#alert-returned-value'),
    },
  }

  Object.keys(counter).forEach(key => {
    for (let index = 0; index <= counter[key]['val']; index++) {
      setTimeout(() => {
        counter[key]['ref'].text(index);
      }, index == 0 ? 1 : 5 * (index + 1));
    }
  })
});

fetchData = () =>
  fetch(endpoint + getParams())
    .then(async (report) => {
      const result = await report.json();
      updateCharts(result);
      updateTable(result);
    });

$('form').submit((event) => {
  event.preventDefault();
  fetchData();
});

initData();