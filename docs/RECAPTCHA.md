# Google Cloud reCAPTCHA Enterprise setup

This site uses **Google Cloud reCAPTCHA Enterprise** with key type **Website • score**.

That is the current Google Cloud name for what older documentation and plugins often call score-based reCAPTCHA v3. This integration does **not** use the legacy `google.com/recaptcha/api/siteverify` endpoint. Server verification uses the **CreateAssessment** API:

`POST https://recaptchaenterprise.googleapis.com/v1/projects/PROJECT_ID/assessments`

The **Key ID** shown in Google Cloud is the public **site key** (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`).

## Protected forms

| Form | Action name | Endpoint |
|------|-------------|----------|
| Contact | `contact_submit` | `POST /api/contact` |

Booking uses an embedded Microsoft Bookings calendar (third-party). There is no first-party booking, quote, career, or newsletter form endpoint to protect yet.

## Environment variables

Copy from `.env.example`:

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
GOOGLE_CLOUD_PROJECT_ID=
RECAPTCHA_MIN_SCORE=0.5
```

Optional:

```bash
RECAPTCHA_ALLOWED_HOSTNAMES=staging.example.com
GOOGLE_CLOUD_API_KEY=
GOOGLE_SERVICE_ACCOUNT_KEY=
GOOGLE_APPLICATION_CREDENTIALS=
RECAPTCHA_BYPASS_DEV=true
```

- `RECAPTCHA_MIN_SCORE` defaults to `0.5` when unset. Values outside `0`–`1` are treated as a configuration error (fail closed).
- `RECAPTCHA_BYPASS_DEV=true` skips assessment **only** when `NODE_ENV !== "production"`. It is disabled by default and cannot be toggled from the browser.

Never prefix private credentials with `NEXT_PUBLIC_`. Never commit service-account JSON files.

## Server authentication

Preferred order:

1. **Attached Google Cloud service account / Application Default Credentials** when hosted on Google Cloud.
2. **Workload Identity Federation** when supported by the platform.
3. **Restricted Google Cloud API key** (`GOOGLE_CLOUD_API_KEY`) — practical for Vercel and other non-GCP hosts. Restrict the key to the reCAPTCHA Enterprise API and expected callers.
4. **Service-account JSON** via `GOOGLE_SERVICE_ACCOUNT_KEY` (stringified JSON) when necessary. Escaped `\n` sequences in `private_key` are normalized on the server. Alternatively set `GOOGLE_APPLICATION_CREDENTIALS` to a filesystem path available only at runtime.

The Google Cloud identity used for CreateAssessment needs the **`roles/recaptchaenterprise.agent`** role when using IAM.

## Approved hostnames

Always allowed in production:

- `twins-languageservices.com`
- `www.twins-languageservices.com`

`localhost` / `127.0.0.1` are allowed only outside production. Add staging or preview hosts with `RECAPTCHA_ALLOWED_HOSTNAMES` (comma-separated). Unexpected hostnames are rejected.

## Score policy

- Score **≥** `RECAPTCHA_MIN_SCORE` → continue (send email).
- Score **below** threshold, invalid token, action mismatch, hostname mismatch, or assessment failure → **fail closed**. No email is sent. The browser receives a generic message only.

Tokens expire after about **two minutes** and are **single-use**. The client obtains a fresh token immediately before each submit.

## Local testing

1. Create a Website • score key in Google Cloud project `TwinsLanguageServices` (or your project ID).
2. Add `localhost` to the key’s allowed domains for development.
3. Fill `.env.local` with site key, project ID, and either `GOOGLE_CLOUD_API_KEY` or service-account credentials.
4. Run `pnpm dev` and submit the contact form.
5. Optionally set `RECAPTCHA_BYPASS_DEV=true` only for UI work that must skip Google (never in production).

## Staging and production

1. Enable the **reCAPTCHA Enterprise API** on the Google Cloud project.
2. Confirm the Website • score key allows:
   - `twins-languageservices.com`
   - `www.twins-languageservices.com`
   - any staging host you configured
3. Set production environment variables on the host (this repo’s IP helpers expect Vercel’s `x-vercel-forwarded-for`).
4. Deploy and submit a real contact form once.
5. In Google Cloud Console → reCAPTCHA → assessments / metrics, confirm assessments appear with action `contact_submit` and expected hostnames.

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Invalid token | Token expired, reused, wrong site key, or domain not registered on the key |
| Hostname mismatch | Domain missing from approved list or from the key’s allowed domains |
| Action mismatch | Client `execute` action ≠ server `contact_submit` |
| Configuration / 503 | Missing project ID, site key, score threshold, or server auth in production |
| Low score blocks humans | Raise `RECAPTCHA_MIN_SCORE` carefully after reviewing production scores |

## Defense in depth

reCAPTCHA is combined with:

- Zod schema validation and field length limits
- Hidden honeypot field
- Best-effort in-memory per-IP rate limiting (document durable shared limiting for multi-instance production if needed)
- Generic client error messages
- Structured server logs without tokens, credentials, or full message bodies

## Production checklist

- [ ] Allowed domains include `twins-languageservices.com` and `www.twins-languageservices.com`
- [ ] reCAPTCHA Enterprise API enabled
- [ ] Website • score key created; Key ID copied to `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- [ ] `GOOGLE_CLOUD_PROJECT_ID` matches the Google Cloud project
- [ ] Server identity has `roles/recaptchaenterprise.agent` (IAM) **or** a restricted API key is configured
- [ ] API key restrictions configured when using an API key
- [ ] Billing implications understood
- [ ] Production env vars set; no private credentials exposed to the client
- [ ] Privacy policy mentions Google reCAPTCHA where required for your jurisdiction
