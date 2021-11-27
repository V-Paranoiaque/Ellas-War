export const environment = {
  production: true,
  mobile: 1,
  version: 1,
  resources: ['drachma', 'food', 'water', 'wood', 'iron', 'stone', 'marble', 'grapes', 'wine', 'gold'],
  style: {
    default: 'red',
    allowed: ['pink', 'red']
  },
  language: {
    default: 'en',
    allowed: ['en', 'fr']
  },
  SERVER_DEV: 'https://dev.ellaswar.com',
  facebook: {
    client_id: 173897253017254
  },
  google: {
    client_id: '516434350883-uqounu7irl3u2jl42dph661dsqg0vvnj.apps.googleusercontent.com'
  },
  paypal: {
    client_id: 'AVVRXtQZXoKoUmkpN6rHEqrMEtgawwjTRin4irS8DDd53r2LOHjiXjeyig8gxHuPg0Zk504pzUeW4jOl',
    currency: 'EUR',
    symbol: '€'
  }
};
