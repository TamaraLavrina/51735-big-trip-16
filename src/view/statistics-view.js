import SmartView from '../view/smart-view.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const CanvasType = {
  MONEY: 'money',
  TYPE: 'type',
  TIME: 'time-spend',
};

const makeItemsUniq = (items) => [...new Set(items)];

const getDurationTime = (ms) => {
  const days = dayjs.duration(ms).format('D');
  const hours = dayjs.duration(ms).format('HH');
  const minutes = dayjs.duration(ms).format('mm');

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};

const moneyChart = (moneyCtx, points) => {
//   //функция для отрисовки графиков по цене
  const types = points.map((point) => point.type);
  const uniqTypes = makeItemsUniq(types);
  const moneyArray =  Array.from(points.reduce((point, { type, basePrice }) => point.set(type, (point.get(type) || 0) + basePrice), new Map));
  const sortedMoney = moneyArray.sort((a, b) => b[1] - a[1]);
  const moneyForType = sortedMoney.map((it) => it[1]);
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqTypes,
      datasets: [{
        data: moneyForType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const typeChart = (typeCtx, points) => {
  //функция для отрисовки графиков по типу
  const types = points.map((point) => point.type);
  const uniqTypes = makeItemsUniq(types);
  const typeArray =  Array.from(points.reduce((point, {type}) => point.set(type, (point.get(type) || 0) + 1), new Map));
  const sortedType = typeArray.sort((a,b) => b[1] - a[1]);
  const typeQuantity = sortedType.map((it) => it[1]);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqTypes,
      datasets: [{
        data: typeQuantity,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const timeChart = (timeCtx, points) => {
  //функция для отрисовки графиков по типу
  const types = points.map((point) => point.type);
  const uniqTypes = makeItemsUniq(types);
  const timeArray =  Array.from(points.reduce((point, { type, startDate, finishDate }) => point.set(type, (point.get(type) || 0) + dayjs(finishDate).diff(dayjs(startDate))), new Map));
  const sortedTime = timeArray.sort((a, b) => b[1] - a[1]);
  const timeForType = sortedTime.map((it) => it[1]);
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqTypes,
      datasets: [{
        data: timeForType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${getDurationTime(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const createStatisticsTemplate = () => {
  const canvasTypes = Object.values(CanvasType);

  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>
  ${canvasTypes.map((id) => `<div class="statistics__item">
  <canvas class="statistics__chart" id="${id}" width="900"></canvas>
</div>`)}
</section>`;
};

export default class Statistics extends SmartView {
    #renderMoneyChart = null;
    #renderTypeChart = null;
    #renderTimeChart = null;
    _data = null;

    constructor(points) {
      super();
      this._data = points;
      this.setCharts();
    }

    get template() {
      return createStatisticsTemplate();
    }

    removeElement() {
      super.removeElement();

      if (this.#renderMoneyChart) {
        this.#renderMoneyChart.destroy();
        this.#renderMoneyChart = null;
      }
      if (this.#renderTypeChart) {
        this.#renderTypeChart.destroy();
        this.#renderTypeChart = null;
      }
      if (this.#renderTimeChart) {
        this.#renderTimeChart.destroy();
        this.#renderTimeChart = null;
      }
    }

    setCharts() {
      if (this.#renderMoneyChart !== null || this.#renderTypeChart !== null || this.#renderTimeChart !== null) {
        this.#renderMoneyChart = null;
        this.#renderTypeChart = null;
        this.#renderTimeChart = null;
      }

      const moneyCtx = this.element.querySelector('#money');
      const typeCtx = this.element.querySelector('#type');
      const timeCtx = this.element.querySelector('#time-spend');

      const BAR_HEIGHT = 55;
      moneyCtx.height = BAR_HEIGHT * 5;
      typeCtx.height = BAR_HEIGHT * 5;
      timeCtx.height = BAR_HEIGHT * 5;

      this.#renderMoneyChart = moneyChart(moneyCtx, this._data);
      this.#renderTypeChart = typeChart(typeCtx, this._data);
      this.#renderTimeChart = timeChart(timeCtx, this._data);
    }

    restoreHandlers() {
      this.setCharts();
    }
}

