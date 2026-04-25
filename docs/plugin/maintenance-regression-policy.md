# Maintenance and Regression Policy

This policy is mandatory for every feature, fix, refactor, and documentation update in this plugin.

## Required End-of-Task Gate

Run this command before finalizing any update:

`npm run regression:gate`

## Directory-to-Check Matrix

| Touched Path | Required Validation |
| --- | --- |
| `src/**` | `npm run regression:gate` (includes duplicate detection fail + complexity warning checks across plugin code files) |
| `inc/**` | `npm run regression:gate` |
| `data/**` | `npm run regression:gate` |
| `docs/**` | `npm run regression:gate` |
| `README.md` | `npm run regression:gate` |

## Pass/Fail Policy

- Fail if lint/build/regression gate commands fail.
- Fail if duplicate-code findings are detected across plugin code files as a whole (`*.js`, `*.jsx`, `*.php`, `*.scss`, `*.mjs`), excluding build/generated/docs paths.
- Warn (non-blocking) on complexity hotspots across plugin code files as a whole (`*.js`, `*.jsx`, `*.php`, `*.scss`, `*.mjs`), excluding build/generated/docs paths.

### Scope Exclusions (Code-Quality Scan)

The duplicate/complexity scan excludes:

- `build/**`
- `node_modules/**`
- `docs/**`
- `src/config/generated/**`
- `src/styles/generated/**`
- `data/bootstrap-classes/generated-spacing-options.js`

## Reporting Evidence Format

Agents must report:

1. Commands run (exact command names).
2. Final status for each command (`PASS`, `FAIL`, or `PASS_WITH_WARNINGS`).
3. Any warnings (especially complexity warnings), even when overall gate passes.
4. Any duplicate-code failures with file references and why they failed the gate.
