import axios from 'axios';

const apiURL = 'https://220.transflow.ru/api/public/v1/routes_data?key=012345678abc';

async function fetchRoutes() {
  const { data } = await axios.get(apiURL);

  return data;
}
// eslint-disable-next-line import/prefer-default-export
export { fetchRoutes };
