---
title: "@wordpress/stylelint-config"
slug: "packages-stylelint-config"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-stylelint-config/"
generatedAt: 2025-12-30T18:18:40.894Z
---

[stylelint](https://stylelint.io/) configuration rules to ensure your CSS is compliant with the [WordPress CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/).

## [Installation](#installation)

```bash
$ npm install @wordpress/stylelint-config --save-dev
```

**Note**: This package requires Node.js version with long-term support status (check [Active LTS or Maintenance LTS releases](https://nodejs.org/en/about/previous-releases)). It is not compatible with older versions.

## [Usage](#usage)

If you’ve installed `@wordpress/stylelint-config` locally within your project, just set your `stylelint` config to:

```json
{
    "extends": "@wordpress/stylelint-config"
}
```

If you’ve globally installed `@wordpress/stylelint-config` using the `-g` flag, then you’ll need to use the absolute path to `@wordpress/stylelint-config` in your config:

```json
{
    "extends": "/absolute/path/to/@wordpress/stylelint-config"
}
```

## [Presets](#presets)

In addition to the default preset, there is also a SCSS preset and 2 stylistic variant presets.

### [SCSS](#scss)

This preset extends both `@wordpress/stylelint-config` and [`stylelint-config-recommended-scss`](https://github.com/kristerkari/stylelint-config-recommended-scss).

```json
{
    "extends": [ "@wordpress/stylelint-config/scss" ]
}
```

### [Stylistic](#stylistic)

This preset extends `@wordpress/stylelint-config` and adds stylistic rules such as `indentation`.

```json
{
    "extends": [ "@wordpress/stylelint-config/stylistic" ]
}
```

### [SCSS Stylistic](#scss-stylistic)

This preset extends`@wordpress/stylelint-config`, `@wordpress/stylelint-config/stylistic` and `@wordpress/stylelint-config/scss`, and adapts some stylistic rules for SCSS.

```json
{
    "extends": [ "@wordpress/stylelint-config/scss-stylistic" ]
}
```

## [Extending the config](#extending-the-config)

Simply add a `"rules"` key to your config and add your overrides there.

For example, to change the `indentation` to four spaces and turn off the `number-leading-zero` rule:

```json
{
    "extends": "@wordpress/stylelint-config/stylistic",
    "rules": {
        "@stylistic/indentation": 4,
        "@stylistic/number-leading-zero": null
    }
}
```

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
