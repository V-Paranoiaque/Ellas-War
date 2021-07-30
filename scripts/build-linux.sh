docker run --rm -ti -v $(pwd):/root/ew -w /root/ew \
           -v $(pwd)/res/electron/build-pipeline-linux.json:/root/ew/build.json \
           -ti ew-build \
           sh -c "npm install && \
                  node_modules/.bin/ng build --configuration=mobile && \
                  cordova platform add electron@2; cordova build electron"
