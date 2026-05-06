// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbase from '@moonbaseai/sdk';

const client = new Moonbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource fields', () => {
  test('create: only required params', async () => {
    const responsePromise = client.collections.fields.create('collection_id', {
      field: { name: 'Lead Source', type: 'field/text/single_line' },
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
    const response = await client.collections.fields.create('collection_id', {
      field: {
        name: 'Lead Source',
        type: 'field/text/single_line',
        cardinality: 'one',
        default_values: [{ data: 'data', type: 'value/text/single_line' }],
        description: 'description',
        required: true,
        unique: true,
      },
    });
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.collections.fields.retrieve('id', { collection_id: 'collection_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.collections.fields.retrieve('id', { collection_id: 'collection_id' });
  });

  test('update: only required params', async () => {
    const responsePromise = client.collections.fields.update('id', {
      collection_id: 'collection_id',
      field: { type: 'field/text/single_line' },
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
    const response = await client.collections.fields.update('id', {
      collection_id: 'collection_id',
      field: {
        type: 'field/text/single_line',
        cardinality: 'one',
        default_values: [{ data: 'data', type: 'value/text/single_line' }],
        description: 'description',
        name: 'Source',
        required: true,
        unique: true,
      },
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.collections.fields.delete('id', { collection_id: 'collection_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.collections.fields.delete('id', { collection_id: 'collection_id' });
  });
});
