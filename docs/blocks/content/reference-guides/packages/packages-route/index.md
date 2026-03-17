---
title: "@wordpress/route"
slug: "packages-route"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-route/"
generatedAt: 2025-12-30T18:18:38.964Z
---

Routing utilities for WordPress admin interfaces, providing a shared instance of TanStack Router.

## [Installation](#installation)

Install the module:

```bash
npm install @wordpress/route --save
```

## [Usage](#usage)

This package provides a shared instance of TanStack Router to ensure consistent routing across WordPress admin interfaces.

### [Public API](#public-api)

The following hooks and components are available for use in routes:

```js
import { Link, useNavigate, useParams, useRouter, useSearch } from '@wordpress/route';

function MyRoute() {
    const params = useParams();
    const navigate = useNavigate();
    const search = useSearch();

    return (
        <div>
            <Link to="/other-route">Go to other route</Link>
            <button onClick={() => navigate({ to: '/somewhere' })}>
                Navigate
            </button>
        </div>
    );
}
```

### [Private API](#private-api)

The boot package uses private APIs for router setup. These should not be used by individual routes.

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose.

To find out more about contributing to this package or Gutenberg as a whole, please read the [project’s main contributor guide](https://github.com/WordPress/gutenberg/blob/HEAD/CONTRIBUTING.md).
