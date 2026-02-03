# Authentication Setup Guide

This guide will help you set up Supabase authentication for the Decision Navigator application.

## Prerequisites

- Supabase project created
- Environment variables configured in `.env.local`

## Supabase Configuration

### 1. Enable Email Authentication

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable **Email** provider
4. Configure email templates (optional but recommended)

### 2. Configure Email Templates (Optional)

Navigate to **Authentication** → **Email Templates** and customize:

- **Confirm signup**: Email sent when users sign up
- **Reset password**: Email sent for password reset
- **Magic Link**: Email sent for passwordless login (if enabled)

### 3. Set Up Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Add your site URL: `http://localhost:8080` (development)
3. Add redirect URLs:
   - `http://localhost:8080/login`
   - `http://localhost:8080/reset-password`
   - Add production URLs when deploying

### 4. Row Level Security (RLS)

The existing `decisions`, `options`, `criteria`, and `constraints` tables already have RLS enabled. The policies filter data by `user_id`, which is automatically set from `auth.uid()`.

**Verify RLS is enabled:**

```sql
-- Check if RLS is enabled on tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('decisions', 'options', 'criteria', 'constraints');
```

All tables should show `rowsecurity = true`.

## Environment Variables

Ensure your `.env.local` file has the following:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Features Implemented

### Authentication Pages

1. **Login** (`/login`)
   - Email/password authentication
   - Link to signup and forgot password
   - Error handling

2. **Signup** (`/signup`)
   - User registration with email/password
   - Full name collection
   - Email confirmation flow
   - Password validation (min 6 characters)

3. **Forgot Password** (`/forgot-password`)
   - Password reset email
   - Redirect to reset password page

### Protected Routes

All dashboard routes are now protected:
- `/dashboard`
- `/decisions/new`
- `/decisions/:id`
- `/decisions/:id/result`
- `/history`
- `/settings`

Unauthenticated users are redirected to `/login`.

### Auth Context

The `AuthContext` provides:
- `user`: Current user object
- `session`: Current session
- `loading`: Loading state
- `signUp()`: Register new user
- `signIn()`: Login user
- `signOut()`: Logout user
- `resetPassword()`: Send password reset email

### Usage Example

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, signOut } = useAuth();
  
  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

## Testing Authentication

### 1. Sign Up Flow

1. Navigate to `/signup`
2. Enter full name, email, and password
3. Click "Create account"
4. Check email for confirmation link
5. Click confirmation link
6. Redirected to dashboard

### 2. Login Flow

1. Navigate to `/login`
2. Enter email and password
3. Click "Sign in"
4. Redirected to dashboard

### 3. Logout Flow

1. Click "Logout" in sidebar
2. Redirected to home page
3. Try accessing `/dashboard` → redirected to `/login`

### 4. Password Reset Flow

1. Navigate to `/forgot-password`
2. Enter email
3. Click "Send reset link"
4. Check email for reset link
5. Click link and set new password

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use strong passwords** - Minimum 6 characters enforced
3. **Enable email confirmation** - Prevents fake signups
4. **RLS policies** - Ensure users can only access their own data
5. **HTTPS in production** - Required for secure authentication

## Troubleshooting

### Users can't sign up
- Check if email provider is enabled in Supabase
- Verify SMTP settings if using custom email
- Check browser console for errors

### Users can't login
- Verify credentials are correct
- Check if email is confirmed
- Look for error messages in console

### Protected routes not working
- Ensure `AuthProvider` wraps routes in `App.tsx`
- Check if Supabase client is properly configured
- Verify environment variables are loaded

### RLS blocking queries
- Check RLS policies in Supabase dashboard
- Ensure `user_id` column exists and is set correctly
- Verify `auth.uid()` is used in policies

## Next Steps

1. **Customize email templates** in Supabase dashboard
2. **Add social auth** (Google, GitHub, etc.) if needed
3. **Implement profile page** in Settings
4. **Add email verification reminder** for unverified users
5. **Set up production redirect URLs** before deploying

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
