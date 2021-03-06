import { mixins, Line } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        responsiveAnimationDuration: 0,
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [
            {
              type: 'linear',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Questions',
              },
              ticks: {
                suggestedMax: 100,
                beginAtZero: true,
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
                labelString: 'Score',
              },
            },
          ],
        },
        showLines: true,
        elements: {
          point: {
            radius: 0,
            hoverRadius: 0,
          },
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
    this.renderChart(this.chartData, this.options);
  },
};
