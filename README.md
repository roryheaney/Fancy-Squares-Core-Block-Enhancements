# Fancy-Squares-Core-Block-Enhancements

## Extend Core Blocks & Create Custom Variations

This plugin file (`index.js`) demonstrates how to:

1. **Extend** specific WordPress core blocks with additional attributes and custom Inspector controls.
2. **Inject** those attributes into both the block’s editor preview and final saved output.
3. **Register** custom variations of each block that replace the default core version in the inserter (i.e., `isDefault: true`).
4. **Lazy Load** media and add accessible list roles to column blocks.

## How It Works

1. **Allowed Blocks**\
   We specify which blocks to target by name:

   ```js
   const ALLOWED_BLOCKS = [
     'core/heading',
     'core/paragraph',
     'core/list',
     'core/list-item',
     'core/buttons',
     'core/column',
   ];
   ```

   Only these blocks are extended or receive custom variations. Notably, `core/column` has been added to support custom width controls.

2. **New Attributes**

   - The code hooks into `@10up/block-components` `registerBlockExtension` to add six arrays of “token” classes (`displayClasses`, `marginClasses`, `paddingClasses`, `positionClasses`, `zindexClasses`, `blendModeClasses`), plus one “unique dropdown” attribute (e.g., `headingDropdownValue`).
   - Additional attributes for `core/column` include breakpoint-specific widths (`widthBase`, `widthSm`, etc.).
  - Column blocks also include an `isList` toggle to enable accessible list semantics.
  - Columns blocks feature a `isConstrained` toggle that applies a `wp-block-columns--constrained` class for responsive max widths.
   - `core/video` and `core/cover` blocks gain a `lazyLoadVideo` attribute to defer loading until scrolled into view.
   - Padding and margin attributes are dynamically generated for all sides (All, Horizontal, Vertical, Top, Right, Bottom, Left) and breakpoints (Base, Sm, Md, Lg, Xl), such as `paddingAllBase`, `marginTopMd`, `negativeMarginLeftXl`.
   - Each block thus gets extra fields in the block attributes object.

3. **Inspector Controls**

   - We create a `BlockEdit` component that inserts custom controls into the **Inspector panel**.
   - These controls let users select from Bootstrap classes (via `FormTokenField`) and pick a “unique dropdown” option (via `SelectControl`).
   - For `core/column`, custom width controls allow setting Bootstrap column classes (e.g., `col-6`, `col-md-4`) across breakpoints.
   - Column blocks include a toggle to add list semantics to the markup.
   - Video and Cover blocks provide a **Lazy Load Video** toggle.
   - Padding controls provide range inputs to apply padding classes (e.g., `p-3`, `pt-md-2`) for each side and breakpoint.
   - Margin controls are split into positive and negative margins:
     - Positive margins range from `0` to `5` with a "None" option (e.g., `m-3`, `ms-md-2`).
     - Negative margins range from `-5` to `0` (e.g., `m-n3`, `mt-lg-n2`).

4. **Editor Preview Classes**

   - In the editor, the `classNameGenerator` function in `utils/helpers.js` merges the chosen arrays of classes, width, padding, and margin settings into the block’s wrapper. This ensures users see a live preview of their selected classes and dropdown options.

5. **Final Saved Classes**

   - The same `classNameGenerator` function ensures these classes are applied to the block’s `className` attribute in the saved output, so the same tokens appear in the published content.

6. **Variations**

   - For each block, we register a **custom variation** with `isDefault: true`, which **replaces** the original core block in the inserter. This means when you insert (for example) a Heading block, you get our variation by default.
   - Each variation is given a unique name (like `heading-custom`), a distinctive title (like **Heading (Custom)**), and default attributes (`headingDropdownValue: 'none'`).

7. **Performance Enhancements**

   - Images are output with `loading="lazy"` and `decoding="async"` attributes.
   - Videos can be lazy loaded with the Inspector toggle; an IntersectionObserver script sets `src` when the video enters the viewport.
   - Column blocks can opt into accessible list markup.

## Usage

1. **Include / Enqueue This File**

   - In your plugin or theme, enqueue the editor build (`index.js`) and the front-end script (`frontend.js`). The editor script should load in the Block Editor context (usually via `enqueue_block_editor_assets`), while `frontend.js` runs on the public site.

2. **Adjust Classes & Options**

   - If you want different token classes or dropdown options, edit the files in `data/bootstrap-classes/` or modify the local `BLOCK_DROPDOWN_CONFIG` in `config/blockConfig.js`.
   - Only the options defined for a block in `BLOCK_CONFIG` will display controls in the editor. Refer to the commented example at the bottom of `config/blockConfig.js` when adding a new block.

3. **Add or Remove Blocks**

   - Update `ALLOWED_BLOCKS` in `config/blockConfig.js` to target only the blocks you want to extend.
   - If you no longer need a certain block variation, remove or comment out its entry in `BLOCK_VARIATIONS`.

4. **Confirm Your Custom Default**

   - By setting `isDefault: true`, the original block is hidden in the inserter, replaced by your custom version. If you want both the original core block and yours, remove `isDefault: true`.

5. **Insert and Edit Blocks**

   - When you insert a block (such as a heading, paragraph, or column), your custom variation is the default.
   - Use the **Inspector Controls** to:
     - Apply Bootstrap classes via `FormTokenField` (e.g., display, margin, padding, position, z-index, blend mode).
     - Set a unique dropdown option (e.g., text alignment).
     - For `core/column`, adjust width settings across breakpoints.
     - Set padding and margins (positive and negative) for each side and breakpoint.
   - To apply inline styling, select some text and click the “Span” toolbar button. A modal will open where you can choose Bootstrap classes and set text/background colors.
   - After applying, the `<span>` is saved with the chosen classes and inline styles. When you re-open the modal for that span, your previous selections are repopulated for editing.

## Key Files & Code Sections

- `ALLOWED_BLOCKS` (`config/blockConfig.js`) – The core blocks to extend.
- `BLOCK_DROPDOWN_CONFIG` (`config/blockConfig.js`) – Dropdown attribute config per block (key, label, default, options).
- `BLOCK_CONFIG` (`config/blockConfig.js`) – Configuration for block-specific settings (class options, dropdown, width controls).
- **Registration**:
  - `registerExtensions.js` – Registers each block extension using `@10up/block-components`.
  - `block-enhancements.js` – Adds list role and lazy video options via block filters.
  - `lazyVideos.js` – Handles IntersectionObserver logic for deferred video sources.
  - `index.js` – Entry point for editor scripts.
  - `frontend.js` – Entry point for front-end behavior such as lazy video loading.
- **Components** (`components/`):
  - `BlockEdit.js` – Main component for rendering InspectorControls.
  - `WidthControl.js` – Custom width controls for `core/column`.
  - `PaddingControl.js` – Range inputs for padding settings.
  - `PositiveMarginControl.js` – Range inputs for positive margins.
  - `NegativeMarginControl.js` – Range inputs for negative margins.
- **Utilities** (`utils/`):
  - `helpers.js` – Utility functions like `generateAttributes` (dynamically creates padding/margin attributes) and `generateClassName` (generates Bootstrap classes for preview and output).
- **Constants** (`config/`):
  - `constants.js` – Centralized definitions for padding and margin side types (`PADDING_SIDE_TYPES`, `MARGIN_SIDE_TYPES`, `NEGATIVE_MARGIN_SIDE_TYPES`).
- `span-format.js` (`formats/`):
  - Registers the custom RichText format (`fs/span`) that wraps text in an inline `<span>` with user-defined classes and inline styles.
  - Uses a modal-based interface with multiple `<FormTokenField>` controls and two color pickers for text and background colors.
  - Ensures attributes are properly registered so that saved content is parsed back into the modal for editing.
- **Assets** (`assets/`):
  - `inc/assets.php` – Enqueues editor and front-end scripts and styles.
  - `icons/` – Contains icons for breakpoints (desktop, laptop, tablet, mobile) used in width controls.
- **PHP Render Filters** (`inc/render-filters/`):
  - `inc/render-filters.php` – Loads all individual filter files.
  - Individual files like `image.php` and `lazy-video.php` modify specific block markup.
  - Modify block HTML on the server to add lazy loading and list roles.

## Extensibility & Maintenance

- **Easily Expand**:
  - Add more blocks to `ALLOWED_BLOCKS` in `config/blockConfig.js`.
  - Add more attribute arrays (e.g., for typography or color classes) by extending `generateAttributes` in `utils/helpers.js`.
  - Add new panels or controls in `BlockEdit.js` or create new components in `components/`.
- **Performance**: Extensions are only applied to blocks listed in `ALLOWED_BLOCKS`, so overhead is minimal.
- **Conflict Prevention**: Each variation has a unique `name` property to avoid React “key” collisions. The code also uses `'none'` instead of `''` for the “Select one” option, preventing duplication warnings.
- **Modularity**:
  - Utility functions (`generateAttributes`, `generateClassName`) reduce code duplication.
  - Centralized constants (`PADDING_SIDE_TYPES`, `MARGIN_SIDE_TYPES`) in `config/constants.js` make updates easier.
  - Separated UI components (`WidthControl`, `PaddingControl`, `PositiveMarginControl`, `NegativeMarginControl`) improve maintainability.
  - Bootstrap option sets are broken into individual files under `data/bootstrap-classes/` for easier updates.

## Known Issues

- **Bootstrap Style for Columns**: Ensure the parent block of `core/column` is set to the "Bootstrap" style to prevent unexpected column breaking. A button in the width controls allows users to set this style.
- **Negative Margins**: Negative margins do not have a "None" option; resetting them requires setting a positive margin to "None" (which clears the attribute).

## License

This project is licensed under the GPL-2.0-or-later license, as it is a WordPress plugin.
