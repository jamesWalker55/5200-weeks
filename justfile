build:
    just js
    just css

js:
    bun build src/index.ts --outfile dist/index.js
js-watch:
    bun build src/index.ts --outfile dist/index.js --watch

css:
    bun build src/index.css --outfile dist/index.css
css-watch:
    bun build src/index.css --outfile dist/index.css --watch
