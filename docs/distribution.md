# Distribution and update mechanics

`@burritolabs/ui` is the only hand-maintained source for Burrito tokens, theme runtime, chain identities, brand primitives, and delivery assets.

Consumers must pin either a released semantic version or an immutable Git commit. They must never copy and hand-edit the theme runtime or token file. Runtime CDN styling is prohibited.

## Upgrade procedure

1. Change and validate the canonical package and increment its semantic version.
2. Commit and push the canonical package.
3. Update every consumer to the same immutable version or commit.
4. Run product build, type, lint, test, and rendered theme checks.
5. Commit each product separately so a theme rollout can be reverted without reverting unrelated product work.

Until a registry release exists, the supported install form is:

```json
"@burritolabs/ui": "github:BurritoLabs/burrito-design-system#<immutable-commit>"
```
