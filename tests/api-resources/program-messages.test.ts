// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbase from '@moonbaseai/sdk';

const client = new Moonbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource programMessages', () => {
  test('create: only required params', async () => {
    const responsePromise = client.programMessages.create({
      person: { email: 'person-60@example-60.com' },
      program_template_id: '1CRDSENp2MzMSfBMCbyEJd',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.programMessages.create({
      person: { email: 'person-60@example-60.com' },
      program_template_id: '1CRDSENp2MzMSfBMCbyEJd',
      custom_variables: { coupon_code: 'bar' },
    });
  });
});
