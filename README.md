Zombiejs-test
------------

Try zombie, and with cucumberjs sometimes.

## install dependencies

```
npm install
npm install -g mocha
npm install -g cucumber
```

## start the server

In one shell:

    node app/app.js

to start a server.

## run the zombiejs tests

zombiejs tests are inside `test` dir. 

In another shell

```
mocha
```

It will run all the zombiejs tests only.

## run the cucumberjs tests

cucumberjs tests are inside `features` dir.

Run in shell:

```
cucumber.js
```

It will run the cucumber tests only.
