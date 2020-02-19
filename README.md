#Docent Base
>
> The front end application built with ionic.

----
## Dependencies

* Android studio
* Ionic
* Cordova
* Node.js
* TypeScript
* npm
* java jdk 8

----
## Installation 
1. git clone https://github.com/EktaFlow/docent-base.git cd docent-base
2. npm install
3. npm install -g cordova ionic (alternative use system package manager for installing these system wide.)
4. Install Android studio + jdk8

### For local testing purposes
>
> Configure src/services/constants.js: 

> 1. export const DocentStorageAccount = "example-storage-account" 
> 2. export const SAS = "example-connecting-string" 
> 3. export const BackUrl = "http://localhost:4000/"

> Configure config.xml

> Modify config.xml: widget id="com.ionic.docent"

----

## Usage 
### Build for android/ios
> ionic build

### Build for Desktop Electron
> TODO

### Run
> ionic serve

----
## Additional Notes
* Active dev branch -> add/2018-deskbook
* add/2018-deskbook is the branch used for ios build & android.
* desktop builds require a different branch.
