import StoresLayer from './StoresLayer';
import BikesLayer from './BikesLayer';
// [hygen] Import layers

export const getLayers = () => {
  return [
    StoresLayer(),
    BikesLayer(),
    // [hygen] Add layer
  ];
};
