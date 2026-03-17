---
title: "WithSpokenMessages"
slug: "with-spoken-messages"
source: "https://developer.wordpress.org/block-editor/reference-guides/components/with-spoken-messages/"
generatedAt: 2025-12-30T18:17:15.469Z
---

## Usage

```jsx
import { withSpokenMessages, Button } from '@wordpress/components';

const MyComponentWithSpokenMessages = withSpokenMessages(
    ( { speak, debouncedSpeak } ) => (
        <div>
            <Button
                variant="secondary"
                onClick={ () => speak( 'Spoken message' ) }
            >
                Speak
            </Button>
            <Button
                variant="secondary"
                onClick={ () => debouncedSpeak( 'Delayed message' ) }
            >
                Debounced Speak
            </Button>
        </div>
    )
);
```
