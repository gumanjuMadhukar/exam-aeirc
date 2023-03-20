import { Chart } from 'chart.js';

export const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'bottom'
  },
  center: ['50%', '50%'],
  cutout: 60,
  layout: {
    padding: {
      left: 50,
      right: 0,
      top: 0,
      bottom: 0
    }
  },
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest'
  },
  animation: {
    animateScale: true,
    animateRotate: true
  },
  elements: {
    arc: {
      borderWidth: 1,
      borderColor: '#FF0000'
    }
  },
  height: 500,
  width: 500
};

export const plugins = (availableDays: number) => [
  {
    beforeDraw: function (chart: Chart) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + 'em sans-serif';
      ctx.textBaseline = 'top';
      var text = availableDays + ' Available',
        textX = Math.round(width / 2 - 15),
        // textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  }
];

export const dataSetData = (total: number, taken: number) => ({
  datasets: [
    {
      backgroundColor: ['#1890FF', '#E6F7FF'],
      data: [(100 / total) * taken, (100 / total) * (total - taken)],
      borderWidth: 1,
      borderColor: '#E6F7FF'
    }
  ]
});