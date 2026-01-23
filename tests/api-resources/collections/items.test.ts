// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbase from '@moonbaseai/sdk';

const client = new Moonbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource items', () => {
  test('create: only required params', async () => {
    const responsePromise = client.collections.items.create('collection_id', {
      values: {
        name: { data: 'Aperture Science', type: 'value/text/single_line' },
        ceo: {
          data: { id: '1CLJt2v84CdKMEKqwBNXfE', type: 'item' },
          type: 'value/relation',
        },
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
    const response = await client.collections.items.create('collection_id', {
      values: {
        name: { data: 'Aperture Science', type: 'value/text/single_line' },
        ceo: {
          data: { id: '1CLJt2v84CdKMEKqwBNXfE', type: 'item' },
          type: 'value/relation',
        },
      },
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.collections.items.retrieve('id', { collection_id: 'collection_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.collections.items.retrieve('id', { collection_id: 'collection_id' });
  });

  test('update: only required params', async () => {
    const responsePromise = client.collections.items.update('id', {
      collection_id: 'collection_id',
      values: { name: { data: 'Jony Appleseed', type: 'value/text/single_line' } },
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
    const response = await client.collections.items.update('id', {
      collection_id: 'collection_id',
      values: { name: { data: 'Jony Appleseed', type: 'value/text/single_line' } },
      'update-many-strategy': 'replace',
      'update-one-strategy': 'replace',
    });
  });

  test('list', async () => {
    const responsePromise = client.collections.items.list('collection_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.collections.items.list(
        'collection_id',
        {
          after: 'after',
          before: 'before',
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Moonbase.NotFoundError);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.collections.items.delete('id', { collection_id: 'collection_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.collections.items.delete('id', { collection_id: 'collection_id' });
  });

  test('upsert: only required params', async () => {
    const responsePromise = client.collections.items.upsert('collection_id', {
      identifiers: { domain: [{ data: 'aperturescience.com', type: 'value/uri/domain' }] },
      values: {
        name: { data: 'Aperture Science', type: 'value/text/single_line' },
        domain: [{ data: 'aperturescience.com', type: 'value/uri/domain' }],
        linked_in: {
          data: {},
          type: 'value/uri/social_linked_in',
        },
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
    const response = await client.collections.items.upsert('collection_id', {
      identifiers: { domain: [{ data: 'aperturescience.com', type: 'value/uri/domain' }] },
      values: {
        name: { data: 'Aperture Science', type: 'value/text/single_line' },
        domain: [{ data: 'aperturescience.com', type: 'value/uri/domain' }],
        linked_in: {
          data: { url: 'https://linkedin.com/company/aperturescience', username: 'company/moonbaseai' },
          type: 'value/uri/social_linked_in',
        },
      },
      'update-many-strategy': 'replace',
      'update-one-strategy': 'replace',
    });
  });
});
