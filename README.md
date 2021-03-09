# Notes app

## Development

```sh
hook=.git/hooks/pre-commit

printf '#!/bin/sh\nnpm run lint\n' > "$hook"
chmod +x "$hook"
```

## Setup env

Generate tokens sencrets environment variables and put them to `.env.local` file.

```sh
for token in ACCESS REFRESH; do
    secret=$(node -e "console.log(require('crypto').randomBytes(48).toString('hex'))")

    echo "${token}_TOKEN_SECRET=$secret" >> .env.local
done
```

## Run 

```sh
npm run build
npm run start
```
