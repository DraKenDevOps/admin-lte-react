# Vendored AdminLTE — fingerprint

| | |
|---|---|
| **Version** | AdminLTE **4.10.1** (local, unpublished distribution) |
| **Source** | `C:\Users\Anakin\Other\admin-lte-4` (the original tree — never modified) |
| **Copied** | 2026-10-29 |

Files in this directory are **source-controlled byte-copies** of the static dist:

| File | Origin path in original tree |
|---|---|
| `adminlte.esm.js` | `js/adminlte.esm.js` |
| `adminlte.css` | `css/adminlte.css` |
| `adminlte-colors.css` | `css/adminlte-colors.css` |
| `types/*.d.ts` | `js/types/*.d.ts` |

## Do NOT swap with npm `admin-lte`

npm `latest` for `admin-lte` is **4.10.0** while this bundle is **4.10.1**
(unpublished). Treat the upstream npm package as an alternative only, with a
documented 4.10.0/4.10.1 diff risk (README §4.1).

## Import rules

`store.ts` is the **only** module allowed to import `./adminlte.esm.js`,
and application code is only allowed to import from the barrel
(`src/lib/adminlte/index.ts`). No other AdminLTE API surface is public.
