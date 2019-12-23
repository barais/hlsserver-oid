# hlsserver-oid


curl -X POST \
  http://localhost:8080/auth/realms/demo/protocol/openid-connect/token \
  -d 'username=user&password=password&grant_type=urn:ietf:params:oauth:grant-type:uma-ticket&client_id=nodejs-apiserverweb'


curl -X POST \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d 'grant_type=client_credentials&client_id=nodejsdemo&client_secret=6d44fd6e-982f-4e9d-9d18-ef95cd064bc2' \
    "http://localhost:8080/auth/realms/demo/protocol/openid-connect/token"

 curl \
  -d "client_id=nodejsdemoweb" \
  -d "username=user" \
  -d "password=password" \
  -d "grant_type=password" \
  "http://localhost:8080/auth/realms/demo/protocol/openid-connect/token" | jq -r '.access_token'
  