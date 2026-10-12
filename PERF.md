# Performance Clinic

## 1. Hero Image Optimization

- **Symptom:** The page's hero image was large and contributed to the initial loading cost.
- **How I found it:** Used Lighthouse to inspect page performance and identify the large hero image.
- **Root cause:** The original PNG image was approximately 4.17 MiB, increasing the amount of image data the browser needed to download.
- **Fix:** Converted the image to WebP, reducing its file size to approximately 188 KB. Updated the image reference to use the optimized file.
- **Before / after:** Image size reduced from approximately 4.17 MiB to 188 KB (about 95% smaller). Initial Lighthouse baseline: Performance 66, LCP 4.9 seconds. Post-optimization Lighthouse results are pending.

## 2. Live Ticker Timer Cleanup

- **Symptom:** Repeatedly opening and closing the live ticker could leave previous intervals running.
- **How I found it:** Inspected the ticker's `openTicker()` and `closeTicker()` functions.
- **Root cause:** The interval created by `setInterval()` was not cleared when the ticker panel was removed.
- **Fix:** Stored the interval ID and called `clearInterval()` when closing the ticker.
- **Before / after:** Before, the timer continued after closing the panel. After, the timer is explicitly cleared on close. A quantitative runtime benchmark has not been recorded.

## 3. Activity Counts During Scrolling

- **Symptom:** The scroll handler repeatedly scanned activity events to count calls for the focused minute.
- **How I found it:** Inspected the `onScroll()` implementation and identified repeated filtering of the activity dataset.
- **Root cause:** The same per-minute counts were recalculated instead of being reused.
- **Fix:** Precomputed call counts by UTC minute in `callsByMinute` and reused the lookup in `onScroll()`.
- **Before / after:** Before, each relevant lookup filtered the activity array. After, it uses a precomputed object lookup. A quantitative runtime benchmark has not been recorded.

## Validation

- Verified that the live ticker could be opened, closed, and reopened.
- Re-run Lighthouse after the changes to record the final Performance score and LCP.
- Check the browser console and verify search, scrolling, and ticker behavior before submission.
