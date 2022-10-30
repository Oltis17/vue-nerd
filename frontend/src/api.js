import axios from 'axios';

// set authorization header for all requests
axios.defaults.headers.common['Authorization'] = 'ZDmTSrHXUI';

export async function getResults() {
    const response = await axios.get('/api/search/ip/');
    return response.data;
}

export async function filterResults(filter) {
    const response = await axios.get('/api/search/ip/',
    { params: { filter } },
    );
    return response.data;
}