# Cookie Watch
Third-Party Cookie Test Suite 

[Cookie Watch](https://cookie.danielp.xyz/) is a testbed for third-party cookies that I created for my master thesis in IT Security at the Ruhr University of Bochum. 

### Setup
Dependencies: rollup, @rollup/plugin-terser

1. Clone the repository
2. Change occurencies of cross-site domain in `const.js`, `basics.js`, and `index.html`
3. Build Docker ENV:
```shell
# inside docker compose file folder
touch .env
python3 -c "import secrets; print(f'DB_USER=\'root\'\nDB_PASS=\'{secrets.token_hex()}\'')" > .env

# confirm creation
cat .env
```
4. Build Flask ENV:
```shell
# inside flask root folder
mkdir instance
touch instance/config.py
python3 -c "import secrets; print(f'SECRET_KEY=\'{secrets.token_hex()}\'')" > instance/config.py

# confirm creation
cat instance/config.py
```
5. Get certs and update in `nginx/nginx.conf` and `docker-compose.prod.yml`
6. Run `docker-compose -f docker-compose.prod.yml up -d --build`
