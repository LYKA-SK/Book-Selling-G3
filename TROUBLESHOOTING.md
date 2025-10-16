# 🔧 Troubleshooting Guide - 401 Invalid Credentials

## ✅ Verification Complete

The database and authentication logic are working correctly:
- ✅ Admin user exists in database
- ✅ Password comparison works
- ✅ Login function is correct

## 🎯 Common Postman Issues

### Issue 1: Wrong URL
❌ **Wrong:** `http://localhost:4000/auth/login`
✅ **Correct:** `http://localhost:4000/api/v1/auth/login`

### Issue 2: Missing or Wrong Headers
You MUST include this header:
```
Content-Type: application/json
```

### Issue 3: Wrong Body Format
❌ **Wrong:** Using "form-data" or "x-www-form-urlencoded"
✅ **Correct:** Using "raw" with "JSON" selected

### Issue 4: Incorrect JSON Format
❌ **Wrong:** Extra spaces, missing quotes, or typos
```json
{
  email: admin@readable.test,
  password: admin123
}
```

✅ **Correct:** Proper JSON format
```json
{
  "email": "admin@readable.test",
  "password": "admin123"
}
```

### Issue 5: Copy-Paste Issues
Sometimes copying from documents adds invisible characters. Type it manually:
```json
{
  "email": "admin@readable.test",
  "password": "admin123"
}
```

## 📋 Step-by-Step Postman Setup

### 1. Create New Request
- Click "New" → "HTTP Request"
- Or use the "+" tab

### 2. Set Method and URL
- Method: **POST** (from dropdown)
- URL: `http://localhost:4000/api/v1/auth/login`

### 3. Set Headers
- Click "Headers" tab
- Add: `Content-Type` = `application/json`

### 4. Set Body
- Click "Body" tab
- Select "raw" radio button
- From the dropdown on the right, select "JSON"
- Paste this EXACT text:
```json
{
  "email": "admin@readable.test",
  "password": "admin123"
}
```

### 5. Send Request
- Click the blue "Send" button
- You should get a 200 response with a token

## 🔍 Debugging Steps

If you still get 401, check these in order:

### Step 1: Verify Server is Running
Look for this in your terminal:
```
🚀 Server running on port 4000
```

### Step 2: Test with cURL
Open a new terminal and run:
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@readable.test","password":"admin123"}'
```

If this works but Postman doesn't, the issue is with Postman configuration.

### Step 3: Check Postman Console
- View → Show Postman Console
- Look for the actual request being sent
- Verify the URL, headers, and body

### Step 4: Try Register First
If login still fails, try registering a new user:

**POST** `http://localhost:4000/api/v1/auth/register`
```json
{
  "name": "Test User",
  "email": "test@test.com",
  "password": "test123456",
  "role": "customer"
}
```

Then login with the new credentials.

## 📸 Screenshot Checklist

Your Postman should look like this:

```
┌─────────────────────────────────────────────────┐
│ POST  http://localhost:4000/api/v1/auth/login  │
├─────────────────────────────────────────────────┤
│ Params  Authorization  Headers  Body  ...       │
│                                                  │
│ Headers (1)                                      │
│ ┌──────────────────┬─────────────────────────┐ │
│ │ Content-Type     │ application/json        │ │
│ └──────────────────┴─────────────────────────┘ │
│                                                  │
│ Body                                             │
│ ○ none  ○ form-data  ○ x-www-form-urlencoded   │
│ ● raw   ○ binary     ○ GraphQL                  │
│                                                  │
│ Text ▼  [JSON]                                   │
│ ┌────────────────────────────────────────────┐ │
│ │ {                                           │ │
│ │   "email": "admin@readable.test",          │ │
│ │   "password": "admin123"                   │ │
│ │ }                                           │ │
│ └────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## 🆘 Still Not Working?

1. Restart your server (`Ctrl+C` then `npm run dev`)
2. Clear Postman cache (Settings → Clear cache)
3. Try a different API client (Insomnia, Thunder Client in VS Code)
4. Check if any firewall is blocking localhost:4000

## ✅ Expected Success Response

```json
{
  "id": "68f0a98e32949417ce2f346f",
  "name": "Admin",
  "email": "admin@readable.test",
  "role": "admin",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Status: **200 OK**