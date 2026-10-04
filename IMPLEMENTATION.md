# Portfolio update — cached certificate images and layout refinements

## Install

Extract the ZIP into the repository root. It contains complete versions of:

- index.html
- assets/css/styles.css
- assets/js/app.js
- assets/js/pdf-cache.js (NEW — required for cached PDF previews)
- IMPLEMENTATION.md

Keep assets/js/content.js from the previous revision (the one with the grouped hackathons entry).
Keep assets/js/theme.js and all media/CV/certificates unchanged. This is an update to the previous
revision, not to the older original project snapshot. No npm or compilation step is required.

index.html loads theme.js v=2, content.js v=5, and CSS/pdf-cache.js/app.js v=6.
The new cache helper loads before app.js. Do not omit it when copying individual files.

## Certificate image caching

The original PDFs are not modified. When a PDF gallery item is first selected:

1. Try the in-memory preview cache.
2. Try the browser's IndexedDB preview cache.
3. Only on a miss, load PDF.js and render page 1.
4. Encode the page as a WebP image at quality 0.90, longest edge 2400 pixels.
5. Fall back to JPEG at quality 0.90 when WebP encoding is unsupported.
6. Store the compressed image blob in memory and, when permitted, IndexedDB.
7. Display it as a regular gallery image, retaining the Open PDF caption link.

PNG is only the last-resort encoding fallback if neither WebP nor JPEG encoding works.
Actual encoded file size depends on the document and browser; no fixed size reduction is promised.
Generated previews are browser-local blobs, not new files in the repository or ZIP.
The PDFs stay at their existing paths. No manual conversion or upload of preview images is needed.

Returning to a viewed certificate uses its image instead of parsing/rasterizing the PDF again.
A subsequent page reload or visit can use IndexedDB without loading PDF.js for that certificate.
The initial visit still needs PDF loading/rendering. Clearing site data, browser storage eviction,
storage restrictions, expiration, or cache version changes can require regeneration.
Storage failure falls back to the memory cache; it does not prevent preview display.
Cache data is origin-specific, so localhost and your deployed GitHub Pages site have separate caches.

The helper deduplicates in-flight requests and limits parallel rendering to two documents.
If you switch slides or close the dialog while rendering, work may finish in the background and
populate the cache, but stale results cannot replace the current slide or reopen the dialog.
Preview images resize through CSS; window resizing does not trigger another PDF render.
Object URLs are revoked when leaving a slide. Blobs stay in the bounded cache.

Memory cache: at most 24 previews and 12 MiB of encoded blobs.
Persistent cache: at most 32 previews and 24 MiB, pruned on writes, with a 30-day expiration.
Browser quota and storage policies may impose additional limits.

PDF.js and its matching worker remain pinned to pdfjs-dist 4.10.38 and load from jsDelivr only
when a PDF needs rendering. The original certificate is fetched from your website.
If PDF.js or the PDF is unavailable, the original Open PDF link remains accessible.

### Replacing a PDF

Persistent previews must be invalidated if a PDF is replaced at the same path. Change the
previewVersion field of that document entry in content.js:

```js
{
  type: "document",
  src: "assets/images/certificate_robocup_portugal.pdf",
  previewVersion: 2,
  label: "RoboCup Portugal certificate",
  caption: "RoboCup Portugal certificate"
}
```

The default previewVersion is 1. Increment it each time that PDF changes. Changing the src path
or adding a new query version also creates a new cache key. To invalidate all previews together,
change CACHE_REVISION in pdf-cache.js. Changing the JavaScript ?v value alone does not invalidate
stored PDF preview blobs. Expired entries are ignored, and stale stored entries are pruned on writes.

### Optional static preview

The existing preview field remains supported. If you later provide a compressed static WebP,
set preview: "assets/images/certificate_robocup_portugal.webp" in its document entry.
That image displays directly and requires no PDF.js processing; the original PDF link stays in
its caption. This example WebP is not a supplied/required file. If it fails to load, the code
tries the cached/generated PDF image instead.

## Expanded description width

Removed the max-width limit from .modal-description and its paragraphs. Both now use 100% of
the modal panel's available width. There is no document sidebar, keyword chip section, reserved
second column, or remaining 78ch/800px description cap.
Dialog order remains title, gallery, caption/controls, full-width description, optional project link.

## About alignment

About stays stacked on phones. At ordinary desktop widths it uses the label/text split.
From 1600px, its content moves farther right; from 2400px, it occupies the right half of the
container. The about heading and paragraph no longer have the narrow fixed line-width caps.
The content fills its right-side grid column and ends at the right container edge.
This responds to CSS viewport width, including changes caused by browser zoom.

## Hackathons and hobbies

The grouped NOS hackathons card is now in Highlights, together with Parliament, outreach and ICARSC.
Highlights uses one column, two from 640px, and four from 1800px, so the four cards form balanced rows.
Beyond Robotics is restored to hiking/running and volleyball only, in one or two columns.
The existing hackathons description and both certificates are unchanged in content.js.

Experience stays as two text-only clickable role cards, opening SocRob and Quidgest.
The three LOLA navigation videos remain in FOMO-HODOR. Academic merit links remain in Education.
All other expanded content and media stay in the unchanged content.js from the previous revision.

## Local check

From your repository root:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000. Test the first PDF visit, move away and return to it, then reload
and return again. In Developer Tools > Application > IndexedDB, look for
rodrigo-portfolio-pdf-previews and its previews store. A cache hit should not request that PDF
or invoke PDF.js again. The library may still load if another uncached certificate needs it.
Verify the Open PDF caption link still opens the original.

Check 320, 375, 768, 1024, 1440, 1920, 2560 and 3840 CSS-pixel widths, phone landscape, browser zoom,
both themes, keyboard navigation, Escape, focus restoration and actual video playback.
Check full-width dialog descriptions and the About position on wide or zoomed-out layouts.
Commit and publish through your usual GitHub Pages workflow; this update has not changed GitHub remotely.

## Source-level verification

Node syntax checks passed for app.js and pdf-cache.js. HTML IDs, control references and script order
were checked. A simulated DOM and mocked PDF.js/IndexedDB test covered memory reuse, persistent reuse
across a new cache instance, request deduplication, preview-version invalidation, JPEG fallback,
the two-render concurrency limit, 11 dialog fixtures and 31 media fixtures, gallery revisits,
close/focus behaviour and first-page-only rendering.
These checks do not verify actual browser layout, real CDN availability, PDF decoding or video codecs.
