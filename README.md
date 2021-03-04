# Notes app

## Development

```sh
hook=.git/hooks/pre-commit

printf '#!/bin/sh\nnpm run lint\n' > "$hook"
chmod +x "$hook"
```

## Setup env

Generate `SECRET` environment variable and put it to `.env.local` file.

```sh
secret=$(node -e "console.log(require('crypto').randomBytes(48).toString('hex'))")

echo "SECRET=$secret" > .env.local
```

## Run 

```sh
npm run build
npm run start
```
