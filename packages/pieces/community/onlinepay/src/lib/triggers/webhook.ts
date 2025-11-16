import {
  createTrigger,
  Property,
  TriggerStrategy,
} from '@activepieces/pieces-framework';
import { onlinepayAuth } from '../..';

export const onlinepayWebhook = createTrigger({
  auth: onlinepayAuth,
  name: 'OnlinePay Webhook',
  displayName: 'Receive OnlinePay Webhook',
  description: 'Used to receive events from OnlinePay via webhooks',
  sampleData: {
    id: 'b7c02d36-90db-4cc3-b174-868ed8a734c8',
    amount: 4200,
    merchant_reference: 'ORDER-12345',
    status: 'ACTIVE',
  },
  props: {
    webhookInstructions: Property.MarkDown({
      value: `
        To use this trigger, manually configure a OnlinePay notification:
1. Go to OnlinePay > Administration > Notifications.
2. Select the 'Create new notification'.
3. Enter a 'Name'
4. Select your 'Organisation'
5. Select the Events to subscribe to (Eg):
    CheckoutTransactionSuccess
    CheckoutTransactionFailed
6. In the 'URL Endpoint', set the URL to:
\n\n\`\`\`text
{{webhookUrl}}
\`\`\`
7. Select 'Webhook type' to 'Full event payload'.
8. Click 'Save'.
            `,
    }),
  },
  type: TriggerStrategy.WEBHOOK,
  async onEnable() {
    // Nothing to register programmatically. User must configure webhook in Xero Developer portal.
  },
  async onDisable() {
    // Nothing to clean up programmatically.
  },
  async run(context) {
    return [context.payload.body];
  },
});
