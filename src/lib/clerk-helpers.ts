/**
 * Helper functions for Clerk integration
 */

/**
 * Get the current Clerk user ID
 * This should be called from components that have access to Clerk context
 */
export function getClerkUserId(): string | null {
  // Access Clerk's global instance
  if (typeof window !== 'undefined' && (window as any).Clerk) {
    const clerk = (window as any).Clerk;
    return clerk.user?.id || null;
  }
  return null;
}

/**
 * Get the current user ID or throw an error
 */
export function requireClerkUserId(): string {
  const userId = getClerkUserId();
  if (!userId) {
    throw new Error('User not authenticated. Please log in.');
  }
  return userId;
}
