# Ellas War

Ellas War is an online Video Game started in 2007. The action takes place approximately to -500 during the Golden Age of ancient Greece. When we have migrated the frontend from AngularJS to Angular, we have decided to release it under a free license. Officially supported languages are English and French, but we are open to contributions.

## Development

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Because of CSR problems you might be able to connect only to the development server.

### Running tests

Run `ng test --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Scan with SonarQube

To scan the code and export the results to SonarQube, run `npm run sonar`.

## Production

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `www/` directory. Use the `--configuration=production` flag for the web version and `--configuration=mobile` for the mobile version.

### Supported platforms

| Platform | Supported | Details | Google Auth | In App purchases |
| ------------- |:-------------:| ----- |:-----:|:-----:|
| Android | :white_check_mark: | Cordova | :white_check_mark: | :x: |
| AppImages | :white_check_mark: | Cordova + Electron | :white_check_mark: | :x: |
| Flatpack | :white_check_mark: | Cordova + Electron | :white_check_mark: | :x: |
| iOS | :ballot_box_with_check: | Cordova | :white_check_mark: | :x: |
| MacOS | :ballot_box_with_check: | Cordova + Electron | :white_check_mark: | :x: |
| Snap | :white_check_mark: | Cordova + Electron | :white_check_mark: | :x: |
| Web | :white_check_mark: | | :white_check_mark: | :white_check_mark: |
| Windows | :white_check_mark: | Cordova + Electron | :white_check_mark: | :x: |

It's possible to build the project for more platforms using Electron, for more information check the [Cordova documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/electron/index.html).

### Stores
- [Amazon Store](https://www.amazon.fr/Virgil-Ellas-War/dp/B079CHD5BX)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.ellaswar.ewnextmobile)
- [Microsoft Store](https://www.microsoft.com/p/ellas-war/9p12xq81l3qp)
- [Pling Store](https://www.pling.com/p/1891540)
- [Snapcraft](https://snapcraft.io/ellaswar)

## Contributions
Any contributions you make are greatly appreciated. To ease the contribution process, we ask to each contributor to assign copyright to the project.
