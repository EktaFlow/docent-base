# Docent Base

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

> Configure src/services/constants.js: 

> 1. export const DocentStorageAccount = "example-storage-account" 
> 2. export const SAS = "example-connecting-string" 
> 3. export const BackUrl = "http://localhost:4000/"

> Configure config.xml

> Modify config.xml: widget id="com.ionic.docent"

### E2E Testing

> run: npm run cypress

----

## Preparation
> 1. Restore any modifications to config.xml

## Usage 
### Build for android

> Read: https://ionicframework.com/docs/v3/intro/deploying/

### Build for Desktop Electron
> 1. Navigate to  docent-base project folder.
> 2. Run ionic build which will generate new static files in docent-base/www
> 3. Download: https://docentpublic.blob.core.windows.net/desktop-docent/docent201.zip
> 5. Unzip into location of choice.
> 6. copy & overwrite content of docent-base/www into unzipped electron app docent/resources/app/www

### Run
> ionic serve

----
## Additional Notes
* Active dev branch -> add/2018-deskbook
* add/2018-deskbook is the branch used for ios build & android.
* desktop builds require a different branch.
