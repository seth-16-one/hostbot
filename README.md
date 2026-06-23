# Host Bot Mobile App

Host Bot is an Expo Router and React Native application for discovering, deploying, pairing, funding, and managing hosted WhatsApp bots. The app includes a local Express backend, a JSON sample database, authenticated API routes, Zustand stores, typed service boundaries, wallet flows, deployment lifecycle state, reusable UI components, and light/dark/system theme support.

## Table Of Contents

- [Product Overview](#product-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Navigation Map](#navigation-map)
- [Core User Flows](#core-user-flows)
- [State Management](#state-management)
- [Services Layer](#services-layer)
- [Theme System](#theme-system)
- [Wallet System](#wallet-system)
- [Deployment System](#deployment-system)
- [Reusable UI System](#reusable-ui-system)
- [Data And Mocking Strategy](#data-and-mocking-strategy)
- [Backend Integration Contract](#backend-integration-contract)
- [Quality Checks](#quality-checks)
- [Development Guidelines](#development-guidelines)
- [Known Gaps And Next Steps](#known-gaps-and-next-steps)

## Product Overview

Host Bot lets users:

- Browse a marketplace of deployable bot templates.
- View bot details, requirements, pricing, and runtime costs.
- Configure a bot deployment.
- Create a deployment record.
- Generate a pairing session.
- Pair a WhatsApp device using a pair code or QR code.
- Bring the bot online.
- Manage deployed bots.
- Recharge wallet credits.
- View wallet balance and transaction history.
- Configure app settings, notification preferences, and theme mode.
- Access support, documentation, notifications, profile, and system status screens.

The app currently stores backend data in `backend/data/db.json`. That adapter is intentionally simple so it can later be replaced by a live database without changing the frontend route flow.

## Tech Stack

- Framework: Expo SDK 56
- UI Runtime: React Native 0.85
- Navigation: Expo Router
- Language: TypeScript with strict mode
- State: Zustand with AsyncStorage persistence
- Icons: `@expo/vector-icons`
- QR Codes: `react-native-qrcode-svg`
- Storage: `@react-native-async-storage/async-storage`
- Styling: React Native `StyleSheet`, design tokens, and theme modules

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

Run the local backend:

```bash
npm run backend
```

The backend runs at:

```text
http://localhost:3001/api
```

Demo login:

```text
Username: demo
Email: demo@hostbot.local
Password: password123
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Run on web:

```bash
npm run web
```

Check TypeScript:

```bash
npx tsc --noEmit
```

## Environment Variables

The API client reads the backend base URL from:

```bash
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

If this variable is not configured, `src/services/api/client.ts` falls back to the `extra.apiBaseUrl` value in `app.json`.

Recommended local `.env`:

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

The checked-in Expo config already points to `http://localhost:3001/api`.

## Project Structure

Current high-level structure:

```text
src/
  app/
    (tabs)/
      activity/
      bots/
      dashboard/
      more/
    about/
    activity/
    api-docs/
    bots/
      configure/
      deploy/
      manage/
      pair/
    documentation/
    faq/
    notifications/
    pricing/
    profile/
    server-status/
    settings/
    support/
    wallet/
      index.tsx
      recharge.tsx
      history.tsx
    _layout.tsx
    index.tsx
  components/
    bot/
    cards/
    layout/
    ui/
  constants/
  context/
  data/
  providers/
  services/
    api/
    auth/
    bots/
    wallet/
  store/
  styles/
  theme/
  types/
backend/
  data/
    db.json
  src/
    auth.js
    database.js
    server.js
```

### Important Files

- `src/app/_layout.tsx`: Root layout, safe area provider, theme provider, toast provider, and Expo Router stack.
- `src/app/(tabs)/_layout.tsx`: Main tab navigation.
- `src/app/(auth)/login.tsx`: Login screen with username-or-email support.
- `src/app/(auth)/register.tsx`: Registration screen with username, email, and password.
- `src/providers/AuthProvider.tsx`: Frontend route guard for authenticated app routes.
- `src/services/api/client.ts`: HTTP client with bearer-token headers.
- `src/services/auth/auth.service.ts`: Frontend auth API service.
- `src/services/bots/bots.service.ts`: Marketplace bot API service.
- `src/services/bots/deployment.service.ts`: Deployment API service.
- `src/services/wallet/wallet.service.ts`: Wallet API service.
- `src/store/deployment.ts`: Persisted deployment lifecycle state.
- `src/store/wallet.ts`: Persisted wallet balance and transaction state.
- `src/store/settings.ts`: Persisted settings and theme preference.
- `src/theme/`: Light, dark, and system theme support.
- `src/types/`: Shared TypeScript domain models.
- `backend/data/db.json`: Sample JSON database for users, bots, wallets, deployments, and transactions.
- `backend/src/server.js`: Express API server with authenticated routes.
- `backend/src/auth.js`: Password hashing and signed token helpers.
- `backend/src/database.js`: JSON database read/write adapter.

## Navigation Map

### Root

- `/`: Redirects to `/dashboard`.

### Tabs

- `/dashboard`: Dashboard overview.
- `/bots`: Bot marketplace and deployed bot entry points.
- `/activity`: Activity feed.
- `/more`: Account, wallet, support, and system links.

### Bots

- `/bots/[id]`: Marketplace bot details.
- `/bots/configure/[id]`: Configure bot before deployment.
- `/bots/deploy/[id]`: Deployment readiness check and deployment record creation.
- `/bots/pair/[id]`: Pairing session screen for a deployment ID.
- `/bots/manage/[id]`: Manage an active or legacy bot deployment.
- `/bots/manage/analytics`: Bot analytics.
- `/bots/manage/commands`: Bot commands.
- `/bots/manage/groups`: Bot groups.
- `/bots/manage/logs`: Bot logs.
- `/bots/manage/plugins`: Bot plugins.
- `/bots/manage/session`: Session management.
- `/bots/manage/settings`: Bot settings.

### Wallet

- `/wallet`: Balance and recent transactions.
- `/wallet/recharge`: Credit package and payment method selection.
- `/wallet/history`: Full wallet transaction history.

### Account And Support

- `/profile`: User profile.
- `/profile/edit`: Edit profile.
- `/settings`: Preferences, notifications, and theme mode.
- `/notifications`: Notification list.
- `/notifications/[id]`: Notification details.
- `/support`: Support home.
- `/support/ticket`: Submit or view support ticket flow.
- `/documentation`: Documentation screen.
- `/faq`: FAQ screen.
- `/about`: App information.
- `/server-status`: Server status overview.
- `/server-status/[id]`: Server status detail.
- `/pricing`: Legacy pricing and billing page.
- `/api-docs`: API documentation screen.

## Core User Flows

### Marketplace To Online Bot

```text
Marketplace
  -> Bot Details
  -> Configure Bot
  -> Create Deployment Record
  -> Generate Session
  -> Pair Device
  -> Deploy Bot
  -> Bot Online
  -> Manage Bot
```

Implementation touchpoints:

- Marketplace data: `src/data/bots.ts`
- Bot details: `src/app/bots/[id].tsx`
- Configure screen: `src/app/bots/configure/[id].tsx`
- Deploy screen: `src/app/bots/deploy/[id].tsx`
- Pair screen: `src/app/bots/pair/[id].tsx`
- Manage screen: `src/app/bots/manage/[id].tsx`
- Store: `src/store/deployment.ts`
- Service: `src/services/bots/deployment.service.ts`

### Wallet Recharge

```text
Wallet
  -> Recharge Credits
  -> Select Package
  -> Select Payment Method
  -> Payment Processing
  -> Success
  -> Wallet Balance Refresh
```

Implementation touchpoints:

- Wallet home: `src/app/wallet/index.tsx`
- Recharge: `src/app/wallet/recharge.tsx`
- History: `src/app/wallet/history.tsx`
- Store: `src/store/wallet.ts`
- Service: `src/services/wallet/wallet.service.ts`
- Types: `src/types/wallet.ts`

### Theme Selection

```text
Settings
  -> Light / Dark / System
  -> Persist Preference
  -> Resolve Device Theme If System
  -> Apply Theme Provider
```

Implementation touchpoints:

- Settings screen: `src/app/settings/index.tsx`
- Settings store: `src/store/settings.ts`
- Theme provider: `src/theme/ThemeProvider.tsx`
- Theme hook: `src/theme/useTheme.ts`
- Tokens: `src/theme/light.ts`, `src/theme/dark.ts`

## State Management

Zustand is used for app state. Persistent stores use AsyncStorage via `zustand/middleware`.

### Auth Store

File: `src/store/auth.ts`

Purpose:

- Hold authenticated user.
- Hold auth token.
- Track hydration.
- Persist login session.

State:

- `user`
- `token`
- `hydrated`

Actions:

- `setSession(user, token)`
- `clearSession()`
- `setHydrated(hydrated)`

### Deployment Store

File: `src/store/deployment.ts`

Purpose:

- Track bot deployment lifecycle.
- Persist deployments.
- Store active deployment ID.
- Coordinate deployment service calls.

Deployment statuses:

- `queued`
- `creating_session`
- `pairing`
- `deploying`
- `online`
- `offline`
- `failed`
- `expired`
- `suspended`

State:

- `deployments`
- `activeDeploymentId`
- `loading`
- `error`

Actions:

- `createDeployment(input)`
- `generateSession(deploymentId)`
- `pairBot(deploymentId)`
- `deployBot(deploymentId)`
- `restartBot(deploymentId)`
- `stopBot(deploymentId)`
- `deleteBot(deploymentId)`
- `syncBotStatus(deploymentId)`
- `updateDeployment(id, status, patch)`
- `removeDeployment(id)`

### Wallet Store

File: `src/store/wallet.ts`

Purpose:

- Track wallet balance.
- Track transactions.
- Expose recharge workflow.
- Persist balance and transactions.

State:

- `balance`
- `transactions`
- `loading`
- `error`
- `packages`

Actions:

- `refreshBalance()`
- `refreshTransactions()`
- `createRecharge(packageId, method)`
- `verifyPayment(session)`

### Settings Store

File: `src/store/settings.ts`

Purpose:

- Persist theme preference.
- Persist notification preferences.

Theme preferences:

- `light`
- `dark`
- `system`

State:

- `themePreference`
- `pushEnabled`
- `emailEnabled`
- `botAlerts`

Actions:

- `setThemePreference(preference)`
- `setPushEnabled(enabled)`
- `setEmailEnabled(enabled)`
- `setBotAlerts(enabled)`

## Services Layer

The services layer isolates screens and stores from backend implementation details.

### API Client

File: `src/services/api/client.ts`

Methods:

- `apiClient.get<T>(path)`
- `apiClient.post<T>(path, body)`
- `apiClient.put<T>(path, body)`
- `apiClient.delete<T>(path)`

Behavior:

- Reads `EXPO_PUBLIC_API_BASE_URL`.
- Sends JSON requests.
- Returns typed `ApiResponse<T>`.
- Throws `ApiError` for missing base URL or failed responses.

### Deployment Service

File: `src/services/bots/deployment.service.ts`

Methods:

- `createDeployment(input)`
- `generateSession(deployment)`
- `pairBot(deploymentId)`
- `deployBot(deploymentId)`
- `restartBot()`
- `stopBot()`
- `deleteBot()`
- `syncBotStatus(current)`

Current behavior:

- Uses mock async delays.
- Generates deployment IDs.
- Generates session IDs.
- Generates pair codes.
- Generates QR values.
- Returns lifecycle statuses.

Backend replacement strategy:

- Keep the same method names and return types.
- Replace mock implementation with calls to `apiClient`.
- Keep store and screen code unchanged where possible.

### Wallet Service

File: `src/services/wallet/wallet.service.ts`

Methods:

- `getBalance()`
- `getTransactions()`
- `createRecharge(packageId, method)`
- `verifyPayment(session)`

Current behavior:

- Uses mock in-memory balance.
- Provides recharge packages.
- Adds completed transactions after payment verification.

Backend replacement strategy:

- Replace mock package data with `GET /wallet/packages` if needed.
- Replace balance and transaction calls with real endpoints.
- Replace recharge verification with provider-specific backend verification.

## Theme System

Theme files live in `src/theme`.

Files:

- `colors.ts`: Shared base palette.
- `light.ts`: Light theme tokens.
- `dark.ts`: Dark theme tokens.
- `useTheme.ts`: Resolves selected theme against device theme.
- `ThemeProvider.tsx`: Applies status bar and provides app-level theme behavior.
- `index.ts`: Theme exports.

Theme behavior:

- User can select Light, Dark, or System in Settings.
- Selection is persisted in `src/store/settings.ts`.
- System mode follows the device color scheme.
- Root layout wraps the app in `ThemeProvider`.

Theme token shape:

```ts
theme.colors.primary
theme.colors.background
theme.colors.card
theme.colors.text
theme.colors.muted
theme.colors.success
theme.colors.warning
theme.colors.danger
```

Current note:

- The theme foundation is implemented.
- Some legacy screens still import `COLORS` directly from `src/constants`.
- New screens and future refactors should prefer `useTheme()` tokens.

## Wallet System

### Wallet Types

File: `src/types/wallet.ts`

Transaction types:

- `credit`
- `debit`
- `refund`
- `bonus`

Transaction statuses:

- `pending`
- `completed`
- `failed`

Payment methods:

- `mpesa`
- `card`
- `paypal`

Core models:

- `WalletBalance`
- `WalletTransaction`
- `RechargePackage`
- `RechargeRequest`
- `RechargeSession`

### Wallet Pages

`src/app/wallet/index.tsx`

- Displays current balance.
- Displays recent transactions.
- Refreshes balance on load.
- Auto-refreshes balance every 30 seconds.
- Links to recharge and history.

`src/app/wallet/recharge.tsx`

- Lists recharge packages.
- Lets user choose M-Pesa, Card, or PayPal.
- Creates recharge session.
- Verifies payment.
- Shows success modal.

`src/app/wallet/history.tsx`

- Displays full wallet transaction list.
- Distinguishes credit and debit amounts.

## Deployment System

### Deployment Types

File: `src/types/deployment.ts`

Core models:

- `DeploymentStatus`
- `PairingSession`
- `Deployment`
- `CreateDeploymentInput`

### Deployment Lifecycle

The lifecycle is represented in Zustand and in service method boundaries.

```text
queued
  -> creating_session
  -> pairing
  -> deploying
  -> online
```

Failure and inactive states:

```text
offline
failed
expired
suspended
```

### Configure Screen

File: `src/app/bots/configure/[id].tsx`

Responsibilities:

- Collect bot display name.
- Collect owner phone number.
- Show deployment cost details.
- Create deployment record.
- Generate pairing session.
- Route to Pair Device.

### Deploy Screen

File: `src/app/bots/deploy/[id].tsx`

Responsibilities:

- Verify credits.
- Show minimum credits and hourly usage.
- Create deployment record.
- Generate pairing session.
- Route to Pair Device.
- Route to recharge if credits are insufficient.

### Pair Screen

File: `src/app/bots/pair/[id].tsx`

Responsibilities:

- Display deployment status banner.
- Display session ID.
- Display pair code.
- Display QR code.
- Show expiry countdown.
- Copy pair code.
- Share pair code.
- Detect session expiry.
- Retry pairing by generating a new session.
- Poll deployment status.
- Deploy bot after device is paired.
- Show success modal and route to Manage Bot.

### Manage Screen

File: `src/app/bots/manage/[id].tsx`

Responsibilities:

- Supports legacy mock deployment IDs.
- Supports new Zustand deployment IDs.
- Displays bot status, metadata, statistics, quick actions, and management links.

## Reusable UI System

Shared UI lives in `src/components/ui`.

Important components:

- `Button`: Primary, outline, danger button variants with loading state.
- `Card`: Reusable card wrapper.
- `Input`: Shared text input.
- `PhoneInput`: Phone number input.
- `Select`: Selection input.
- `StatusModal`: Full-screen feedback modal.
- `StatusBanner`: Inline status feedback.
- `StatusCard`: Status card wrapper.
- `Toast`: Toast notification.
- `ConfirmModal`: Confirmation modal.
- `LoadingOverlay`: Blocking loading UI.
- `EmptyState`: Empty screen state.

Status components support:

- `success`
- `warning`
- `error`
- `info`

Recommended usage:

- Use `StatusBanner` for inline flow state.
- Use `StatusModal` for blocking completion or failure events.
- Use `Toast` for lightweight feedback like copy success.

## Data And Mocking Strategy

Static data lives in `src/data`.

Current data files:

- `account.ts`
- `billing.ts`
- `bots.ts`
- `deployments.ts`
- `docs.ts`
- `settings.ts`
- `support.ts`
- `system.ts`

Guidelines:

- Use `src/data` for temporary static content and UI scaffolding only.
- Use services for dynamic domain behavior.
- Do not add new business logic directly to screens.
- When backend endpoints exist, move data loading into services and stores.

## Backend Integration Contract

The app is prepared for the following backend endpoints.

### Deployment Endpoints

Create deployment:

```http
POST /deployments
```

Request:

```json
{
  "botId": 1,
  "botName": "SethBot-MD",
  "ownerNumber": "+254700000000",
  "prefix": ".",
  "sessionName": "sethbot-md-123456"
}
```

Response:

```json
{
  "id": "dep_123",
  "botId": 1,
  "botName": "SethBot-MD",
  "ownerNumber": "+254700000000",
  "prefix": ".",
  "sessionName": "sethbot-md-123456",
  "status": "queued",
  "createdAt": "2026-06-23T10:00:00.000Z",
  "updatedAt": "2026-06-23T10:00:00.000Z"
}
```

Generate session:

```http
POST /deployments/:id/session
```

Response:

```json
{
  "id": "ses_123",
  "deploymentId": "dep_123",
  "pairCode": "ABCD1234",
  "qrValue": "hostbot://pair/dep_123?code=ABCD1234",
  "expiresAt": "2026-06-23T10:05:00.000Z",
  "createdAt": "2026-06-23T10:00:00.000Z"
}
```

Pair bot:

```http
POST /deployments/:id/pair
```

Deploy bot:

```http
POST /deployments/:id/deploy
```

Restart bot:

```http
POST /deployments/:id/restart
```

Stop bot:

```http
POST /deployments/:id/stop
```

Delete bot:

```http
DELETE /deployments/:id
```

Sync status:

```http
GET /deployments/:id/status
```

Expected status response:

```json
{
  "status": "online"
}
```

### Wallet Endpoints

Get wallet balance:

```http
GET /wallet/balance
```

Response:

```json
{
  "credits": 450,
  "updatedAt": "2026-06-23T10:00:00.000Z"
}
```

Get transactions:

```http
GET /wallet/transactions
```

Response:

```json
[
  {
    "id": "txn_123",
    "type": "credit",
    "status": "completed",
    "amount": 500,
    "description": "Wallet recharge",
    "reference": "MPESA123",
    "createdAt": "2026-06-23T10:00:00.000Z"
  }
]
```

Create recharge:

```http
POST /wallet/recharge
```

Request:

```json
{
  "packageId": "growth",
  "method": "mpesa",
  "phoneNumber": "+254700000000"
}
```

Response:

```json
{
  "id": "rch_123",
  "status": "pending",
  "amount": 650,
  "credits": 550,
  "paymentMethod": "mpesa",
  "createdAt": "2026-06-23T10:00:00.000Z"
}
```

Verify payment:

```http
POST /wallet/recharge/:id/verify
```

Response:

```json
{
  "id": "rch_123",
  "status": "completed",
  "amount": 650,
  "credits": 550,
  "paymentMethod": "mpesa",
  "createdAt": "2026-06-23T10:00:00.000Z"
}
```

### Auth Endpoints Needed

The frontend has an auth store but does not yet include full auth screens. Recommended endpoints:

```http
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET /auth/me
PUT /auth/me
POST /auth/password/forgot
POST /auth/password/reset
```

### Notification Endpoints Needed

```http
GET /notifications
GET /notifications/:id
POST /notifications/:id/read
POST /notifications/read-all
```

### Support Endpoints Needed

```http
GET /support/tickets
POST /support/tickets
GET /support/tickets/:id
POST /support/tickets/:id/replies
```

## Quality Checks

TypeScript strict mode is enabled in `tsconfig.json`.

Run:

```bash
npx tsc --noEmit
```

Expo lint:

```bash
npm run lint
```

Dependency install check:

```bash
npm install
```

Development server check:

```bash
npm start
```

## Development Guidelines

### Routing

- Keep routes inside `src/app`.
- Follow Expo Router file-based routing.
- Use dynamic route folders like `[id].tsx` for entity detail screens.
- Keep modal or nested flows grouped under their domain folder.

### Screens

- Screens should orchestrate UI, navigation, and store actions.
- Avoid placing business logic directly inside screens.
- Use services for async domain behavior.
- Use stores for persisted or shared app state.
- Use local component state only for transient UI state.

### Stores

- Put domain stores in `src/store`.
- Persist only data that should survive app restarts.
- Keep loading and error state in the store when multiple screens need it.
- Keep sensitive auth data minimal and prepare for secure storage before production release.

### Services

- Put API-facing logic in `src/services`.
- Keep method names stable when replacing mocks with backend calls.
- Return typed domain models.
- Throw meaningful errors.

### Types

- Put shared domain types in `src/types`.
- Prefer explicit union types for statuses and modes.
- Keep service, store, and screen contracts aligned through shared types.

### Components

- Put reusable primitives in `src/components/ui`.
- Put layout wrappers in `src/components/layout`.
- Put feature-specific bot components in `src/components/bot`.
- Put repeated card components in `src/components/cards`.

### Styling

- Prefer theme tokens and constants over hardcoded values.
- Keep spacing, radius, shadow, and color usage consistent.
- Use status components for success, warning, error, and info feedback.
- Avoid duplicating screen-specific button and card styles when shared UI can handle it.

## Known Gaps And Next Steps

- Replace mock deployment service with backend API calls.
- Replace mock wallet service with backend API calls.
- Add full authentication screens and route groups.
- Move all legacy direct `COLORS` usage to `useTheme()` tokens.
- Add form validation for configure, recharge, support, and profile screens.
- Add error banners for failed async service calls.
- Add test coverage for stores, services, and critical flows.
- Add secure token storage before production auth rollout.
- Add real payment provider flows for M-Pesa, Card, and PayPal.
- Add real bot telemetry for analytics, logs, commands, groups, and session health.

## Current Verification

The app currently passes:

```bash
npx tsc --noEmit
```

#   h o s t b o t  
 
