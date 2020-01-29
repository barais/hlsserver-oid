

java -cp keycloak-admin-cli-8.0.1.jar org.keycloak.client.admin.cli.KcAdmMain create users -s username=test -s enabled=true -r demo  --no-config --server http://localhost:8080/auth --realm master --user admin --password admin 
java -cp keycloak-admin-cli-8.0.1.jar org.keycloak.client.admin.cli.KcAdmMain  set-password -r demo --username test --new-password password --no-config --server http://localhost:8080/auth --realm master --user admin --password admin 
