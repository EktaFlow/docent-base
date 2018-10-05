# Docent front-end ionic application

**Quick Instructions:**
1. Install dependencies:
sudo apt install git nodejs npm

2. get code: 
git clone https://github.com/EktaFlow/docent-base.git
cd docent-base 

3. Install code dependencies:
npm install

(note that some systems needs these three lines executed independently)
sudo npm install -g cordova
sudo npm install -g ionic
npm install node-sass

4. Configure src/services/constants.js:
export const DocentStorageAccount =  "example-storage-account"
export const SAS                  = "example-connecting-string"
export const BackUrl              =  "http://localhost:4000"

5. Build and/or run
ionic build
ionic serve

