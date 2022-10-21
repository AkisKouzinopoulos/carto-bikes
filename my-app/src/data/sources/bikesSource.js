import { MAP_TYPES } from '@deck.gl/carto';

const BIKES_SOURCE_ID = 'bikesSource';

const source = {
  id: BIKES_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'bikes_dw',
  data: ``,
};

export default source;
