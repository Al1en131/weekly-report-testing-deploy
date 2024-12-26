import axios from 'axios';


const apiDivisions = axios.create({
    baseURL: 'https://new-api-weekly-report-test-626859703852.asia-southeast2.run.app',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const getDivisions = async () => {
    try {
        const response = await apiDivisions.get('/api/v1/divisions'); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching divisions:", error);
        throw error; 
    }
};

export default apiDivisions; 
