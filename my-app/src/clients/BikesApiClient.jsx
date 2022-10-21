import axios from 'axios';

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const BikesApiClient = {
  getBikesData: async () => {
    const { data } = await axios.get('/dublinbikes-api/last_snapshot/', {
      headers: HEADERS,
    });

    return data;
  },
};

export default BikesApiClient;
