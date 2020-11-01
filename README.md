# clock

Variation of Analog and Digital clocks

# deploy to GitHub Pages:

1. Add to package.json:
   a. scripts:
   "deploy": "gh-pages -d dist",
   "start": "ng serve -o --port 3001",
   "build": "ng build --configuration=production",
   b. dependencies: "gh-pages": "^3.1.0"
2. Add to angular.json -> build -> options -> :
   a. "outputPath": "dist",
   b. "baseHref": "/world-clock/"
   c. "assets": [
   "src/favicon.ico",
   "src/assets",
   "src/404.html"
   ],

3. Add 404.html file
4. Add script to index.html for Github Pages hack to allow SPA refresh without receiving 404.

5. npm i

6. Make the repository Public
7. Set the gh-pages branch to /root
8. ng build
9. npm run deploy
