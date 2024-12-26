import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://new-api-weekly-report-test-626859703852.asia-southeast2.run.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
