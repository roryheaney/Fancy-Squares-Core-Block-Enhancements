---
title: "NavigateRegions"
slug: "navigate-regions-2"
source: "https://developer.wordpress.org/block-editor/reference-guide/components/higher-order/navigate-regions/"
generatedAt: 2025-12-30T18:19:07.818Z
---

`navigateRegions` is a React [higher-order component](https://facebook.github.io/react/docs/higher-order-components.html) adding keyboard navigation to switch between the different DOM elements marked as “regions” (role=”region”). These regions should be focusable (By adding a tabIndex attribute for example). For better accessibility, these elements must be properly labelled to briefly describe the purpose of the content in the region. For more details, see “Landmark Roles” in the [WAI-ARIA specification](https://www.w3.org/TR/wai-aria/) and “Landmark Regions” in the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/).

## [Example:](#example)

```jsx
import { navigateRegions } from '@wordpress/components';

const MyComponentWithNavigateRegions = navigateRegions( () => (
    <div>
        <div role="region" tabIndex="-1" aria-label="Header">
            Header
        </div>
        <div role="region" tabIndex="-1" aria-label="Content">
            Content
        </div>
        <div role="region" tabIndex="-1" aria-label="Sidebar">
            Sidebar
        </div>
    </div>
) );
```

## [Notes:](#notes)

It’s important to note that an ARIA `role="region"` is an ARIA landmark role. It should be reserved for sections of content sufficiently important to have it listed in a summary of the page. Only use this ARIA role for the main sections of a page. All perceivable content should reside in a semantically meaningful landmark in order that content is not missed by the user.
