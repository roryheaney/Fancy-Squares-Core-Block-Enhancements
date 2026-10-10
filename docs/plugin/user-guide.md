# User Guide

## Editor Usage

### Token class selectors

The **Visibility / Position Classes** panel exposes curated utility-style tokens. Use **Show Values** to toggle between labels and raw class values.

### Width Settings (`core/column`)

- Width classes emit tokens like `wp-block-column--column-6` or `wp-block-column--column-md-4`.
- `Auto` stores `auto` in the width attribute and does not emit a width class.
- `Inherit` clears the width attribute.

Breakpoints:

- Base: All
- Sm: `>=576px`
- Md: `>=768px`
- Lg: `>=992px`
- Xl: `>=1200px`
- Xxl: `>=1400px`

When any child column has custom width values, parent `core/columns` is auto-updated with `is-style-bootstrap`. When no widths are set, that class is removed.

### Columns Layout Presets (`core/columns`)

The **Columns Layout Presets** panel applies common responsive layouts to the current child columns. Choose a preset and select **Apply layout preset** to set each child column's Width Settings once.

Preset applications update child column Width Settings once. Individual child columns remain editable afterward.

Presets:

- `1 mobile / 2 md+`: sets Base to 12 columns and Md+ to 6 columns.
- `1 mobile / 3 md+`: sets Base to 12 columns and Md+ to 4 columns.
- `1 mobile / 4 md+`: sets Base to 12 columns and Md+ to 3 columns.
- `1 mobile / 2 md / 4 lg+`: sets Base to 12 columns, Md to 6 columns, and Lg+ to 3 columns.

Applying a preset clears non-declared breakpoint width values so the selected layout carries upward.

**Reset columns** clears all width attributes on every child column. Reset removes applied widths so columns revert to default equal-width behavior. After reset, the parent `is-style-bootstrap` class is removed automatically when no child widths remain custom.

### Spacing controls

Padding, margin, and negative margin panels appear only for blocks configured in `BLOCK_CONFIG`.

- Positive spacing examples: `pt-3`, `ms-lg-4`
- Negative spacing uses `-n`: `mt-n2`

### Block-specific toggles

- List Settings: adds list semantics to `core/columns` and `core/column`
- Media Settings: lazy video loading, custom play overlay, forced image lazy-loading opt-out
- Cover embed background: for `core/cover`, enable **Use embed background** and paste a YouTube/Vimeo URL to replace native cover media
- Cover reduced motion: for native video Covers, **Support reduced motion** appears directly below **Lazy Load Video** in **Cover Settings**, defaults to enabled, and can be disabled independently for each Cover
- Modal Settings: converts `core/button` into a modal trigger

### RichText span format

Use the **Span** toolbar button to apply inline utility classes and optional text/background colors. Unknown existing classes/styles are preserved.

## Supported Blocks

Core blocks:

- `core/heading`
- `core/paragraph`
- `core/list`
- `core/list-item`
- `core/buttons`
- `core/columns`
- `core/column`
- `core/cover`
- `core/group`
- `core/video` (filter/toggle features)
- `core/button` (modal trigger conversion)
- `core/image` (lazy loading behavior + opt-out)

Custom blocks (`fs-blocks/*`) are disabled by default and can be enabled in settings.

## Output Behavior

### Cover video accessibility

Native `core/cover` background videos receive a keyboard-accessible **Pause video / Play video** button. The decorative video has `tabindex="-1"` and `aria-hidden="true"`; the button stays available when playback is paused. Image backgrounds, ordinary content videos, nested block videos, and iframe embeds are not modified by this feature.

Select a Cover with a native video background and open **Cover Settings**. **Support reduced motion** appears directly below **Lazy Load Video** and is enabled by default for each Cover, including existing Covers without an explicit setting:

- The frontend filter removes autoplay before the browser parses the video and preserves its original autoplay intent in a data attribute. Saved video HTML and the existing core `poster` attribute are unchanged; the per-block setting is stored as the boolean `supportReducedMotion` block attribute.
- With `prefers-reduced-motion: reduce`, the video remains stopped and displays its existing poster until the visitor chooses **Play video**. This also applies when the video source is lazy-loaded.
- Without reduced motion, videos originally configured for autoplay start normally, subject to browser autoplay restrictions. Videos without autoplay remain stopped.
- Visitors can explicitly play or pause regardless of their motion preference. Pausing freezes the current frame; it does not restore the poster after playback has started.
- Enabling reduced motion while the page is open pauses playback. Disabling that visitor preference does not automatically resume playback; the visitor can choose **Play video**.
- With JavaScript disabled and this setting enabled, autoplay remains off and the existing poster stays visible. The JavaScript-powered button is hidden.
- The plugin does not generate a poster or substitute the post's featured image. Use the Cover block's existing **Set poster image** option. Without a poster, no fallback image is supplied.

**Per-block rollback:** select the Cover, switch off **Support reduced motion** in **Cover Settings**, and save/update the page or template containing it. Reload the frontend and clear any page/CDN cache that serves old HTML. This restores the previous autoplay behavior and disables preference-change handling for that Cover only, while retaining the pause/play button and decorative-video attributes. Other Covers are unaffected. Re-enable the toggle and save to restore support; no asset rebuild is needed.

There is no sitewide reduced-motion checkbox in **Settings > Fancy Squares Blocks**. The previously introduced sitewide option is no longer read; this control belongs to each Cover's block settings. The toggle is hidden for image backgrounds and embed mode, retaining its value if the Cover later returns to a native video background.

WordPress already supports [Cover video poster images](https://wordpress.org/documentation/article/cover-block/#set-poster-image-for-videos). Its installed Cover save implementation emits autoplay for native video backgrounds; this plugin adds preference-aware frontend handling rather than another poster setting. The preference is exposed by the browser through [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

### Carousel reduced motion

Carousels automatically respect `prefers-reduced-motion`; there is no new block toggle or global option. Swiper 11.1.1's bundled A11y module provides labels, roles, focus handling, and announcements, but does not automatically suppress motion based on this preference.

- With reduced motion, autoplay-configured carousels initialize paused before any autoplay starts. Manual navigation and pagination use instant transitions, including fade-mode carousels.
- A **Play** control is available for autoplay-configured carousels even if **Show Play/Pause Button** is off. Once revealed for reduced motion, it stays available for that page session. With normal motion on initial load, the editor's visibility setting is preserved.
- Explicit **Play** starts the originally configured autoplay, retaining its delay. **Pause** stops it; hover, mouse leave, and manual navigation do not restart a paused carousel.
- Enabling reduced motion while browsing stops autoplay and changes future transitions to instant. Disabling reduced motion restores the configured transition speed but does not restart autoplay. Choose **Play** to resume.
- Carousels with autoplay disabled remain manual and do not gain a Play/Pause control. Reduced motion still makes their transitions instant.
- The Play/Pause icon and accessible label follow the playback intent. Swiper's wrapper announcements are `off` while autoplay runs and `polite` when it stops.

To verify in Firefox, set the Number preference `ui.prefersReducedMotion` to `1` in `about:config`, then reload. Expect no autoplay, a Play control, and instant manual navigation. Set it to `0` and reload to check normal behavior; reset the preference afterward to follow the operating system again.

### Accordion reduced motion

Accordions automatically respect `prefers-reduced-motion`; no new block setting or global option is required.

- With reduced motion, opening and closing panels have no height transition. Their completion callbacks run immediately instead of waiting for `transitionend` or the 450 ms fallback.
- Existing active-item state, classes, keyboard navigation, focus behavior, and show/hide event cancellation are preserved. The `shown.fs.accordion` and `hidden.fs.accordion` completion events still fire.
- The preference is checked for each transition. Changes while browsing apply to subsequent interactions; normal-motion visitors retain the existing 0.35-second height animation and transition fallback.
- Rapid toggles and switching between panels do not retain a temporary `collapsing` state after a reduced-motion interaction completes.

To verify, enable reduced motion in the operating system or set Firefox's `ui.prefersReducedMotion` Number preference to `1`, then open, close, and switch accordion panels. Expect immediate completion, correct expanded state, and unchanged keyboard navigation. Set it to `0` to compare the normal animation.

### Other output behavior

- `generateClassName()` composes token, spacing, and width classes.
- `core/image` and cover background images are forced to `loading="lazy"` + `decoding="async"` unless `disableForcedLazyLoading` is set.
- `core/cover` embed mode (`useEmbedBackground`) supports YouTube and Vimeo only, normalizes YouTube to `youtube-nocookie.com`, and enforces autoplay/loop/muted non-interactive iframe background behavior.
- Carousel uses Swiper assets only when carousel blocks render.
- Frontend style/runtime bundles load conditionally based on rendered content.

For full asset-loading details, use [frontend-assets-and-classes.md](frontend-assets-and-classes.md).
