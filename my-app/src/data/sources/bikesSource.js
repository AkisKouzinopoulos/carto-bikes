import { MAP_TYPES } from '@deck.gl/carto';

const BIKES_SOURCE_ID = 'bikesSource';

const source = {
  id: BIKES_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-5rs0powf.shared.dublinBikes`,
};

export default source;
