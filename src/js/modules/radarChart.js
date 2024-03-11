import Chart from 'chart.js/auto'; // If using ES6 imports

export function radarChart() {
    return {
        initChart(brokerId) {
            const ctx = document.getElementById(`${brokerId}RadarChart`).getContext('2d');
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Regulations', 'Trading conditions', 'Trading platforms', 'Deposit and Withdrawal', 'Education and research'],
                    datasets: [{
                        label: `${brokerId} Dataset`,
                        data: [20, 10, 4, 2, 8],
                        fill: true,
                        backgroundColor: '#ebfbf8',
                        borderColor: '#32dbbd',
                        pointBackgroundColor: '#32dbbd',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#32dbbd'
                    }]
                },
                options: {
                    elements: {
                        line: {
                            borderWidth: 3
                        }
                    }
                },
            });
        }
    }
}
