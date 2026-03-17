---
title: "ExternalLink"
slug: "external-link"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/external-link/"
generatedAt: 2025-12-30T18:16:22.675Z
---

Link to an external resource.

## [Usage](#usage)

```jsx
import { ExternalLink } from '@wordpress/components';

const MyExternalLink = () => (
    <ExternalLink href="https://wordpress.org">WordPress.org</ExternalLink>
);
```

## [Props](#props)

The component accepts the following props. Any other props will be passed through to the `a`.

### [children: ReactNode](#children-reactnode)

The content to be displayed within the link.

*   Required: Yes

### [href: string](#href-string)

The URL of the external resource.

*   Required: Yes
