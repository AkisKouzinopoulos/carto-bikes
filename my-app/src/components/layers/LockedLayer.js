import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { ScreenGridLayer } from '@deck.gl/aggregation-layers';


export const LOCKED_LAYER_ID = 'lockedLayer';
const colorRange = [
  [255, 255, 178, 25],
  [254, 217, 118, 85],
  [254, 178, 76, 127],
  [253, 141, 60, 170],
  [240, 59, 32, 212],
  [189, 0, 38, 255]
];
export default function LockedLayer() {
  const { lockedLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, lockedLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (lockedLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: LOCKED_LAYER_ID,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      getLineColor: [255, 0, 0],
      lineWidthMinPixels: 1,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
    // return new ScreenGridLayer({
    //   ...cartoLayerProps,
    //   id: 'LOCKED_LAYER_ID',
    //   opacity: 0.8,
    //   getPosition: d => [d[0], d[1]],
    //   getWeight: d => d[2],
    //   cellSizePixels: 20,
    //   colorRange,
    //   gpuAggregation: true,
    //   aggregation: 'SUM',
    // })
  }
}
