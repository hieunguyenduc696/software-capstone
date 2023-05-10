# Keycloak

## To run keycloak with docker

### Requirement

- Install Docker:
  - For Window: https://docs.docker.com/desktop/install/windows-install/
  - For Mac: https://docs.docker.com/desktop/install/mac-install/
  - For Linux: https://docs.docker.com/desktop/install/linux-install/

### Start keycloak service:

- Run command:

```
cd .\keycloak\
docker compose up
```

- After keycloak start success in **first times**:

  - Access to keycloak with url `{host}:{port} //localhost:8080`
  - Click to `Administration Console >` to login
  - Login with account: \
     `username: admin` \
     `password: admin@keycloak`
  - Add new realm: `Master` -> `Add realm` -> fill realm name -> `Create`
  - In `Realm Settings` click to `Themes` tab and select `project-capstones` in dropdown of Login Themes and `Save`

- After first times just run command:

```
cd .\keycloak\
docker compose up
```

## Custom login screen

- Edit css in `.project-capstones/login/resource/css/login.css`
- Edit html in `./project-capstones/login/login.ftl` and `./project-capstones/login/template.ftl`

After custom html ans css run command:

```
cd .\keycloak\
docker compose up
```

And check Login screen
