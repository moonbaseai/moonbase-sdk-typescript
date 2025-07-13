// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MoonbaseSDK from 'moonbase-sdk';

const client = new MoonbaseSDK({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource items', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.items.create({
      collection_id: '1CR2QLsnhwrJX7Z33jnyGV',
      values: {
        name: { text: 'Aperture Science', type: 'value/text/single_line' },
        ceo: { item: { id: '1CR2QLtx9doK4wFiFB7VAS', type: 'item' }, type: 'value/relation' },
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('create: required and optional params', async () => {
    const response = await client.items.create({
      collection_id: '1CR2QLsnhwrJX7Z33jnyGV',
      values: {
        name: { text: 'Aperture Science', type: 'value/text/single_line' },
        ceo: {
          item: { id: '1CR2QLtx9doK4wFiFB7VAS', type: 'item', values: { foo: 'bar' } },
          type: 'value/relation',
        },
      },
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieve', async () => {
    const responsePromise = client.items.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('update: only required params', async () => {
    const responsePromise = client.items.update('id', {
      values: { foo: { text: 'text', type: 'value/text/single_line' } },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('update: required and optional params', async () => {
    const response = await client.items.update('id', {
      values: { foo: { text: 'text', type: 'value/text/single_line' } },
      'update-many-strategy': 'replace',
      'update-one-strategy': 'replace',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('delete', async () => {
    const responsePromise = client.items.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('upsert: only required params', async () => {
    const responsePromise = client.items.upsert({
      collection_id: '1CR2QLbeMAqKQ6PvQu39pZ',
      identifiers: { domain: [{ domain: 'aperturescience.com', type: 'value/uri/domain' }] },
      values: {
        name: { text: 'Aperture Science', type: 'value/text/single_line' },
        domain: [{ domain: 'aperturescience.com', type: 'value/uri/domain' }],
        linked_in: { profile: {}, type: 'value/uri/social_linked_in' },
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('upsert: required and optional params', async () => {
    const response = await client.items.upsert({
      collection_id: '1CR2QLbeMAqKQ6PvQu39pZ',
      identifiers: { domain: [{ domain: 'aperturescience.com', type: 'value/uri/domain' }] },
      values: {
        name: { text: 'Aperture Science', type: 'value/text/single_line' },
        domain: [{ domain: 'aperturescience.com', type: 'value/uri/domain' }],
        linked_in: {
          profile: { url: 'https://linkedin.com/company/aperturescience', username: 'username' },
          type: 'value/uri/social_linked_in',
        },
      },
      'update-many-strategy': 'replace',
      'update-one-strategy': 'replace',
    });
  });
});
