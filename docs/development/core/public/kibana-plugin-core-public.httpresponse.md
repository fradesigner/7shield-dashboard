<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [HttpResponse](./kibana-plugin-core-public.httpresponse.md)

## HttpResponse interface


<b>Signature:</b>

```typescript
export interface HttpResponse<TResponseBody = unknown> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [body?](./kibana-plugin-core-public.httpresponse.body.md) | TResponseBody | <i>(Optional)</i> Parsed body received, may be undefined if there was an error. |
|  [fetchOptions](./kibana-plugin-core-public.httpresponse.fetchoptions.md) | Readonly&lt;HttpFetchOptionsWithPath&gt; | The original [HttpFetchOptionsWithPath](./kibana-plugin-core-public.httpfetchoptionswithpath.md) used to send this request. |
|  [request](./kibana-plugin-core-public.httpresponse.request.md) | Readonly&lt;Request&gt; | Raw request sent to Kibana server. |
|  [response?](./kibana-plugin-core-public.httpresponse.response.md) | Readonly&lt;Response&gt; | <i>(Optional)</i> Raw response received, may be undefined if there was an error. |
