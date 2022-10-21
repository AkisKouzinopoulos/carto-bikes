import { useEffect } from 'react';
import bikesSource from 'data/sources/bikesSource';
import { BIKES_LAYER_ID } from 'components/layers/BikesLayer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  bikes: {},
}));

export default function Bikes() {
  const dispatch = useDispatch();
  const classes = useStyles();

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
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
