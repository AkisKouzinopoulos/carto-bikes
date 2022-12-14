import React, { useState, useEffect } from 'react';
import bikesSource from 'data/sources/bikesSource';
import { BIKES_LAYER_ID } from 'components/layers/BikesLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import { LineLayer } from '@deck.gl/layers';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  bikes: {},
}));

const Bikes = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // // Viewport settings
  // const INITIAL_VIEW_STATE = {
  //   longitude: -6.2183847,
  //   latitude: 53.28326,
  //   zoom: 9,
  //   pitch: 1,
  //   bearing: 1,
  // };

  useEffect(() => {
    dispatch(addSource(bikesSource));

    dispatch(
      addLayer({
        id: BIKES_LAYER_ID,
        source: bikesSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(BIKES_LAYER_ID));
      dispatch(removeSource(bikesSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.bikes}>
      <Grid item>
        Dublin Bikes
      </Grid>
    </Grid>
  );
}

export default Bikes;
