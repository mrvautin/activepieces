import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { onlinepayAuth } from '../..';

export const getCheckout = createAction({
  name: 'get_checkout',
  auth: onlinepayAuth,
  displayName: 'Get Checkout by ID',
  description: 'Fetches a Checkout by its ID',
  props: {
    id: Property.ShortText({
      displayName: 'Checkout ID',
      required: true,
    }),
  },
  async run(context) {
    const basicAuthToken = Buffer.from(
      `${context.auth.userId}:${context.auth.apiKey}`
    ).toString('base64');
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: `${context.auth.environment}/oidc/checkout-service/v2/checkout/${context.propsValue.id}`,
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
      },
    });
    return res.body;
  },
});

export const createCheckout = createAction({
  name: 'create_checkout',
  auth: onlinepayAuth,
  displayName: 'Create a new Checkout',
  description: 'Creates a new OnlinePay Checkout',
  props: {
    merchant_reference: Property.ShortText({
      displayName: 'Merchant Reference',
      required: true,
    }),
    amount: Property.Number({
      displayName: 'Amount',
      required: true,
    }),
    customer: Property.ShortText({
      displayName: 'Customer ID',
      required: true,
    }),
  },
  async run(context) {
    const basicAuthToken = Buffer.from(
      `${context.auth.userId}:${context.auth.apiKey}`
    ).toString('base64');
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.POST,
      url: `${context.auth.environment}/oidc/checkout-service/v2/checkout`,
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
      },
      body: {
        entity_id: context.auth.orgId,
        amount: context.propsValue.amount,
        currency_code: context.auth.currencyCode || 'AUD',
        merchant_reference: context.propsValue.merchant_reference,
        interaction_type: 'HPP',
        customer: context.propsValue.customer,
        configurations: {
          card: {
            threed_secure: {
              threeds_contract_id: context.auth.threeDSecure,
              enabled: true,
            },
            shopper_interaction: 'ECOMMERCE',
            payment_contract_id: context.auth.paymentContract,
          },
          apple_pay: {
            card: {
              sca_compliance_level: 'NONE',
              shopper_interaction: 'ECOMMERCE',
              payment_contract_id: context.auth.paymentContract,
            },
          },
          google_pay: {
            card: {
              threed_secure: {
                threeds_contract_id: context.auth.threeDSecure,
                transaction_mode: 'P',
              },
              sca_compliance_level: 'WALLET',
              shopper_interaction: 'ECOMMERCE',
              payment_contract_id: context.auth.paymentContract,
            },
          },
        },
      },
    });
    return res.body;
  },
});

export const createCustomer = createAction({
  name: 'create_customer',
  auth: onlinepayAuth,
  displayName: 'Create new customer',
  description: 'Creates a new OnlinePay customer',
  props: {
    email_address: Property.ShortText({
      displayName: 'Email address',
      required: true,
    }),
    phone_number: Property.ShortText({
      displayName: 'Phone number',
      required: true,
    }),
    billing_first_name: Property.ShortText({
      displayName: 'Billing First Name',
      required: true,
    }),
    billing_last_name: Property.ShortText({
      displayName: 'Billing Last Name',
      required: true,
    }),
    address_1: Property.ShortText({
      displayName: 'Billing Address 1',
      required: true,
    }),
    address_2: Property.ShortText({
      displayName: 'Billing Address 2',
      required: false,
    }),
    city: Property.ShortText({
      displayName: 'Billing City',
      required: true,
    }),
    postal_code: Property.ShortText({
      displayName: 'Billing Postal Code',
      required: true,
    }),
    country_code: Property.ShortText({
      displayName: 'Country code',
      required: true,
    }),
  },
  async run(context) {
    const basicAuthToken = Buffer.from(
      `${context.auth.userId}:${context.auth.apiKey}`
    ).toString('base64');
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.POST,
      url: `${context.auth.environment}/oidc/customer-service/v2/customer`,
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
      },
      body: {
        entity_id: context.auth.orgId,
        billing: {
          first_name: context.propsValue.billing_first_name,
          last_name: context.propsValue.billing_last_name,
          address_1: context.propsValue.address_1,
          ...(context.propsValue.address_2 ? { address_2: context.propsValue.address_2 } : {}),
          city: context.propsValue.city,
          postal_code: context.propsValue.postal_code,
          country_code: context.propsValue.country_code,
        },
        email_address: context.propsValue.email_address,
        phone_number: context.propsValue.phone_number,
      },
    });
    return res.body;
  },
});

export const getCustomer = createAction({
  name: 'get_customer',
  auth: onlinepayAuth,
  displayName: 'Get Customer by ID',
  description: 'Fetches a Customer by its ID',
  props: {
    id: Property.ShortText({
      displayName: 'Customer ID',
      required: true,
    }),
  },
  async run(context) {
    const basicAuthToken = Buffer.from(
      `${context.auth.userId}:${context.auth.apiKey}`
    ).toString('base64');
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: `${context.auth.environment}/oidc/customer-service/v2/customer/${context.propsValue.id}`,
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
      },
    });
    return res.body;
  },
});
