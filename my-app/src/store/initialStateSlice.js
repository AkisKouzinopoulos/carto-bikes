import { VOYAGER } from '@carto/react-basemaps';
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  viewState: {
    latitude: 53.28326,
    longitude: -6.2183847,
    zoom: 10,
    pitch: 40,
    bearing: 0,
    dragRotate: true,
  },
  basemap: VOYAGER,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl: 'https://gcp-europe-west1.api.carto.com',
  },
  googleApiKey: '', // only required when using a Google Basemap
  googleMapId: '', // only required when using a Google Custom Basemap
  oauth: {
    domain: 'auth.carto.com',
    clientId: 'vTgU1yyFVpLg9OrqI0wDQbkhFRg87A8o', // type here your application clientId
    organizationId: '', // organizationId is required for SSO
    scopes: [
      'read:current_user',
      'update:current_user',
      'read:connections',
      'write:connections',
      'read:maps',
      'write:maps',
      'read:account',
      'admin:account',
    ],
    audience: 'carto-cloud-native-api',
    authorizeEndPoint: 'https://carto.com/oauth2/authorize', // only valid if keeping https://localhost:3000/oauthCallback
  },
};
