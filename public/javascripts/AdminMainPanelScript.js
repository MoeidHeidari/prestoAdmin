$(document).ready(function () {

    var areaChartCanvas = $('#areaChart').get(0).getContext('2d')
    $.ajax("/users/visitNumbersByDate", {
        type: "GET",
        statusCode: {
            200: function (response) {


            },
            401: function (response) {


            },
            400: function (response) {


            },
            404: function (response) {


            },
            402: function (response) {


            }
        }, success: function (data) {

            var VisitDataByMonthDesktop = new Array(12);
            var VisitDataByMonthMobile = new Array(12);
            var VisitDataByBrowsers = new Array(5);
            VisitDataByBrowsers[0] = 0;
            VisitDataByBrowsers[1] = 0;
            VisitDataByBrowsers[2] = 0;
            VisitDataByBrowsers[3] = 0;
            VisitDataByBrowsers[4] = 0;

            for (i = 0; i < data.length; i++) {

                VisitDataByMonthDesktop[i] = data[i].platform.Desktop;
                VisitDataByMonthMobile[i] = data[i].platform.Mobile;
                VisitDataByBrowsers[0] += data[i].browsers.chrome;
                VisitDataByBrowsers[1] += data[i].browsers.IE;
                VisitDataByBrowsers[2] += data[i].browsers.Firefox;
                VisitDataByBrowsers[3] += data[i].browsers.Safari;
                VisitDataByBrowsers[4] += data[i].browsers.Edge;


            }
            // Get context with jQuery - using jQuery's .get() method.
            var areaChartCanvas = $('#areaChart').get(0).getContext('2d')


            var areaChartData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Desktop users',
                        backgroundColor: 'rgba(60,141,188,0.9)',
                        borderColor: 'rgba(60,141,188,0.8)',
                        pointRadius: true,
                        pointColor: '#3b8bba',
                        pointStrokeColor: 'rgba(60,141,188,1)',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(60,141,188,1)',
                        data: VisitDataByMonthDesktop
                    },
                    {
                        label: 'Mobile users',
                        backgroundColor: 'rgba(210, 214, 222, 1)',
                        borderColor: 'rgba(210, 214, 222, 1)',
                        pointRadius: false,
                        pointColor: 'rgba(210, 214, 222, 1)',
                        pointStrokeColor: '#c1c7d1',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: VisitDataByMonthMobile
                    }

                ]
            }

            var areaChartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: true,
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                        }
                    }]
                }
            }

            // This will get the first returned node in the jQuery collection.
            var areaChart = new Chart(areaChartCanvas, {
                type: 'line',
                data: areaChartData,
                options: areaChartOptions
            })

//----------------------------------------------------------------------------------------------------------------------------------------

            //-------------
            //- DONUT CHART -
            //-------------
            // Get context with jQuery - using jQuery's .get() method.
            var donutChartCanvas = $('#donutChart').get(0).getContext('2d')


            var donutData = {
                labels: [
                    'Chrome',
                    'IE',
                    'FireFox',
                    'Safari',
                    'Edge',

                ],
                datasets: [
                    {
                        data: [VisitDataByBrowsers[0], VisitDataByBrowsers[1], VisitDataByBrowsers[2], VisitDataByBrowsers[3], VisitDataByBrowsers[4]],
                        backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc'],
                    }
                ]
            }
            var donutOptions = {
                maintainAspectRatio: false,
                responsive: true,
            }
            //Create pie or douhnut chart
            // You can switch between pie and douhnut using the method below.
            var donutChart = new Chart(donutChartCanvas, {
                type: 'doughnut',
                data: donutData,
                options: donutOptions
            })
        },
        complete: function () {


        }
    });
});






