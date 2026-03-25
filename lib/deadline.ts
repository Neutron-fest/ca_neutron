// Form deadline configuration
// Month is 0-indexed: 0 = January, 1 = February, etc.
export const FORM_DEADLINE = new Date(2026, 1, 3, 14, 30, 0); // February 3, 2026, 2:30 PM

// Format deadline for display
export function formatDeadline(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Check if form is closed
export function isFormClosed(): boolean {
  const now = new Date();
  return now >= FORM_DEADLINE;
}

// Get formatted deadline string
export function getFormattedDeadline(): string {
  return formatDeadline(FORM_DEADLINE);
}
