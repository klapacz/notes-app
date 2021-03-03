# Notes app

## Setup env

```sh
cp .env.example .env

# Generate SECRET
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Run 

```sh
npm run build
npm run start
```
