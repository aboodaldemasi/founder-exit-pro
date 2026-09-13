# Founder Exit

Broker marketplace for **SaaS only**. Founder Exit sits between seller and buyer. It does not own the companies.

Public listings are **anonymous**: visitors see a code (for example `FE-8K2P`), category, and numbers — not the product name.

## Run locally

```sh
npm i
cp .env.example .env
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`. The admin desk is **`/admin`** (not in the public menu).

Listings and accounts are stored in `data/platform.json` on the machine that runs the server. Do not commit that file.

## Roles

| Who | What they can do |
| --- | --- |
| Guest / visitor | Browse anonymous SaaS listings, contact the operator, register |
| Seller (pending) | Wait until admin verifies they operate a real SaaS |
| Seller (approved) | Submit a listing (real name stays private). Admin publishes it |
| Buyer | There is no buyer account. To buy: email the operator and arrange a deposit |
| Admin | Approve sellers (opens email to them), publish listings, read contact inbox |

There is **no payment gateway** yet. Deposit is arranged by email (`hello@founderexit.com` in `src/lib/brand.ts`).

This project is connected to [Lovable](https://lovable.dev). Push to `main` to sync; do not force-push history.
