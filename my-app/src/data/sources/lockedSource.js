import { MAP_TYPES } from '@deck.gl/carto';

const LOCKED_SOURCE_ID = 'lockedSource';

const source = {
  id: LOCKED_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-5rs0powf.shared.dublinBikes-lat-long`,
};

export default source;
