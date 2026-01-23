// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbase from '@moonbaseai/sdk';

const client = new Moonbase({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource inboxMessages', () => {
  test('create: only required params', async () => {
    const responsePromise = client.inboxMessages.create({
      body: 'This is the body of the message. It supports [markdown](https://en.wikipedia.org/wiki/Markdown).',
      inbox_id: '1CLJt2v6KXDyzDuM57pQqo',
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
    const response = await client.inboxMessages.create({
      body: 'This is the body of the message. It supports [markdown](https://en.wikipedia.org/wiki/Markdown).',
      inbox_id: '1CLJt2v6KXDyzDuM57pQqo',
      bcc: [{ email: 'steve@example.com', name: 'Steve' }],
      cc: [{ email: 'joe@example.com', name: 'Joe' }],
      conversation_id: 'conversation_id',
      subject: 'Test Subject',
      to: [
        { email: 'bob@example.com', name: 'Bob' },
        { email: 'jack@example.com', name: 'name' },
      ],
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.inboxMessages.retrieve('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.inboxMessages.retrieve('id', { include: ['addresses'] }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Moonbase.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.inboxMessages.list();
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
      client.inboxMessages.list(
        {
          after: 'after',
          before: 'before',
          filter: {
            conversation_id: { eq: 'eq' },
            inbox_id: { eq: 'eq' },
          },
          include: ['addresses'],
          limit: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Moonbase.NotFoundError);
  });
});
