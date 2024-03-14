import axios from 'axios';

export function tableAverageForexSpreads() {
    return {
        loaded: false,
        // broker1Data: {},
        // broker2Data: {},
        broker1Data: {
            'Commission on Forex': [{ value: 'N/A', tooltip: 'Loading...' }],
            // ... any other expected fields
        },
        broker2Data: {
            'Commission on Forex': [{ value: 'N/A', tooltip: 'Loading...' }],
            // ... any other expected fields
        },

        async initComparison(broker1, broker2) {
            try {
                const broker1Response = await axios.get(`/data/brokers/${broker1}.json`);
                this.broker1Data = broker1Response.data;
                const broker2Response = await axios.get(`/data/brokers/${broker2}.json`);
                this.broker2Data = broker2Response.data;
            } catch (error) {
                console.error('Error fetching broker data:', error);
            } finally {
                this.loaded = true;
            }

        }
    }
}
