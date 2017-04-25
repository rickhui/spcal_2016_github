## Custom Deploy:
`npm install --production`
`meteor build ../target/ --architecture os.linux.x86_64`
***
## Run Application on Server:
`export PORT=3000`
`export MONGO_URL='mongodb://localhost:27017/meteor'`
`export ROOT_URL='http://localhost:3000'`
`node main.js`
***
## Start mongodb on Server:
`mongod --dbpath data/db/ --fork --logpath log/mongod.log`
