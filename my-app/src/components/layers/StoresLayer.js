import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { MAP_TYPES } from '@deck.gl/carto';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';

export const STORES_LAYER_ID = 'storesLayer';

export default function StoresLayer() {
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });
  const sourceData = [
    {
      id: 54399243,
      harvest_time: '2022-10-21T16:45:02',
      station_id: 1,
      available_bike_stands: 25,
      bike_stands: 31,
      available_bikes: 6,
      banking: false,
      bonus: false,
      last_update: '2022-10-21T16:42:08',
      status: 'OPEN',
      address: 'Clarendon Row',
      name: 'CLARENDON ROW',
      latitude: '53.3409',
      longitude: '-6.2625',
    },
    {
      id: 54399309,
      harvest_time: '2022-10-21T16:45:02',
      station_id: 2,
      available_bike_stands: 15,
      bike_stands: 20,
      available_bikes: 5,
      banking: false,
      bonus: false,
      last_update: '2022-10-21T16:43:50',
      status: 'OPEN',
      address: 'Blessington Street',
      name: 'BLESSINGTON STREET',
      latitude: '53.3568',
      longitude: '-6.26814',
    },
    {
      id: 54399330,
      harvest_time: '2022-10-21T16:45:02',
      station_id: 3,
      available_bike_stands: 14,
      bike_stands: 20,
      available_bikes: 6,
      banking: false,
      bonus: false,
      last_update: '2022-10-21T16:40:04',
      status: 'OPEN',
      address: 'Bolton Street',
      name: 'BOLTON STREET',
      latitude: '53.3512',
      longitude: '-6.26986',
    },
    {
      id: 54399270,
      harvest_time: '2022-10-21T16:45:02',
      station_id: 4,
      available_bike_stands: 11,
      bike_stands: 20,
      available_bikes: 9,
      banking: false,
      bonus: false,
      last_update: '2022-10-21T16:42:46',
      status: 'OPEN',
      address: 'Greek Street',
      name: 'GREEK STREET',
      latitude: '53.3469',
      longitude: '-6.27298',
    },
    {
      id: 54399266,
      harvest_time: '2022-10-21T16:45:02',
      station_id: 5,
      available_bike_stands: 33,
      bike_stands: 40,
      available_bikes: 7,
      banking: false,
      bonus: false,
      last_update: '2022-10-21T16:43:52',
      status: 'OPEN',
      address: 'Charlemont Street',
      name: 'CHARLEMONT PLACE',
      latitude: '53.3307',
      longitude: '-6.26018',
    },
    {
      id: 54399233,
      harvest_time: '2022-10-21T16:45:02',
      station_id: 6,
      available_bike_stands: 20,
      bike_stands: 20,
      available_bikes: 0,
      banking: false,
      bonus: false,
      last_update: '2022-10-21T16:41:21',
      status: 'OPEN',
      address: 'Christchurch Place',
      name: 'CHRISTCHURCH PLACE',
      latitude: '53.3434',
      longitude: '-6.27012',
    },
    {
      id: 54399273,
      harvest_time: '2022-10-21T16:45:02',
      station_id: 7,
      available_bike_stands: 15,
      bike_stands: 29,
      available_bikes: 14,
      banking: false,
      bonus: false,
      last_update: '2022-10-21T16:43:19',
      status: 'OPEN',
      address: 'High Street',
      name: 'HIGH STREET',
      latitude: '53.3436',
      longitude: '-6.27507',
    },
    {
      id: 54399285,
      harvest_time: '2022-10-21T16:45:02',
      station_id: 8,
      available_bike_stands: 21,
      bike_stands: 30,
      available_bikes: 9,
      banking: false,
      bonus: false,
      last_update: '2022-10-21T16:42:06',
      status: 'OPEN',
      address: 'Custom House Quay',
      name: 'CUSTOM HOUSE QUAY',
      latitude: '53.3479',
      longitude: '-6.24805',
    },
    {
      id: 54399261,
      harvest_time: '2022-10-21T16:45:02',
      station_id: 9,
      available_bike_stands: 15,
      bike_stands: 24,
      available_bikes: 9,
      banking: false,
      bonus: false,
      last_update: '2022-10-21T16:44:11',
      status: 'OPEN',
      address: 'Exchequer Street',
      name: 'EXCHEQUER STREET',
      latitude: '53.343',
      longitude: '-6.26358',
    },
  ];

  // if (storesLayer && source) {
  //   return new ScatterplotLayer({
  //     id: 'scatter',
  //     data: sourceData,
  //     opacity: 1,
  //     filled: true,
  //     radiusMinPixels: 20,
  //     radiusMaxPixels: 50,
  //     getPosition: d => [d.longitude, d.latitude],
  //     getFillColor: d => d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],
  //   });
  // }
  if (storesLayer && source) {
    return new HexagonLayer({
      id: 'hex',
      data: sourceData,
      getPosition: (d) => [+d.longitude, +d.latitude],
      // getElevationWeight: (d) => d.n_killed * 9 + d.n_injured,
      getElevationWeight: (d) => d.available_bike_stands + d.available_bikes,
      elevationScale: 100,
      extruded: true,
      radius: 609,
      opacity: 0.9,
      coverage: 0.88,
      lowerPercentile: 50,
    });
  }
}
