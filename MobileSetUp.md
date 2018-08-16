Mobile Setup:

Once the App is set up (from the docent github setup steps)

1. run  ``` ionic cordova platform add ios ```
2. Open docent-v1.xcodeproj file in platforms/ios
3. Go into XCode > Preferences > Accounts and connect your appleID
  - if it does not prompt you, the + sign in the bottom left corner will let you add it
4. Click on the main app - docent-v1 to get into the general settings of the app.
5. In the signing portion, you want Automatic signing to be on
6. Select your apple ID as your team
7. In the Identity portion make the bundle identifier io.ionic.docent-v1
8. In the command line run ``` ionic cordova build ios --prod ```
9. Plug in your iphone with a USB cable.
10. Back in XCode select your phone as the Device you want the app to run on. It should be the first item on the list.
11. Run the app by hitting the play button in XCode
12. Your phone will ask you to trust the application before it launches, so you need to go to Settings > General  > Device Management and you should see your apple ID and tap to trust it.
13. Run the app again through XCode.

****
Extra
1. If you do not want to connect your iphone you do not have to code sign anything but you can use a simulator in XCode and it still will have errors.

2. The way I was checking errors, or looking through errors, was Safari Developer Tools.
  a. In Safari > Preferences > Advanced, at the bottom of the window check the box for 'Show Developer menu in menu bar'
  b. When the app is running, go to Safari and in the menu develop on the menu bar, you are looking for your computer's name.
  c. If you hover over that it should show the docent-v1 app with localhost and index.html as subtitles to it.
  d. Click on that and you will get a window with debugging tools. When I saw the error, the one time, it came up there.
