# Every target installs dependencies when needed.

node_modules: package.json package-lock.json
	npm install
	@touch node_modules

.PHONY: dev build install test clean

dev: node_modules
	npx astro dev

# Static site lands in dist/.
build: node_modules
	npx astro build

# Static site: "installing" means deploying dist/ to notes.frombruno.com via Vercel.
install: build
	npx vercel deploy --prod

test: node_modules
	npx astro check
	npx astro build

clean:
	rm -rf dist .astro
