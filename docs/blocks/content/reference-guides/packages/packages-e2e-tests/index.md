---
title: "@wordpress/e2e-tests"
slug: "packages-e2e-tests"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-tests/"
generatedAt: 2025-12-30T18:18:05.573Z
---

This package contains test plugins and mu-plugins used by E2E tests in WordPress.

**Note**: The E2E tests themselves have been migrated to Playwright and are now located in `/test/e2e/`.

## [Contents](#contents)

*   `/plugins/` – Test plugins used by E2E tests
*   `/mu-plugins/` – Must-use plugins for test environment configuration
*   `/assets/` – Test assets (images, etc.)

## [Usage](#usage)

These plugins and mu-plugins are automatically loaded in the test environment via `wp-env`. They provide test fixtures and functionality needed for various E2E test scenarios.

For information about writing E2E tests, see the [E2E testing guide](https://github.com/WordPress/gutenberg/tree/HEAD/docs/contributors/code/e2e/README.md).

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
