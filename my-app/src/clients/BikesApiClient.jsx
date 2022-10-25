import axios from 'axios';
import bikes from 'clients/dublin-bikes.json';

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
const BikesApiClient = {

  getBikesData: async () => {
    // const { data } = await axios.get('/dublinbikes-api/last_snapshot/', {
    //   headers: HEADERS,
    // });
    const data = bikes;

    return data;
  },
};

export default BikesApiClient;
