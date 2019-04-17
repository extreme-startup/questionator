import { mixins, Scatter } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Scatter,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        animation: {
          duration: 0, // general animation time
        },
        hover: {
          animationDuration: 0, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          // mode: 'x',
          // intersect: true,

          callbacks: {
            // label: function(tooltipItem, data) {
            //   var label = data.datasets[tooltipItem.datasetIndex].label || '';
            //   return label;
            // },
            // title:function(tooltipItem, data) {
            //   // debugger;
            //   return '';//data.datasets[tooltipItem[0].datasetIndex].label;
            // },
            // footer: function(tooltipItems, data) {
            //   // debugger;
            //   return 'wtf'
            // }
          },
          // mode: 'index',
          // footerFontStyle: 'normal'
        },
        scales: {
          xAxes: [
            {
              type: 'linear',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
              ticks: {
                max: Number(new Date()) + 1800000,
                min: Number(new Date()),
                // max: Number(new Date()) + 3600000,
                // major: {
                //   fontStyle: 'bold',
                //   // fontColor: '#FF0000'
                // },
              },
            },
          ],
          yAxes: [
            {
              type: 'linear',
              ticks: {
                suggestedMax: 500,
                suggestedMin: 500,
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'score',
              },
            },
          ],
        },
        showLines: true,
        elements: {
          point: { radius: 0 },
          line: {
            tension: 0,
            fill: false,
            show: true,
          },
        },
        legend: {
          display: false,
        },
      },
    };
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    // debugger;
    this.renderChart(this.chartData, this.options);
  },
};
