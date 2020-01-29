#! /bin/bash
export KEYCLOAKIPRESOLVE=`ping -q -c 1 -t 1 $KEYCLOAKIP | grep PING | sed -e "s/).*//" | sed -e "s/.*(//"`
echo $KEYCLOAKIPRESOLVE
node app.js >  keycloak.json
npm start
