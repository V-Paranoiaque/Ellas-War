// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mobile: 0,
  resources: ['drachma', 'food', 'water', 'wood', 'iron', 'stone', 'marble', 'grapes', 'wine', 'gold'],
  style: {
    default: 'red',
    allowed: ['pink', 'red']
  },
  SOCKET_ENDPOINT: 'https://ewnextv2.ellaswar.com',
};
