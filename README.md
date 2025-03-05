# Fancy-Squares-Core-Block-Enhancements

# Extend Core Blocks & Create Custom Variations

This plugin file (`extend-core-blocks-variations.js`) demonstrates how to:

1. **Extend** specific WordPress core blocks with additional attributes and custom Inspector controls.  
2. **Inject** those attributes into both the block’s editor preview and final saved output.  
3. **Register** custom variations of each block that replace the default core version in the inserter (i.e. `isDefault: true`).

## How It Works

1. **Allowed Blocks**  
   We specify which blocks to target by name:  

   ```js
   const ALLOWED_BLOCKS = [
     'core/heading',
     'core/paragraph',
     'core/list',
     'core/list-item',
     'core/buttons',
   ];
   ```

   Only these blocks are extended or receive custom variations.

2. **New Attributes**  
   - The code hooks into `blocks.registerBlockType` to add six arrays of “token” classes (`displayClasses`, `marginClasses`, `paddingClasses`, `positionClasses`, `zindexClasses`, `blendModeClasses`), plus one “unique dropdown” attribute (e.g. `headingDropdownValue`).
   - Each block thus gets extra fields in the block attributes object.

3. **Inspector Controls**  
   - We create a higher-order component (HOC) `withExtendedInspectorControls` that inserts custom controls into the **Inspector panel**.  
   - These controls let users select from Bootstrap classes (via `FormTokenField`) and pick a “unique dropdown” option (via `SelectControl`).

4. **Editor Preview Classes**  
   - In the editor, we add a filter on `editor.BlockListBlock` to merge the chosen arrays of classes into the block’s wrapper. This ensures users see a live preview of their selected classes and dropdown options.

5. **Final Saved Classes**  
   - Another filter on `blocks.getSaveContent.extraProps` merges these classes into the output’s `className` attribute for the frontend. That way, the same tokens appear in the published content.

6. **Variations**  
   - For each block, we register a **custom variation** with `isDefault: true`, which **replaces** the original core block in the inserter. This means when you insert (for example) a Heading block, you get our variation by default.  
   - Each variation is given a unique name (like `heading-custom`), a distinctive title (like **Heading (Custom)**), and default attributes (`headingDropdownValue: 'none'`).

## Usage

1. **Include / Enqueue This File**  
   - In your plugin or theme, enqueue this JS file (or import it into your main build). Make sure it loads in the Block Editor context (usually via `enqueue_block_editor_assets` in PHP or a build system).

2. **Adjust Classes & Options**  
   - If you want different token classes or drop-down options, edit the arrays in `../data/bootstrap-classes/classes.js` or modify the local `BLOCK_DROPDOWN_CONFIG`.

3. **Add or Remove Blocks**  
   - Update `ALLOWED_BLOCKS` to target only the blocks you want to extend.  
   - If you no longer need a certain block variation, remove or comment out its entry in `BLOCK_VARIATIONS`.

4. **Confirm Your Custom Default**  
   - By setting `isDefault: true`, the original block is hidden in the inserter, replaced by your custom version. If you want both the original core block and yours, remove `isDefault: true`.

## Key Files & Code Sections

- **`ALLOWED_BLOCKS`** – The core blocks to extend.  
- **`BLOCK_DROPDOWN_CONFIG`** – Dropdown attribute config per block (key, label, default, options).  
- **Filters**:
  - `blocks.registerBlockType` – Injects new attributes into each block.  
  - `editor.BlockEdit` – Adds custom Inspector controls for those attributes.  
  - `editor.BlockListBlock` – Applies classes in the editor preview.  
  - `blocks.getSaveContent.extraProps` – Applies classes to saved output.  
- **`BLOCK_VARIATIONS`** – Defines and registers custom variations that become the new defaults in the inserter.

## Extensibility & Maintenance

- **Easily Expand**: Add more blocks to `ALLOWED_BLOCKS`, more attribute arrays (e.g., for typography or color classes), or new panels in the Inspector.  
- **Performance**: Filters are only applied to the blocks listed in `ALLOWED_BLOCKS`, so overhead is minimal.  
- **Conflict Prevention**: Each variation has a unique `name` property to avoid React “key” collisions. The code also uses `'none'` instead of `''` for the “Select one” option, preventing duplication warnings.
