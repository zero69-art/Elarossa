# Elarossa authentication

## Features

- Email + password register / login
- HTTP-only signed session cookie (`elarossa_session`)
- Account page, sign out
- Passwords: Node `scrypt` hashes

## Routes

| Path | Purpose |
|------|---------|
| `/register` | Create account |
| `/login` | Sign in |
| `/account` | Profile / sign out |
| `POST /api/auth/register` | Register |
| `POST /api/auth/login` | Login |
| `POST /api/auth/logout` | Logout |
| `GET /api/auth/me` | Current user |

## Vercel env

| Variable | Required | Notes |
|----------|----------|--------|
| `AUTH_SECRET` | **Yes in production** | Long random string (32+ chars) |
| `UPSTASH_REDIS_REST_URL` | Recommended | Durable user storage |
| `UPSTASH_REDIS_REST_TOKEN` | Recommended | With URL |

Without Upstash, users are kept in **server memory** (fine for a single warm instance; can reset on cold starts). For production accounts, add free Upstash Redis and set the two env vars.

Generate secret:

```bash
openssl rand -base64 32
```
