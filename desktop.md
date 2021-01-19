# get the codebase
`git clone https://github.com/EktaFlow/docent-base.git`
`cd docent-base`

# install app dependencies and update ionic (it/s ionic/cli now)
`npm install`
`sudo npm uninstall -g ionic`
`sudo npm i -g @ionic/cli`

# fix sass dependency issue
`yarn remove node-sass`
`npm install node-sass@4.14.1`

# build
`ionic build`

#run ionic to test that it works
`ionic serve` #open browser to localhost:8100 or whatever port your system defaults to

#install electron
`sudo npm install -g electron-windows-store`
`sudo npm install -g electron-packager --save-dev`

# fix electron - can't remember exact command and not in history :(
# something like the command below, but if build fails it will tell you exactly what to do
`chmod 4744 /usr/lib/node_modules/electron/something/chrome-sandbox`

# build executable
`electron-packager ./ --platform=win32 --arch=x64 --electron-version=11.1.0`

# test executable
`cd docent-v4-win32-x64`
`wine docent-v4.exe`
