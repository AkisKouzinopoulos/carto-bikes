import { useEffect } from 'react';
import bikesSource from 'data/sources/bikesSource';
import { LOCKED_LAYER_ID } from 'components/layers/LockedLayer';
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
  locked: {},
}));

export default function Locked() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(bikesSource));

    dispatch(
      addLayer({
        id: LOCKED_LAYER_ID,
        source: bikesSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(LOCKED_LAYER_ID));
      dispatch(removeSource(bikesSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.locked}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
