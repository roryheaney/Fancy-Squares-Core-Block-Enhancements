---
title: "The Commands Data"
slug: "data-core-commands"
source: "https://developer.wordpress.org/block-editor/reference-guides/data/data-core-commands/"
generatedAt: 2025-12-30T18:17:20.659Z
---

Namespace: `core/commands`.

## [Selectors](#selectors)

### [getCommandLoaders](#getcommandloaders)

Returns the registered command loaders.

_Parameters_

*   _state_ `Object`: State tree.
*   _contextual_ `boolean`: Whether to return only contextual command loaders.

_Returns_

*   `import('./actions').WPCommandLoaderConfig[]`: The list of registered command loaders.

### [getCommands](#getcommands)

Returns the registered static commands.

_Parameters_

*   _state_ `Object`: State tree.
*   _contextual_ `boolean`: Whether to return only contextual commands.

_Returns_

*   `import('./actions').WPCommandConfig[]`: The list of registered commands.

### [getContext](#getcontext)

Returns whether the active context.

_Parameters_

*   _state_ `Object`: State tree.

_Returns_

*   `string`: Context.

### [isOpen](#isopen)

Returns whether the command palette is open.

_Parameters_

*   _state_ `Object`: State tree.

_Returns_

*   `boolean`: Returns whether the command palette is open.

## [Actions](#actions)

### [close](#close)

Closes the command palette.

_Returns_

*   `Object`: action.

### [open](#open)

Opens the command palette.

_Returns_

*   `Object`: action.

### [registerCommand](#registercommand)

Returns an action object used to register a new command.

_Parameters_

*   _config_ `WPCommandConfig`: Command config.

_Returns_

*   `Object`: action.

### [registerCommandLoader](#registercommandloader)

Register command loader.

_Parameters_

*   _config_ `WPCommandLoaderConfig`: Command loader config.

_Returns_

*   `Object`: action.

### [unregisterCommand](#unregistercommand)

Returns an action object used to unregister a command.

_Parameters_

*   _name_ `string`: Command name.

_Returns_

*   `Object`: action.

### [unregisterCommandLoader](#unregistercommandloader)

Unregister command loader hook.

_Parameters_

*   _name_ `string`: Command loader name.

_Returns_

*   `Object`: action.
