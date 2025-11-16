import {
  createPiece,
  PieceAuth,
  Property,
} from '@activepieces/pieces-framework';
import {
  getCheckout,
  createCheckout,
  createCustomer,
  getCustomer,
} from './lib/actions/onlinepay';
import { onlinepayWebhook } from './lib/triggers/webhook';

export const onlinepayAuth = PieceAuth.CustomAuth({
  description: 'Enter custom authentication details',
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      description: 'User ID obtained from OnlinePay Dashboard',
      required: true,
    }),
    apiKey: PieceAuth.SecretText({
      displayName: 'API key',
      description: 'API key obtained from OnlinePay Dashboard',
      required: true,
    }),
    orgId: Property.ShortText({
      displayName: 'Organisation ID',
      description: 'Organisation ID obtained from OnlinePay Dashboard',
      required: true,
    }),
    paymentContract: Property.ShortText({
      displayName: 'Payment Contract ID',
      description: 'Payment Contract ID obtained from OnlinePay Dashboard',
      required: true,
    }),
    threeDSecure: Property.ShortText({
      displayName: '3D Secure Contract ID',
      description: '3D Secure Contract ID obtained from OnlinePay Dashboard',
      required: true,
    }),
    currencyCode: Property.ShortText({
      displayName: 'Currency code',
      description: '3 character currency code. E.g. AUD, USD, NZD, EUR',
      required: true,
      defaultValue: 'AUD',
    }),
    environment: Property.StaticDropdown({
      displayName: 'OnlinePay Environment',
      description: 'Which OnlinePay environment to connect to',
      required: true,
      options: {
        options: [
          { label: 'Production', value: 'https://au.gsc.verifone.cloud' },
          { label: 'CST', value: 'https://cst2.test-gsc.vfims.com' },
        ],
      },
    }),
  },
  required: true,
});

export const onlinepay = createPiece({
  displayName: 'OnlinePay',
  auth: onlinepayAuth,
  minimumSupportedRelease: '0.36.1',
  logoUrl: 'https://cdn.activepieces.com/pieces/onlinepay.png',
  authors: ['mrvautin'],
  actions: [
    getCheckout,
    createCheckout,
    getCustomer,
    createCustomer,
  ],
  triggers: [onlinepayWebhook],
});
