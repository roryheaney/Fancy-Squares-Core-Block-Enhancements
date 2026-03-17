---
title: "@wordpress/sync"
slug: "packages-sync"
source: "https://developer.wordpress.org/block-editor/reference-guides/packages/packages-sync/"
generatedAt: 2025-12-30T18:18:41.892Z
---

Sync data between multiple peers and persist in a local database.

## [Installation](#installation)

Install the module

```bash
npm install @wordpress/sync --save
```

## [API](#api)

### [CRDT\_DOC\_META\_PERSISTENCE\_KEY](#crdt_doc_meta_persistence_key)

CRDT documents can hold meta information in a map. This map exists only in memory and is not synced or persisted. This key can be used to indicate that a (temporary) document has been loaded from persistence.

### [CRDT\_RECORD\_MAP\_KEY](#crdt_record_map_key)

Root-level key for the CRDT document that holds the entity record data.

### [createSyncManager](#createsyncmanager)

The sync manager orchestrates the lifecycle of syncing entity records. It creates Yjs documents, connects to providers, creates awareness instances, and coordinates with the `core-data` store.

### [LOCAL\_EDITOR\_ORIGIN](#local_editor_origin)

Origin string for CRDT document changes originating from the local editor.

### [LOCAL\_SYNC\_MANAGER\_ORIGIN](#local_sync_manager_origin)

Origin string for CRDT document changes originating from the sync manager.

### [WORDPRESS\_META\_KEY\_FOR\_CRDT\_DOC\_PERSISTENCE](#wordpress_meta_key_for_crdt_doc_persistence)

WordPress meta key used to persist the CRDT document for an entity.

### [Y](#y)

Exported copy of Yjs so that consumers of this package don’t need to install it.

## [Contributing to this package](#contributing-to-this-package)

This is an individual package that’s part of the Gutenberg project. The project is organized as a monorepo. It’s made up of multiple self-contained software packages, each with a specific purpose. The packages in this monorepo are published to [npm](https://www.npmjs.com/) and used by [WordPress](https://make.wordpress.org/core/) as well as other software projects.

To find out more about contributing to this package or Gutenberg as a whole, please read the project’s main [contributor guide](https://github.com/WordPress/gutenberg/tree/HEAD/CONTRIBUTING.md).
