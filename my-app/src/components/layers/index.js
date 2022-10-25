import StoresLayer from './StoresLayer';
import BikesLayer from './BikesLayer';
import LockedLayer from './LockedLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    StoresLayer(),
    BikesLayer(),
    LockedLayer(),
    // [hygen] Add layer
  ];
};
