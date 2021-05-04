#sh scripts/build-cordova.sh
mv src/index.html src/index.html.save
mv src/index-cordova.html src/index.html

ng build --prod

mv src/index.html src/index-cordova.html
mv src/index.html.save src/index.html
