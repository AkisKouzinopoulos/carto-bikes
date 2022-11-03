import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { MAP_TYPES } from '@deck.gl/carto';
import { ScatterplotLayer, TextLayer, IconLayer } from '@deck.gl/layers';
import { HexagonLayer, HeatmapLayer } from '@deck.gl/aggregation-layers';

import BikesApiClient from '../../clients/BikesApiClient';

export const BIKES_LAYER_ID = 'bikesLayer';

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
};

export default function BikesLayer() {
  const { bikesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, bikesLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  const [bikesData, setBikesData] = useState([]);
  const [attractionsData, setAttractionsData] = useState([]);

  useEffect(() => {
    BikesApiClient.getBikesData()
      .then((response) => {
        setBikesData(response);
      })
      .catch((e) => {
        console.log('error', e);
      });
  }, []);

  useEffect(() => {
    BikesApiClient.getAttractionsData()
      .then((response) => {
        setAttractionsData(response);
      })
      .catch((e) => {
        console.log('error', e);
      });
  }, []);

  if (bikesLayer && source) {
    return [
      new HexagonLayer({
        id: 'hex',
        data: bikesData,
        getPosition: (bikeStation) => [+bikeStation.longitude, +bikeStation.latitude],
        getElevationWeight: (d) => d.available_bike_stands + d.available_bikes,
        elevationScale: 10,
        extruded: true,
        radius: 109,
        opacity: 0.6,
        coverage: 0.88,
        lowerPercentile: 50,
        wireframe: true,
        pickable: true,
        onHover: (info) => {
          if (info?.object) {
            info.object = {
              html: `<div>lat: ${info.coordinate[0]}</div>`,
              style: {},
            };
          }
        },
      }),
      new HeatmapLayer({
        id: 'heatmapLayer',
        data: bikesData,
        // getPosition: (d) => d.COORDINATES,
        getPosition: (bikeStation) => [+bikeStation.longitude, +bikeStation.latitude],
        // getWeight: (d) => d.WEIGHT,
        getWeight: (bikeStation) => bikeStation.weight,
        // getWeight: 10,
        aggregation: 'SUM',
      }),
      new TextLayer({
        id: 'text-layer',
        data: attractionsData,
        pickable: true,
        // getPosition: d => d.coordinates,
        getPosition: (attraction) => [attraction.geo.longitude, attraction.geo.latitude],
        // getText: d => d.name,
        getText: (attraction) => attraction.name,
        getSize: 12,
        getAngle: 0,
        getTextAnchor: 'middle',
        getAlignmentBaseline: 'center',
        background: false,
        // getColor: (bikeStation) => [105, 205, 255, 200],
        getColor: [105, 205, 255, 200],
      }),
      new IconLayer({
        id: 'icon-layer',
        data: attractionsData,
        pickable: true,
        // iconAtlas and iconMapping are required
        // getIcon: return a string
        iconAtlas:
          'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
        iconMapping: ICON_MAPPING,
        getIcon: () => 'marker',
        sizeScale: 5,
        getPosition: (attraction) => [attraction.geo.longitude, attraction.geo.latitude],
        getSize: () => 5,
        getColor: (attraction) => [Math.sqrt(attraction.exits), 140, 0],
      }),
    ];
  }
}
