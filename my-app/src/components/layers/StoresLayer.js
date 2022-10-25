import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { HexagonLayer } from '@deck.gl/aggregation-layers';

export const STORES_LAYER_ID = 'storesLayer';

export default function StoresLayer() {
  const { storesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (storesLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: STORES_LAYER_ID,
      pickable: true,
      extruded: true,
      radius: 200,
      elevationScale: 4,
      getPosition: d => d.COORDINATES
    });
   
  }
}
