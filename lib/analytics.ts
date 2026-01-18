import posthog from "posthog-js";

// Helper function to check if PostHog is initialized
const isPostHogReady = (): boolean => {
  return typeof window !== "undefined" && posthog.__loaded;
};

/**
 * Track a custom event
 */
export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
): void => {
  if (!isPostHogReady()) return;

  posthog.capture(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track a click event
 */
export const trackClick = (
  elementName: string,
  properties?: Record<string, unknown>
): void => {
  trackEvent("element_click", {
    element_name: elementName,
    ...properties,
  });
};

/**
 * Track a CTA button click
 */
export const trackCTA = (
  buttonName: string,
  page: string,
  properties?: Record<string, unknown>
): void => {
  trackEvent("cta_click", {
    button_name: buttonName,
    page,
    ...properties,
  });
};

/**
 * Track navigation link click
 */
export const trackNavClick = (
  linkName: string,
  properties?: Record<string, unknown>
): void => {
  trackEvent("nav_click", {
    link_name: linkName,
    ...properties,
  });
};

/**
 * Track form submission
 */
export const trackFormSubmit = (
  formName: string,
  success: boolean,
  properties?: Record<string, unknown>
): void => {
  trackEvent("form_submit", {
    form_name: formName,
    success,
    ...properties,
  });
};

/**
 * Track page view
 */
export const trackPageView = (
  path: string,
  properties?: Record<string, unknown>
): void => {
  if (!isPostHogReady()) return;

  posthog.capture("$pageview", {
    $current_url: typeof window !== "undefined" ? window.location.href : "",
    path,
    referrer: typeof document !== "undefined" ? document.referrer : "",
    ...properties,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (
  depthPercent: number,
  page: string
): void => {
  trackEvent("scroll_depth", {
    depth_percent: depthPercent,
    page,
  });
};

/**
 * Track product view
 */
export const trackProductView = (
  productId: string,
  productName: string,
  category: string,
  properties?: Record<string, unknown>
): void => {
  trackEvent("product_view", {
    product_id: productId,
    product_name: productName,
    category,
    ...properties,
  });
};

/**
 * Track service view
 */
export const trackServiceView = (
  serviceId: string,
  serviceName: string,
  properties?: Record<string, unknown>
): void => {
  trackEvent("service_view", {
    service_id: serviceId,
    service_name: serviceName,
    ...properties,
  });
};

/**
 * Track mobile menu toggle
 */
export const trackMobileMenu = (isOpen: boolean): void => {
  trackEvent("mobile_menu_toggle", {
    action: isOpen ? "open" : "close",
  });
};

/**
 * Identify a user (for authenticated sessions)
 */
export const identifyUser = (
  userId: string,
  traits?: Record<string, unknown>
): void => {
  if (!isPostHogReady()) return;

  posthog.identify(userId, traits);
};

/**
 * Reset user identity (on logout)
 */
export const resetUser = (): void => {
  if (!isPostHogReady()) return;

  posthog.reset();
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (
  page: string,
  timeInSeconds: number
): void => {
  trackEvent("time_on_page", {
    page,
    time_seconds: timeInSeconds,
    time_formatted: formatTime(timeInSeconds),
  });
};

// Helper to format time
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};
