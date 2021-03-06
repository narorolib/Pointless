/* Default chart settings */
Chart.defaults.global.elements.line.borderWidth = 0;
Chart.defaults.global.elements.point.radius = 0;
Chart.defaults.global.elements.point.borderWidth = 0;
Chart.defaults.global.elements.point.hoverBorderWidth = 0;
Chart.defaults.global.elements.point.hoverRadius = 0;

let chart_css = window.getComputedStyle(document.body);

/* Default chart options */
let chart_options = {
    animation: {
        duration: 0
    },
    hover: {
        animationDuration: 0,
    },
    responsiveAnimationDuration: 0,
    elements: {
        line: {
            tension: 0
        }
    },
    tooltips: {
        mode: 'index',
        intersect: false,
        xPadding: 14,
        yPadding: 14,
        titleFontColor: chart_css.getPropertyValue('--dark'),
        titleSpacing: 30,
        titleFontSize: 10,
        titleFontStyle: 'bold',
        titleMarginBottom: 10,
        bodyFontColor: chart_css.getPropertyValue('--gray-700'),
        bodyFontSize: 10,
        bodySpacing: 10,
        backgroundColor: chart_css.getPropertyValue('--white'),
        footerMarginTop: 10,
        footerFontStyle: 'normal',
        footerFontSize: 12,
        cornerRadius: 4,
        caretSize: 6,
    },
    title: {
        text: '',
        display: false
    },
    scales: {
        yAxes: [{
            display: false,
            gridLines: {
                display: false
            },
            ticks: {
                beginAtZero: true,
                userCallback: (value, index, values) => {
                    if (Math.floor(value) === value) {
                        return nr(value);
                    }
                },
            }
        }],
        xAxes: [{
            gridLines: {
                display: false
            },
            display: false,
            ticks: {
                maxTicksLimit:  15,
                padding: 10,
            },
        }]
    },
    responsive: true,
    maintainAspectRatio: false
};