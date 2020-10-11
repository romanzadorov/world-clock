# clock

Variation of Analog and Digital clocks

# deploy to GitHub Pages:

1. Add to package.json:
   a. scripts: "deploy": "gh-pages -d dist"
   b. dependencies: "gh-pages": "^3.1.0"
2. Add to angular.json -> build -> options -> :
   a. "outputPath": "dist",
   b. "baseHref": "/world-clock/"

3. npm i

4. Make the repository Public
5. ng build
6. npm run deploy
