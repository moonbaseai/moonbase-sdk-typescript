# Shared

Types:

- <code><a href="./src/resources/shared.ts">Error</a></code>
- <code><a href="./src/resources/shared.ts">View</a></code>

# Collections

Types:

- <code><a href="./src/resources/collections/collections.ts">Collection</a></code>
- <code><a href="./src/resources/collections/collections.ts">Field</a></code>

Methods:

- <code title="get /collections/{id}">client.collections.<a href="./src/resources/collections/collections.ts">retrieve</a>(id, { ...params }) -> Collection</code>
- <code title="get /collections">client.collections.<a href="./src/resources/collections/collections.ts">list</a>({ ...params }) -> CollectionsCursorPage</code>

## Fields

Methods:

- <code title="get /collections/{collection_id}/fields/{id}">client.collections.fields.<a href="./src/resources/collections/fields.ts">retrieve</a>(id, { ...params }) -> Field</code>

# Items

Types:

- <code><a href="./src/resources/items.ts">BooleanValue</a></code>
- <code><a href="./src/resources/items.ts">Choice</a></code>
- <code><a href="./src/resources/items.ts">DateValue</a></code>
- <code><a href="./src/resources/items.ts">DatetimeValue</a></code>
- <code><a href="./src/resources/items.ts">DomainValue</a></code>
- <code><a href="./src/resources/items.ts">EmailValue</a></code>
- <code><a href="./src/resources/items.ts">FieldValue</a></code>
- <code><a href="./src/resources/items.ts">FloatValue</a></code>
- <code><a href="./src/resources/items.ts">FunnelStep</a></code>
- <code><a href="./src/resources/items.ts">GeoValue</a></code>
- <code><a href="./src/resources/items.ts">IntegerValue</a></code>
- <code><a href="./src/resources/items.ts">Item</a></code>
- <code><a href="./src/resources/items.ts">MonetaryValue</a></code>
- <code><a href="./src/resources/items.ts">MultiLineTextValue</a></code>
- <code><a href="./src/resources/items.ts">PercentageValue</a></code>
- <code><a href="./src/resources/items.ts">RelationValue</a></code>
- <code><a href="./src/resources/items.ts">SingleLineTextValue</a></code>
- <code><a href="./src/resources/items.ts">SocialLinkedInValue</a></code>
- <code><a href="./src/resources/items.ts">SocialXValue</a></code>
- <code><a href="./src/resources/items.ts">TelephoneNumber</a></code>
- <code><a href="./src/resources/items.ts">URLValue</a></code>
- <code><a href="./src/resources/items.ts">Value</a></code>

Methods:

- <code title="post /items">client.items.<a href="./src/resources/items.ts">create</a>({ ...params }) -> Item</code>
- <code title="get /items/{id}">client.items.<a href="./src/resources/items.ts">retrieve</a>(id) -> Item</code>
- <code title="patch /items/{id}">client.items.<a href="./src/resources/items.ts">update</a>(id, { ...params }) -> Item</code>
- <code title="delete /items/{id}">client.items.<a href="./src/resources/items.ts">delete</a>(id) -> Item</code>
- <code title="post /items/upsert">client.items.<a href="./src/resources/items.ts">upsert</a>({ ...params }) -> Item</code>
