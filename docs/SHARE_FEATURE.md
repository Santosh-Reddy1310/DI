# 🔗 Share Feature Documentation

## Overview
The Share feature allows users to share their decision analysis results with others through multiple channels including social media, email, and direct links.

---

## Features

### 📋 Copy Link
- **One-click copy** to clipboard
- **Visual feedback** with checkmark icon when copied
- **Toast notification** confirms successful copy
- Works on all devices and browsers

### 📱 Native Share (Mobile)
- **Web Share API** integration for mobile devices
- Opens native share sheet on iOS/Android
- Allows sharing to any app installed on device
- Includes decision title, summary, and link

### 🌐 Social Media Sharing
Direct sharing to popular platforms:

1. **Twitter/X**
   - Opens Twitter compose window
   - Pre-filled with decision summary and link
   - Character-optimized for Twitter

2. **LinkedIn**
   - Professional network sharing
   - Opens LinkedIn share dialog
   - Ideal for career and business decisions

3. **Facebook**
   - Share to Facebook timeline
   - Opens Facebook share dialog
   - Good for personal decisions

4. **WhatsApp**
   - Share via WhatsApp Web or app
   - Pre-filled message with link
   - Great for quick sharing with friends

### 📧 Email Sharing
- **Opens default email client**
- Pre-filled subject line with decision title
- Body includes summary and analysis link
- Professional format for stakeholder sharing

---

## How It Works

### User Flow
1. User completes decision analysis
2. Clicks "Share" button on results page
3. Share dialog opens with multiple options
4. User selects preferred sharing method
5. Content is shared with pre-filled information

### Share Content
Each share includes:
- **Title**: "Decision Analysis: [Decision Title]"
- **Summary**: Recommended option with confidence level
- **Link**: Direct URL to analysis results page
- **Context**: Brief description of the decision

### Example Share Text
```
I used DESY to analyze "Choose a Smartphone". 
Recommended: Google Pixel 8 Pro with 90% confidence.

View the full analysis: https://desy.app/decisions/abc123/result
```

---

## Technical Implementation

### Components

#### ShareDialog Component
**Location**: `src/components/results/ShareDialog.tsx`

**Props**:
```typescript
interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  decision: Decision;
  result: AnalysisResult;
}
```

**Features**:
- Modal dialog with shadcn/ui Dialog component
- Copy to clipboard functionality
- Social media integration
- Email sharing
- Native share API support
- Visual feedback and toast notifications

#### Integration in DecisionResult
**Location**: `src/pages/DecisionResult.tsx`

**State**:
```typescript
const [showShareDialog, setShowShareDialog] = useState(false);
```

**Trigger**:
```typescript
<Button onClick={() => setShowShareDialog(true)}>
  <Share2 className="h-4 w-4" />
  Share
</Button>
```

---

## Browser Compatibility

### Web Share API (Native Share)
- ✅ iOS Safari 12.2+
- ✅ Android Chrome 61+
- ✅ Android Firefox 71+
- ❌ Desktop browsers (fallback to copy link)

### Clipboard API
- ✅ Chrome 63+
- ✅ Firefox 53+
- ✅ Safari 13.1+
- ✅ Edge 79+

### Social Media Sharing
- ✅ All modern browsers
- Opens in new window/tab
- No special permissions required

---

## Privacy & Security

### What Gets Shared
- ✅ Decision title
- ✅ Recommended option
- ✅ Confidence level
- ✅ Public URL to results page

### What Doesn't Get Shared
- ❌ User personal information
- ❌ Email address
- ❌ Account details
- ❌ Private decision context (unless user chooses)

### Access Control
- Shared links are **public URLs**
- Anyone with the link can view the analysis
- No authentication required to view shared results
- User can delete decision to remove access

---

## User Experience

### Desktop Experience
1. Click "Share" button
2. Dialog opens with sharing options
3. Choose from:
   - Copy link
   - Social media platforms
   - Email
4. Confirmation toast appears
5. Dialog closes automatically (for social/email)

### Mobile Experience
1. Click "Share" button
2. Dialog opens
3. "Share via..." button appears (native share)
4. Tap to open native share sheet
5. Choose any installed app
6. Share completes

### Visual Feedback
- ✅ Copy button shows checkmark when copied
- ✅ Toast notifications for all actions
- ✅ Preview of share text in dialog
- ✅ Hover states on all buttons
- ✅ Icons for each sharing method

---

## Customization Options

### Share Text Template
Located in `ShareDialog.tsx`:
```typescript
const shareText = `I used DESY to analyze "${decision.title}". 
Recommended: ${result.recommendation.optionLabel} 
with ${Math.round(result.recommendation.confidence * 100)}% confidence.`;
```

### Social Media URLs
- **Twitter**: `https://twitter.com/intent/tweet?text={text}`
- **LinkedIn**: `https://www.linkedin.com/sharing/share-offsite/?url={url}`
- **Facebook**: `https://www.facebook.com/sharer/sharer.php?u={url}`
- **WhatsApp**: `https://wa.me/?text={text}`

### Email Template
```
Subject: Decision Analysis: {decision.title}
Body: {shareText}

View the full analysis: {url}
```

---

## Future Enhancements

### Planned Features
- [ ] **QR Code generation** for easy mobile sharing
- [ ] **Embed code** for websites/blogs
- [ ] **PDF attachment** option for email
- [ ] **Slack integration** for team sharing
- [ ] **Microsoft Teams** integration
- [ ] **Custom share messages** per platform
- [ ] **Share analytics** (view counts)
- [ ] **Private sharing** with password protection
- [ ] **Expiring links** for temporary access
- [ ] **Share to specific users** within app

### Potential Integrations
- Notion
- Confluence
- Google Drive
- Dropbox
- Telegram
- Discord

---

## Testing

### Manual Testing Checklist

#### Copy Link
- [ ] Click copy button
- [ ] Verify checkmark appears
- [ ] Verify toast notification
- [ ] Paste link in browser
- [ ] Verify it opens correct page

#### Native Share (Mobile)
- [ ] Open on mobile device
- [ ] Click "Share via..." button
- [ ] Verify native sheet opens
- [ ] Share to test app
- [ ] Verify content is correct

#### Social Media
- [ ] Click Twitter button
- [ ] Verify compose window opens
- [ ] Check pre-filled text
- [ ] Repeat for LinkedIn, Facebook, WhatsApp

#### Email
- [ ] Click email button
- [ ] Verify email client opens
- [ ] Check subject line
- [ ] Check body content
- [ ] Verify link is included

#### Edge Cases
- [ ] Test with long decision titles
- [ ] Test with special characters
- [ ] Test on different browsers
- [ ] Test on mobile and desktop
- [ ] Test with sample decisions

---

## Troubleshooting

### Common Issues

**Issue**: Copy button doesn't work
- **Cause**: Clipboard API not supported or blocked
- **Solution**: Use HTTPS, check browser permissions

**Issue**: Native share doesn't appear
- **Cause**: Desktop browser or unsupported device
- **Solution**: Expected behavior, use other options

**Issue**: Social media window blocked
- **Cause**: Pop-up blocker
- **Solution**: Allow pop-ups for the site

**Issue**: Email client doesn't open
- **Cause**: No default email client configured
- **Solution**: Copy link manually and paste in email

---

## Analytics & Metrics

### Trackable Events
- Share button clicked
- Share method selected (copy, social, email)
- Share completed successfully
- Share cancelled/failed
- Platform-specific shares (Twitter, LinkedIn, etc.)

### Useful Metrics
- Most popular sharing method
- Share conversion rate
- Platforms driving most traffic
- Time of day for sharing
- Decision types most shared

---

## Accessibility

### Keyboard Navigation
- ✅ Tab through all buttons
- ✅ Enter/Space to activate
- ✅ Escape to close dialog

### Screen Readers
- ✅ Proper ARIA labels
- ✅ Dialog role and title
- ✅ Button descriptions
- ✅ Status announcements

### Visual
- ✅ High contrast icons
- ✅ Clear button labels
- ✅ Visual feedback for actions
- ✅ Responsive design

---

## Code Examples

### Basic Usage
```typescript
import { ShareDialog } from "@/components/results/ShareDialog";

function MyComponent() {
  const [showShare, setShowShare] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowShare(true)}>
        Share
      </Button>
      
      <ShareDialog
        open={showShare}
        onOpenChange={setShowShare}
        decision={decision}
        result={result}
      />
    </>
  );
}
```

### Custom Share Text
```typescript
const customShareText = `Check out my analysis: ${decision.title}`;
```

### Programmatic Share
```typescript
async function shareDecision() {
  if (navigator.share) {
    await navigator.share({
      title: decision.title,
      text: shareText,
      url: window.location.href,
    });
  }
}
```

---

## Best Practices

### For Users
1. **Review before sharing** - Check the analysis is complete
2. **Consider privacy** - Shared links are public
3. **Choose right platform** - LinkedIn for professional, WhatsApp for personal
4. **Add context** - Explain why you're sharing when posting

### For Developers
1. **Test all platforms** - Verify each sharing method works
2. **Handle errors gracefully** - Show helpful messages
3. **Optimize share text** - Keep it concise and engaging
4. **Track analytics** - Understand user behavior
5. **Respect privacy** - Don't share sensitive data

---

## Support

### User Questions
**Q: Can I share privately?**
A: Currently all shares are public. Private sharing coming soon.

**Q: Can I edit the share message?**
A: Not yet, but you can copy the link and write your own message.

**Q: How long do shared links work?**
A: Links work as long as the decision exists. Delete the decision to revoke access.

**Q: Can I see who viewed my shared decision?**
A: Not currently. View analytics coming in future update.

---

**Status**: ✅ Implemented and Ready
**Version**: 1.0.0
**Last Updated**: February 3, 2026
