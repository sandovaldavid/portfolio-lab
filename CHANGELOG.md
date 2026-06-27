# Changelog

## [1.3.1-beta.0](https://github.com/sandovaldavid/portfolio/compare/v1.3.0-beta.0...v1.3.1-beta.0) (2026-06-27)


### Bug Fixes

* add a4 page setup for print styles ([#92](https://github.com/sandovaldavid/portfolio/issues/92)) ([cdd269e](https://github.com/sandovaldavid/portfolio/commit/cdd269e8027840b773837bede019a3d3f68a8a54))


### Performance

* add [@defer](https://github.com/defer) for heavy widgets on homepage ([#89](https://github.com/sandovaldavid/portfolio/issues/89)) ([c676fd6](https://github.com/sandovaldavid/portfolio/commit/c676fd6d72fc90c11759c46a0d9940bacfe0edb1))
* optimize project images and remove dead asset ([#90](https://github.com/sandovaldavid/portfolio/issues/90)) ([15d256e](https://github.com/sandovaldavid/portfolio/commit/15d256e8c1c7a3eafe18784b1313c744a8abd7ec))

## [1.3.0-beta.0](https://github.com/sandovaldavid/portfolio/compare/v1.2.1-beta.0...v1.3.0-beta.0) (2026-06-27)


### Features

* **hero:** replace generic typewriter with real metrics ([#83](https://github.com/sandovaldavid/portfolio/issues/83)) ([7c6a864](https://github.com/sandovaldavid/portfolio/commit/7c6a8649ca7483ed0cf2ab7ae5984c5c711ac98a))


### Bug Fixes

* **a11y:** add skip link and improve aria-labels ([#84](https://github.com/sandovaldavid/portfolio/issues/84)) ([1efcd8b](https://github.com/sandovaldavid/portfolio/commit/1efcd8b89baf33f7e2766b0783add594a56ece2b))
* **notes:** integrate katex for latex rendering ([#87](https://github.com/sandovaldavid/portfolio/issues/87)) ([6e15cb4](https://github.com/sandovaldavid/portfolio/commit/6e15cb426a48e1ece00553089ba5ad741c602c61))
* **security:** add security headers and pwa manifest ([#86](https://github.com/sandovaldavid/portfolio/issues/86)) ([7677cb2](https://github.com/sandovaldavid/portfolio/commit/7677cb25231cffc50710cdb972ecddc31295d7c2))

## [1.2.1-beta.0](https://github.com/sandovaldavid/portfolio/compare/v1.2.0-beta.0...v1.2.1-beta.0) (2026-06-27)


### Bug Fixes

* **pages:** add 404 catch-all and note error state ([#82](https://github.com/sandovaldavid/portfolio/issues/82)) ([3ec778a](https://github.com/sandovaldavid/portfolio/commit/3ec778a903ce5dd0a378e15d6d374634681e9ab6))
* **resume:** resolve style hover contrast and add animations ([#81](https://github.com/sandovaldavid/portfolio/issues/81)) ([df2190f](https://github.com/sandovaldavid/portfolio/commit/df2190f45810e631f886c3632f956b41811ffef0))

## [1.2.0-beta.0](https://github.com/sandovaldavid/portfolio/compare/v1.1.0-beta.0...v1.2.0-beta.0) (2026-06-23)


### Features

* **skills:** update competency domains and layout ([#71](https://github.com/sandovaldavid/portfolio/issues/71)) ([50eaa1b](https://github.com/sandovaldavid/portfolio/commit/50eaa1bc9620b816e71a23d9a0411a344069dc28))


### Refactoring

* **style:** move duplicate inline svgs to assets ([#78](https://github.com/sandovaldavid/portfolio/issues/78)) ([5fa95c2](https://github.com/sandovaldavid/portfolio/commit/5fa95c2b6b4390981c18843f66f9cad5646e8609))

## [1.1.0-beta.0](https://github.com/sandovaldavid/portfolio/compare/v1.0.0-beta.0...v1.1.0-beta.0) (2026-06-20)


### Features

* **resume:** add interactive resume builder page ([ef398d2](https://github.com/sandovaldavid/portfolio/commit/ef398d26a0d3ca666f93554a7bb06076ba4f04e3))


### Bug Fixes

* **resume:** apply audit fixes — a11y, data integrity, tests, content ([55fc8f1](https://github.com/sandovaldavid/portfolio/commit/55fc8f1196244ae03af0a73fd746d443279f3786))


### Refactoring

* **experience:** move experience-item component to dedicated folder ([32d1261](https://github.com/sandovaldavid/portfolio/commit/32d1261ece140196485bb92558db70bf760c3685))
* **mode-switcher:** separate terminal-switcher styles and add spec ([b25eb4d](https://github.com/sandovaldavid/portfolio/commit/b25eb4d2c9c05c2cb189755ab544b2181a751cf7))
* **project:** move project-card component to dedicated folder ([35a23ca](https://github.com/sandovaldavid/portfolio/commit/35a23cad63d6b2545e6d98f87fbdf9242fd2ce5b))
* **resume:** isolate subcomponents ([4e84098](https://github.com/sandovaldavid/portfolio/commit/4e8409860c8aeacd9e7c915fb6400a43c891fdf4))
* **resume:** isolate subcomponents and update tsconfig ([#70](https://github.com/sandovaldavid/portfolio/issues/70)) ([a6a33bc](https://github.com/sandovaldavid/portfolio/commit/a6a33bc57e4d10d60818ba45deca310957f2a311))
* **resume:** separate resume component template ([23ff97c](https://github.com/sandovaldavid/portfolio/commit/23ff97cc9e087da299efbf9d2ee5a9ba26ebe6f7))
* **utility-panel:** fix component structure and naming ([995ff7e](https://github.com/sandovaldavid/portfolio/commit/995ff7ec6f7914c452ebe417aa2bea27b68302f5))
* **widgets:** un-nest chaos-playground and star-ledger widgets ([29d4305](https://github.com/sandovaldavid/portfolio/commit/29d430557b5fe62de92bdb28d851623cebd957f5))

## [1.0.0](https://github.com/sandovaldavid/portfolio/compare/v0.9.9...v1.0.0) (2026-06-19)


### ⚠ BREAKING CHANGES

* first public release of the portfolio, establishing the v1.0 feature set including the automated release pipeline, security patches, and CodeQL compliance.

### Features

* launch devsandoval.me portfolio v1.0 ([c8e3f1a](https://github.com/sandovaldavid/portfolio/commit/c8e3f1a7b69d25c47e256c28dd21d1ae9b9e0d17))
* **release:** configure bump-minor-pre-major for v1.0.0 target ([73d64a9](https://github.com/sandovaldavid/portfolio/commit/73d64a9397f3fff7ce08bc7b3acd4a12a942b85f))


### Bug Fixes

* **ci:** correct lighthouse and playwright CI configuration ([692ae83](https://github.com/sandovaldavid/portfolio/commit/692ae8339433bb60bf0db417a7ec343f0b3bc982))
* **deploy:** add --yes flag to vercel deploy command ([2ab2c34](https://github.com/sandovaldavid/portfolio/commit/2ab2c34ab01c6ede11fb1142d99169978cba3c39))
* **deploy:** remove vercel pull to prevent triggering automatic deployments ([aab89cc](https://github.com/sandovaldavid/portfolio/commit/aab89ccbe9a27549925d93d1ca0fdb488a767c9e))
* **deps:** use @lhci/cli instead of lighthouse-ci ([a7122ee](https://github.com/sandovaldavid/portfolio/commit/a7122ee73029bab8e902a109fdad3994b7df8837))
* disable vercel automatic builds completely ([9a4eedf](https://github.com/sandovaldavid/portfolio/commit/9a4eedf26ad7153ed83fc614634c980f3cbda967))
* **test:** exclude e2e from vitest, add a11y and responsive checks to playwright ([2a702de](https://github.com/sandovaldavid/portfolio/commit/2a702de4c91727cc368d479d5d2e08b9b9683769))
* **tests:** resolve jsdom window.scrollTo errors ([4433948](https://github.com/sandovaldavid/portfolio/commit/4433948d98d8e7f22e435abc44f2506f9c983d11))
* **vercel:** disable automatic deployments using official git config ([75fc7fa](https://github.com/sandovaldavid/portfolio/commit/75fc7fa3bd211d5d13ed6bfea2c2906a09f9edc5))
* **vercel:** include pnpm-lock.yaml for reproducible builds ([f3a6618](https://github.com/sandovaldavid/portfolio/commit/f3a6618557822dab56d3984a61cd8c5362f0ad2b))
* **vercel:** include pnpm-lock.yaml for reproducible builds ([f3babef](https://github.com/sandovaldavid/portfolio/commit/f3babef2afd149ebbaa6fdfab4a09a19e7d00d1f))
* **vercel:** remove src and vite.config from ignore, keep only build artifacts ([822e5e3](https://github.com/sandovaldavid/portfolio/commit/822e5e3ab9b70bec3d3cbe6052e0518a224fa7dd))


### Documentation

* **claude:** add branch strategy and update CI pipeline description ([e1161fb](https://github.com/sandovaldavid/portfolio/commit/e1161fb5ae1333c982a4975f2d3a617f7e52780e))
* fix github username references from devsandoval to sandovaldavid ([906c738](https://github.com/sandovaldavid/portfolio/commit/906c738c6e380b3b96a623b8037d3edeb6e55c94))

## [1.0.0-beta.0](https://github.com/sandovaldavid/portfolio/compare/v0.9.10-beta.0...v1.0.0-beta.0) (2026-06-19)


### ⚠ BREAKING CHANGES

* first public release of the portfolio, establishing the v1.0 feature set including the automated release pipeline, security patches, and CodeQL compliance.

### Features

* launch devsandoval.me portfolio v1.0 ([c8e3f1a](https://github.com/sandovaldavid/portfolio/commit/c8e3f1a7b69d25c47e256c28dd21d1ae9b9e0d17))
* **release:** configure bump-minor-pre-major for v1.0.0 target ([73d64a9](https://github.com/sandovaldavid/portfolio/commit/73d64a9397f3fff7ce08bc7b3acd4a12a942b85f))


### Bug Fixes

* **ci:** correct lighthouse and playwright CI configuration ([692ae83](https://github.com/sandovaldavid/portfolio/commit/692ae8339433bb60bf0db417a7ec343f0b3bc982))
* **deploy:** add --yes flag to vercel deploy command ([2ab2c34](https://github.com/sandovaldavid/portfolio/commit/2ab2c34ab01c6ede11fb1142d99169978cba3c39))
* **deploy:** remove vercel pull to prevent triggering automatic deployments ([aab89cc](https://github.com/sandovaldavid/portfolio/commit/aab89ccbe9a27549925d93d1ca0fdb488a767c9e))
* **deps:** use @lhci/cli instead of lighthouse-ci ([a7122ee](https://github.com/sandovaldavid/portfolio/commit/a7122ee73029bab8e902a109fdad3994b7df8837))
* disable vercel automatic builds completely ([9a4eedf](https://github.com/sandovaldavid/portfolio/commit/9a4eedf26ad7153ed83fc614634c980f3cbda967))
* **test:** exclude e2e from vitest, add a11y and responsive checks to playwright ([2a702de](https://github.com/sandovaldavid/portfolio/commit/2a702de4c91727cc368d479d5d2e08b9b9683769))
* **tests:** resolve jsdom window.scrollTo errors ([4433948](https://github.com/sandovaldavid/portfolio/commit/4433948d98d8e7f22e435abc44f2506f9c983d11))
* **vercel:** disable automatic deployments using official git config ([75fc7fa](https://github.com/sandovaldavid/portfolio/commit/75fc7fa3bd211d5d13ed6bfea2c2906a09f9edc5))
* **vercel:** include pnpm-lock.yaml for reproducible builds ([f3a6618](https://github.com/sandovaldavid/portfolio/commit/f3a6618557822dab56d3984a61cd8c5362f0ad2b))
* **vercel:** include pnpm-lock.yaml for reproducible builds ([f3babef](https://github.com/sandovaldavid/portfolio/commit/f3babef2afd149ebbaa6fdfab4a09a19e7d00d1f))
* **vercel:** remove src and vite.config from ignore, keep only build artifacts ([822e5e3](https://github.com/sandovaldavid/portfolio/commit/822e5e3ab9b70bec3d3cbe6052e0518a224fa7dd))


### Documentation

* **claude:** add branch strategy and update CI pipeline description ([e1161fb](https://github.com/sandovaldavid/portfolio/commit/e1161fb5ae1333c982a4975f2d3a617f7e52780e))
* fix github username references from devsandoval to sandovaldavid ([906c738](https://github.com/sandovaldavid/portfolio/commit/906c738c6e380b3b96a623b8037d3edeb6e55c94))

## [0.9.10](https://github.com/sandovaldavid/portfolio/compare/v0.9.9...v0.9.10) (2026-06-19)


### Bug Fixes

* **ci:** correct lighthouse and playwright CI configuration ([692ae83](https://github.com/sandovaldavid/portfolio/commit/692ae8339433bb60bf0db417a7ec343f0b3bc982))
* **deploy:** add --yes flag to vercel deploy command ([2ab2c34](https://github.com/sandovaldavid/portfolio/commit/2ab2c34ab01c6ede11fb1142d99169978cba3c39))
* **deploy:** remove vercel pull to prevent triggering automatic deployments ([aab89cc](https://github.com/sandovaldavid/portfolio/commit/aab89ccbe9a27549925d93d1ca0fdb488a767c9e))
* **deps:** use @lhci/cli instead of lighthouse-ci ([a7122ee](https://github.com/sandovaldavid/portfolio/commit/a7122ee73029bab8e902a109fdad3994b7df8837))
* disable vercel automatic builds completely ([9a4eedf](https://github.com/sandovaldavid/portfolio/commit/9a4eedf26ad7153ed83fc614634c980f3cbda967))
* **test:** exclude e2e from vitest, add a11y and responsive checks to playwright ([2a702de](https://github.com/sandovaldavid/portfolio/commit/2a702de4c91727cc368d479d5d2e08b9b9683769))
* **tests:** resolve jsdom window.scrollTo errors ([4433948](https://github.com/sandovaldavid/portfolio/commit/4433948d98d8e7f22e435abc44f2506f9c983d11))
* **vercel:** disable automatic deployments using official git config ([75fc7fa](https://github.com/sandovaldavid/portfolio/commit/75fc7fa3bd211d5d13ed6bfea2c2906a09f9edc5))
* **vercel:** include pnpm-lock.yaml for reproducible builds ([f3a6618](https://github.com/sandovaldavid/portfolio/commit/f3a6618557822dab56d3984a61cd8c5362f0ad2b))
* **vercel:** include pnpm-lock.yaml for reproducible builds ([f3babef](https://github.com/sandovaldavid/portfolio/commit/f3babef2afd149ebbaa6fdfab4a09a19e7d00d1f))
* **vercel:** remove src and vite.config from ignore, keep only build artifacts ([822e5e3](https://github.com/sandovaldavid/portfolio/commit/822e5e3ab9b70bec3d3cbe6052e0518a224fa7dd))


### Documentation

* **claude:** add branch strategy and update CI pipeline description ([e1161fb](https://github.com/sandovaldavid/portfolio/commit/e1161fb5ae1333c982a4975f2d3a617f7e52780e))
* fix github username references from devsandoval to sandovaldavid ([906c738](https://github.com/sandovaldavid/portfolio/commit/906c738c6e380b3b96a623b8037d3edeb6e55c94))

## Changelog
