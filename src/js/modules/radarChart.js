import Chart from 'chart.js/auto'; // If using ES6 imports
import axios from 'axios';

export function radarChart() {
    return {
        async initChart(brokerId) {
            try {
                const response = await axios.get(`/data/brokers/${brokerId}.json`);
                const brokerData = response.data;
                const radarChartData = brokerData.radarChart[0];

                const ctx = document.getElementById(`${brokerId}RadarChart`).getContext('2d');
                new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['Regulations', 'Trading conditions', 'Trading platforms', 'Deposits and Withdrawals', 'Education and research'],
                        datasets: [{
                            label: `${brokerId}`,
                            data: [
                                parseFloat(radarChartData['Regulations']),
                                parseFloat(radarChartData['Trading conditions']),
                                parseFloat(radarChartData['Trading platforms']),
                                parseFloat(radarChartData['Deposits and Withdrawals']), // Note: Adjusted the key to match your JSON structure
                                parseFloat(radarChartData['Education and research'])
                            ],
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
            } catch (error) {
                console.error('Error fetching broker data:', error);
            }
        }
    }
}
