# Security Policy — Team Jura Atlas

## Supported code

The maintained development line is `atlas-7-dev`. `main` is the existing production branch. Historical releases and legacy explorers are not independently supported; fixes may be incorporated into the current line.

## Report vulnerabilities privately

**Do not open a public issue containing an exploit, secret, private user data or reproduction steps that would expose users.**

Use GitHub's **Report a vulnerability** / private security advisory for the repository, if available: <https://github.com/jyates0125/leonida-explorer/security/advisories/new>. If the feature is not enabled, contact the repository maintainer through a private channel before disclosing technical details. We have not published an email address in this policy. Ordinary non-sensitive defects can use [Issues](https://github.com/jyates0125/leonida-explorer/issues).

Please include affected URL/branch and commit, browser/device, minimal steps to reproduce, expected impact and a suggested mitigation, **without posting active credentials or someone else's private data**. Maintainers will review reports as they are available; no unverified response-time commitment is made.

## Architecture and security boundaries

- Static browser-side site. No account/password feature or Rockstar sign-in is offered. User progress is stored in browser local storage; users should export backups before resetting browsers.
- GTA VI claims and community maps are not trusted authoritative location or security data.
- Map tile and data providers are separate trust and licensing boundaries; do not treat third-party map text as code instructions.
- Never commit `.env` files, secrets, tokens, raw private exports, access credentials, or non-redistributable research files.
- A secret or sensitive dataset is **not private** just because it resides on an unlinked web route or a preview branch in a public repository.
- Preview branches/URLs require real access controls if used for sensitive research. A public web page titled "Research" is not a private Research Lab.

### Repo settings for maintainers

Under **Settings → Security / Code security and analysis**, inspect availability of secret scanning, push protection, Dependabot alerts/security updates and private vulnerability reporting. Some features depend on plan or repository settings. Under **Settings → Branches / Rules**, enable applicable protections for `main`, require reviewed PRs and successful tests. These settings must be activated by the repository owner; adding this file does not activate them automatically.
