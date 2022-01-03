<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [OverlayBannersStart](./kibana-plugin-core-public.overlaybannersstart.md) &gt; [replace](./kibana-plugin-core-public.overlaybannersstart.replace.md)

## OverlayBannersStart.replace() method

Replace a banner in place

<b>Signature:</b>

```typescript
replace(id: string | undefined, mount: MountPoint, priority?: number): string;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  id | string \| undefined | the unique identifier for the banner returned by [OverlayBannersStart.add()](./kibana-plugin-core-public.overlaybannersstart.add.md) |
|  mount | MountPoint | [MountPoint](./kibana-plugin-core-public.mountpoint.md) |
|  priority | number | optional priority order to display this banner. Higher priority values are shown first. |

<b>Returns:</b>

string

a new identifier for the given banner to be used with [OverlayBannersStart.remove()](./kibana-plugin-core-public.overlaybannersstart.remove.md) and [OverlayBannersStart.replace()](./kibana-plugin-core-public.overlaybannersstart.replace.md)
