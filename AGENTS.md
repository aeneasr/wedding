# Agent Notes

## Required Verification

After making changes, run the Playwright coverage before handoff:

```bash
npm run test:playwright
```

This runs both:

```bash
npm run test:ct
npm run test:e2e
```

If the change also touches non-Playwright-covered code paths or shared build/config code, also run:

```bash
npm run test:unit
npm run build
```
