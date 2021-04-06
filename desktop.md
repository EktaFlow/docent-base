# get the codebase
`git clone https://github.com/EktaFlow/docent-base.git`
`cd docent-base`

# updating existing build
If you're just updating the build and/or want to see new code in the app, take this shortcut and skip to the "open capacitor" section below.
`ionic build`

`npm cap copy @capacitor-community/electron`

`npm cap open @capacitor-community/electron`


# install app dependencies and update ionic (it/s ionic/cli now)
`npm install`

If you run into errors about unresolvable dependencies, you can try:
`npm config set legacy-peer-deps true`
`npm --legacy-peer-deps i`

# build
`ionic build`

# run ionic to test that it works
`ionic serve` #open browser to localhost:8100 or whatever port your system defaults to

# install capacitor
`npm i @capacitor-community/electron`

# open capacitor
`npx cap open @capacitor-community/electron`

or just simply:
`npx cap open electron`

If you run into errors about the SUID sandbox, you should see a message saying `/path/to/chrome-sandbox` needs proper permissions.
Try this: 
`sudo chown root /path/to/chrome-sandbox`
`sudo chmod 4755 /path/to/chrome-sandbox`

Verify correctness with:
`ls -alh /path/to/chrome-sandbox`


# test 
At this point you should see the application window as an electron app. Click around and make sure it works.

If you hit dependency errors or see a white screen only, you may need additional required packages:
`npm i @types/fs-extra`
`npm i ngx-electron`
`npm i @capacitor-community/electron`

You may also need to edit `electron/preloader.js` and put in the absolute path for `electron-bridge.js`

It may also be necessary to set electron as the build target
`npx cap add electron`

# build executable
Make sure to substitute "11.1.0" with your installed version of electron
`electron-packager ./ --platform=win32 --arch=x64 --electron-version=11.1.0`

# test executable
`cd docent-v4-win32-x64`

## linux 
`wine docent-v4.exe`

## mac

## windows
`docent-v4.exe`

