// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mobile: 0,
  version: 0,
  resources: [
    'drachma',
    'food',
    'water',
    'wood',
    'iron',
    'stone',
    'marble',
    'grapes',
    'wine',
    'gold',
  ],
  style: {
    default: 'ewnextv3',
    allowed: ['ewnextv2', 'ewnextv3'],
  },
  language: {
    default: 'en',
    allowed: ['en', 'fr', 'tlh'],
  },
  SERVER_DEV: 'https://dev.ellaswar.com',
  facebook: {
    client_id: 173897253017254,
  },
  google: {
    client_id:
      '516434350883-uqounu7irl3u2jl42dph661dsqg0vvnj.apps.googleusercontent.com',
  },
  discord: 'https://discord.gg/gbhWrPJjfh',
};
