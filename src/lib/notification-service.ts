import { supabase } from "@/integrations/supabase/client";

interface NotificationPreferences {
  emailNotifications: boolean;
  analysisComplete: boolean;
  weeklyDigest: boolean;
}

/**
 * Get user notification preferences
 */
export async function getUserNotificationPreferences(userId: string): Promise<NotificationPreferences> {
  try {
    const savedPreferences = localStorage.getItem(`user_preferences_${userId}`);
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      return {
        emailNotifications: preferences.emailNotifications ?? true,
        analysisComplete: preferences.analysisComplete ?? true,
        weeklyDigest: preferences.weeklyDigest ?? false,
      };
    }
  } catch (error) {
    console.error("Error loading notification preferences:", error);
  }

  // Default preferences
  return {
    emailNotifications: true,
    analysisComplete: true,
    weeklyDigest: false,
  };
}

/**
 * Send email notification when decision analysis is complete
 */
export async function sendDecisionCompleteNotification(
  userId: string,
  decisionTitle: string,
  decisionId: string
): Promise<void> {
  try {
    // Get user preferences
    const preferences = await getUserNotificationPreferences(userId);

    // Check if user wants email notifications
    if (!preferences.emailNotifications || !preferences.analysisComplete) {
      console.log("User has disabled analysis complete notifications");
      return;
    }

    // Get user email
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      console.error("User email not found");
      return;
    }

    // In a real application, you would call your backend API or Supabase Edge Function
    // to send the email. For now, we'll log it and show a toast notification.
    
    console.log("Sending email notification:", {
      to: user.email,
      subject: `Decision Analysis Complete: ${decisionTitle}`,
      decisionId,
    });

    // TODO: Implement actual email sending via:
    // 1. Supabase Edge Function
    // 2. Third-party email service (SendGrid, Mailgun, etc.)
    // 3. Custom backend API
    
    // Example Edge Function call:
    /*
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
    */

  } catch (error) {
    console.error("Error sending decision complete notification:", error);
  }
}

/**
 * Send email notification when a new decision is created
 */
export async function sendNewDecisionNotification(
  userId: string,
  decisionTitle: string,
  decisionId: string
): Promise<void> {
  try {
    // Get user preferences
    const preferences = await getUserNotificationPreferences(userId);

    // Check if user wants email notifications
    if (!preferences.emailNotifications) {
      console.log("User has disabled email notifications");
      return;
    }

    // Get user email
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      console.error("User email not found");
      return;
    }

    console.log("Sending new decision notification:", {
      to: user.email,
      subject: `New Decision Created: ${decisionTitle}`,
      decisionId,
    });

    // TODO: Implement actual email sending
    // See sendDecisionCompleteNotification for implementation details

  } catch (error) {
    console.error("Error sending new decision notification:", error);
  }
}

/**
 * Send weekly digest email
 */
export async function sendWeeklyDigest(userId: string): Promise<void> {
  try {
    // Get user preferences
    const preferences = await getUserNotificationPreferences(userId);

    // Check if user wants weekly digest
    if (!preferences.emailNotifications || !preferences.weeklyDigest) {
      console.log("User has disabled weekly digest");
      return;
    }

    // Get user email
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      console.error("User email not found");
      return;
    }

    // Get decisions from the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data: decisions, error } = await supabase
      .from('decisions')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', oneWeekAgo.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching decisions for digest:", error);
      return;
    }

    console.log("Sending weekly digest:", {
      to: user.email,
      decisionsCount: decisions?.length || 0,
    });

    // TODO: Implement actual email sending with digest template

  } catch (error) {
    console.error("Error sending weekly digest:", error);
  }
}
