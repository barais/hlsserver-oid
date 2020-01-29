# Run docker container

```bash
sudo docker-compose up
```

# Create user

```bash
sh ./createuser.sh
```


# Clean everything

```bash
sudo docker-compose down
sudo docker volume rm keycloak_postgres_data
# and restart at step one
```


