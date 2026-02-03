# 📧 Email Notifications Setup Guide

## Overview

Your application now supports email notifications for:
- ✅ **Decision Analysis Complete** - When AI finishes analyzing a decision
- ✅ **New Decision Created** - When a user creates a new decision (optional)
- ✅ **Weekly Digest** - Summary of decisions from the past week (optional)

## Current Implementation

### Notification Service
Location: `src/lib/notification-service.ts`

The notification service includes:
- User preference checking (respects user settings)
- Email notification triggers
- Weekly digest functionality
- Integration with Supabase Auth for user data

### User Preferences
Users can control notifications from the Settings page:
- **Email Notifications** - Master toggle for all email notifications
- **Analysis Complete** - Get notified when AI analysis is complete
- **Weekly Digest** - Receive weekly summary of decisions

### Integration Points
Notifications are triggered at:
1. **NewDecision.tsx** - After analysis completes successfully
2. **Settings.tsx** - User can manage notification preferences

## Setting Up Email Sending

Currently, the notification service logs email events but doesn't actually send emails. To enable real email sending, you need to implement one of the following options:

### Option 1: Supabase Edge Functions (Recommended)

#### Step 1: Create Edge Function

Create a new Edge Function in your Supabase project:

```bash
# In your Supabase project directory
supabase functions new send-notification-email
```

#### Step 2: Implement Edge Function

File: `supabase/functions/send-notification-email/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { to, subject, template, data } = await req.json()

    // Send email using Resend (or your preferred email service)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'DESY <notifications@yourdomain.com>',
        to: [to],
        subject: subject,
        html: generateEmailHTML(template, data),
      }),
    })

    const result = await res.json()

    return new Response(
      JSON.stringify({ success: true, result }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

function generateEmailHTML(template: string, data: any): string {
  if (template === 'decision-complete') {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Analysis Complete!</h1>
            </div>
            <div class="content">
              <p>Hi ${data.userName},</p>
              <p>Great news! Your decision analysis for <strong>"${data.decisionTitle}"</strong> is now complete.</p>
              <p>Our AI has analyzed all your options, criteria, and constraints to provide you with a comprehensive recommendation.</p>
              <a href="${data.viewUrl}" class="button">View Results</a>
              <p style="margin-top: 30px;">The analysis includes:</p>
              <ul>
                <li>Detailed scoring for each option</li>
                <li>AI-powered recommendation with confidence level</li>
                <li>Comprehensive reasoning and insights</li>
                <li>Interactive visualizations</li>
              </ul>
            </div>
            <div class="footer">
              <p>You're receiving this email because you have analysis notifications enabled.</p>
              <p>Manage your notification preferences in Settings.</p>
              <p>&copy; 2024 DESY - Decision Intelligence Platform</p>
            </div>
          </div>
        </body>
      </html>
    `
  }
  
  // Add more templates as needed
  return ''
}
```

#### Step 3: Deploy Edge Function

```bash
supabase functions deploy send-notification-email --no-verify-jwt
```

#### Step 4: Set Environment Variables

In Supabase Dashboard → Edge Functions → Settings:
```
RESEND_API_KEY=your_resend_api_key
```

#### Step 5: Update notification-service.ts

Uncomment the Edge Function call in `src/lib/notification-service.ts`:

```typescript
const { error } = await supabase.functions.invoke('send-notification-email', {
  body: {
    to: user.email,
    subject: `Decision Analysis Complete: ${decisionTitle}`,
    template: 'decision-complete',
    data: {
      decisionTitle,
      decisionId,
      userName: user.user_metadata?.full_name || 'User',
      viewUrl: `${window.location.origin}/decisions/${decisionId}/result`,
    },
  },
});

if (error) {
  console.error("Error sending email:", error);
}
```

### Option 2: Third-Party Email Service (Resend, SendGrid, Mailgun)

#### Using Resend (Recommended)

1. **Sign up for Resend**
   - Visit: https://resend.com
   - Create account and get API key

2. **Install Resend SDK** (if using backend)
   ```bash
   npm install resend
   ```

3. **Create Backend API Endpoint**
   
   File: `api/send-email.ts` (or your backend)
   
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   export async function POST(req: Request) {
     const { to, subject, html } = await req.json();
     
     const { data, error } = await resend.emails.send({
       from: 'DESY <notifications@yourdomain.com>',
       to: [to],
       subject: subject,
       html: html,
     });
     
     if (error) {
       return Response.json({ error }, { status: 500 });
     }
     
     return Response.json({ data });
   }
   ```

4. **Update notification-service.ts**
   
   ```typescript
   // Call your backend API
   const response = await fetch('/api/send-email', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       to: user.email,
       subject: `Decision Analysis Complete: ${decisionTitle}`,
       html: generateEmailHTML('decision-complete', {
         decisionTitle,
         decisionId,
         userName: user.user_metadata?.full_name || 'User',
         viewUrl: `${window.location.origin}/decisions/${decisionId}/result`,
       }),
     }),
   });
   ```

### Option 3: Supabase Auth Hooks (Limited)

Supabase Auth can send emails for auth events, but not for custom notifications. This is only useful for:
- Welcome emails
- Password reset
- Email confirmation

For custom notifications, use Option 1 or 2.

## Email Templates

### Decision Complete Template

**Subject**: Decision Analysis Complete: [Decision Title]

**Content**:
- Greeting with user name
- Decision title
- Summary of what's included
- Call-to-action button to view results
- Footer with unsubscribe/settings link

### New Decision Template

**Subject**: New Decision Created: [Decision Title]

**Content**:
- Confirmation of decision creation
- Next steps
- Link to continue editing

### Weekly Digest Template

**Subject**: Your Weekly Decision Summary

**Content**:
- Number of decisions created
- Number of decisions analyzed
- Top recommendations
- Quick stats
- Link to dashboard

## Testing Email Notifications

### Test in Development

1. **Enable notifications in Settings**
   - Go to `/settings`
   - Toggle ON "Email Notifications"
   - Toggle ON "Analysis Complete"

2. **Create and analyze a decision**
   - Go to `/decisions/new`
   - Fill in decision details
   - Click "Analyze"
   - Wait for analysis to complete

3. **Check console logs**
   - Open browser DevTools (F12)
   - Look for "Sending email notification" logs
   - Verify email details are correct

4. **Check actual email** (if implemented)
   - Check inbox for notification email
   - Verify email formatting
   - Test "View Results" button

### Test Email Templates

Use a service like:
- **Mailtrap** (https://mailtrap.io) - Email testing for development
- **Ethereal Email** (https://ethereal.email) - Fake SMTP service
- **MailHog** - Local email testing tool

## User Notification Preferences

Users can manage their notification preferences in Settings:

```typescript
interface NotificationPreferences {
  emailNotifications: boolean;      // Master toggle
  analysisComplete: boolean;        // Decision analysis complete
  weeklyDigest: boolean;           // Weekly summary email
}
```

Preferences are stored in:
- **localStorage**: `user_preferences_{userId}`
- **Future**: Can be moved to Supabase database table

## Best Practices

### 1. Respect User Preferences
Always check if user has enabled notifications before sending:
```typescript
const preferences = await getUserNotificationPreferences(userId);
if (!preferences.emailNotifications || !preferences.analysisComplete) {
  return; // Don't send
}
```

### 2. Rate Limiting
Implement rate limiting to prevent spam:
- Max 10 emails per hour per user
- Max 50 emails per day per user

### 3. Unsubscribe Link
Always include an unsubscribe link in emails:
```html
<a href="${baseUrl}/settings">Manage notification preferences</a>
```

### 4. Email Deliverability
- Use verified domain for sending
- Implement SPF, DKIM, DMARC records
- Monitor bounce rates
- Handle unsubscribes properly

### 5. Error Handling
```typescript
try {
  await sendEmail();
} catch (error) {
  console.error("Email send failed:", error);
  // Don't block user flow if email fails
}
```

## Monitoring & Analytics

Track email metrics:
- **Sent**: Total emails sent
- **Delivered**: Successfully delivered
- **Opened**: Email open rate
- **Clicked**: Link click rate
- **Bounced**: Failed deliveries
- **Unsubscribed**: Opt-out rate

Use services like:
- Resend Analytics
- SendGrid Analytics
- PostHog for custom tracking

## Troubleshooting

### Emails not sending
1. Check API keys are set correctly
2. Verify Edge Function is deployed
3. Check Supabase logs for errors
4. Test with a simple email first

### Emails going to spam
1. Verify domain authentication (SPF, DKIM)
2. Use a reputable email service
3. Avoid spam trigger words
4. Include unsubscribe link

### User not receiving emails
1. Check user has enabled notifications
2. Verify email address is correct
3. Check spam folder
4. Check email service logs

## Next Steps

1. **Choose email service** (Resend recommended)
2. **Implement Edge Function** or backend API
3. **Design email templates** with your branding
4. **Test thoroughly** in development
5. **Monitor delivery rates** in production
6. **Collect user feedback** on notifications

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [SendGrid API](https://docs.sendgrid.com/)
- [Email Design Best Practices](https://www.campaignmonitor.com/resources/guides/email-design/)

---

**Status**: ✅ Notification system implemented, email sending needs configuration
**Recommendation**: Use Supabase Edge Functions with Resend for best results
