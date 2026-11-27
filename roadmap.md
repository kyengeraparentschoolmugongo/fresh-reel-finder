# Translated movie artwork
- [x] Merge uploaded artwork and append the five Luo streams without changing any of the original 1,099 identities.
- [x] Add catalog and artwork-failure regression tests; verify real Wikipedia fallback and exhausted-provider placeholders on phone and desktop.
- [ ] Obtain artwork for the remaining 12 streams — blocked by absent thumbnails in the supplied catalog; placeholders remain intentional.

# Offline import checks
- [x] Restore document-link repair and page-item baking helpers and run the Python suite.

# GitHub sync safeguards
- [x] Run all synchronization preservation checks and inspect the manual review-branch workflow; publishing tooling remains unchanged.

# Document layouts
- [x] Inspect existing document grid/list layouts on desktop and 360px mobile; no overflow or layout defect found, so preserve the existing appearance.
- [x] Run document browsing, filtering, viewing, and metadata regression tests.

# Movie navigation and featured layout
- [x] Clear the fixed navigation on the featured carousel at mobile and desktop sizes.
- [x] Link movie category headings to dedicated browsing pages with all available category titles.
- [x] Verify category navigation and the featured layout in the browser and run movie regression tests.

# Bottom navigation
- [x] Add Library, Entertainment, Theme, and Help tabs across the app.
- [x] Simplify top headers, preserve installation/search and WhatsApp behavior, and verify phone/desktop layouts.

# Page-switching feedback
- [ ] Add pending tab feedback, intent preloading, movie placeholders, and a root-level progress bar.
- [ ] Verify delayed and cached navigation on mobile and desktop and run navigation tests.
