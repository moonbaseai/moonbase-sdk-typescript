// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbase from '@moonbaseai/sdk';

const client = new Moonbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource items', () => {
  test('create: only required params', async () => {
    const responsePromise = client.items.create({
      collection_id: '1CS2gt2uaMW7UusJVWubAd',
      values: {
        name: { text: 'Aperture Science', type: 'value/text/single_line' },
        ceo: { item: { id: '1CS2gt4AVHhvgfNcrZFHD5', type: 'item' }, type: 'value/relation' },
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

  test('create: required and optional params', async () => {
    const response = await client.items.create({
      collection_id: '1CS2gt2uaMW7UusJVWubAd',
      values: {
        name: { text: 'Aperture Science', type: 'value/text/single_line' },
        ceo: {
          item: {
            id: '1CS2gt4AVHhvgfNcrZFHD5',
            type: 'item',
            links: { collection: 'https://example.com', self: 'https://example.com' },
            values: { foo: { text: 'text', type: 'value/text/single_line' } },
          },
          type: 'value/relation',
        },
      },
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.items.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: only required params', async () => {
    const responsePromise = client.items.update('id', {
      values: { name: { text: 'Jony Appleseed', type: 'value/text/single_line' } },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.items.update('id', {
      values: { name: { text: 'Jony Appleseed', type: 'value/text/single_line' } },
      'update-many-strategy': 'replace',
      'update-one-strategy': 'replace',
    });
  });

  test('delete', async () => {
    const responsePromise = client.items.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('upsert: only required params', async () => {
    const responsePromise = client.items.upsert({
      collection_id: '1CS2gtGHjRNZyuPs4LNS7J',
      identifiers: { domain: [] },
      values: {
        name: { text: 'Aperture Science', type: 'value/text/single_line' },
        domain: [],
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

  test('upsert: required and optional params', async () => {
    const response = await client.items.upsert({
      collection_id: '1CS2gtGHjRNZyuPs4LNS7J',
      identifiers: { domain: [] },
      values: {
        name: { text: 'Aperture Science', type: 'value/text/single_line' },
        domain: [],
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
