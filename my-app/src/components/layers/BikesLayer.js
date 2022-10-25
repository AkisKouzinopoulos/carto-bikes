import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { MAP_TYPES } from '@deck.gl/carto';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';

import BikesApiClient from '../../clients/BikesApiClient';

export const BIKES_LAYER_ID = 'bikesLayer';

export default function BikesLayer() {
  const { bikesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, bikesLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  const [bikesData, setBikesData] = useState([]);

  useEffect(() => {
    BikesApiClient.getBikesData()
      .then(response => {
        setBikesData(response);
      })
      .catch((e) => {
        console.log('error', e);
      });
  }, []);

  if (bikesLayer && source) {
    return new HexagonLayer({
      id: 'hex',
      data: bikesData,
      getPosition: (d) => [+d.longitude, +d.latitude],
      getElevationWeight: (d) => d.available_bike_stands + d.available_bikes,
      elevationScale: 100,
      extruded: true,
      radius: 109,
      opacity: 0.6,
      coverage: 0.88,
      lowerPercentile: 50,
    });
  }
}
