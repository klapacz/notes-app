# Notes app

## Generate keys

```sh
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
```

## Generate password

```sh
npx bcrypt-util hash "your-password"
```

## Run 

```sh
export BASE_URL=/base-url/
export PORT=8080

npm run build
npm run start
```
