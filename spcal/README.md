## Custom Deploy:
`npm install --production`  \n
`meteor build ../target/ --architecture os.linux.x86_64`
***
## Run Application on Server:
`export PORT=3000`  \n
`export MONGO_URL='mongodb://localhost:27017/meteor'`  \n
`export ROOT_URL='http://localhost:3000'`  \n
`node main.js`
***
## Start mongodb on Server:
`mongod --dbpath data/db/ --fork --logpath log/mongod.log`
