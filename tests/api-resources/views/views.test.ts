// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbase from '@moonbaseai/sdk';

const client = new Moonbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource views', () => {
  test('create: only required params', async () => {
    const responsePromise = client.views.create({
      collection: { type: 'collection' },
      fields: [{ field: 'name' }, { field: 'email' }],
      name: 'Active leads',
      view_type: 'table',
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
    const response = await client.views.create({
      collection: {
        type: 'collection',
        id: 'id',
        ref: 'people',
      },
      fields: [
        {
          field: 'name',
          display_fields: ['string'],
          is_pinned: true,
          is_wrapped: true,
          size: 'fit',
        },
        {
          field: 'email',
          display_fields: ['string'],
          is_pinned: true,
          is_wrapped: true,
          size: 'fit',
        },
      ],
      name: 'Active leads',
      view_type: 'table',
      aggregates: [{ type: 'item_count', group: 'group' }],
      filter: {
        field: 'name',
        op: 'contains',
        value: 'Acme',
      },
      groups: ['string'],
      relation_value_filters: [
        {
          field: 'field',
          filter: {
            field: 'field',
            op: 'starts_with',
            value: 'string',
          },
        },
      ],
      sort: ['-name'],
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.views.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.views.update('id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.views.list();
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
      client.views.list(
        {
          after: 'after',
          before: 'before',
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Moonbase.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.views.delete('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
