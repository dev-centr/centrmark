/* Food Truck Nerdz — shared Silktide Consent Manager init (keep in sync across site-nextjs + site-solidstart). */
(function initSilktideConsent() {
  if (typeof window === "undefined" || !window.silktideConsentManager) {
    return;
  }

  window.silktideConsentManager.init({
    namespace: "ftn",
    eventName: "stcm_consent_update",
    prompt: {
      position: "bottomCenter",
    },
    icon: {
      position: "bottomLeft",
    },
    backdrop: {
      show: true,
    },
    text: {
      prompt: {
        description:
          "<p>We use cookies to run the site, sign you in, and understand how people use Food Truck Nerdz. You can change your mind anytime. See our <a href=\"/privacy\">Privacy Policy</a> for details.</p>",
        acceptAllButtonText: "Accept all",
        acceptAllButtonAccessibleLabel: "Accept all cookies",
        rejectNonEssentialButtonText: "Reject non-essential",
        rejectNonEssentialButtonAccessibleLabel: "Reject all non-essential cookies",
        preferencesButtonText: "Preferences",
        preferencesButtonAccessibleLabel: "Manage cookie preferences",
      },
      preferences: {
        title: "Cookie preferences",
        description:
          "<p>Choose which cookies we can use. Essential cookies are always on so the site can work.</p>",
        saveButtonText: "Save and close",
        saveButtonAccessibleLabel: "Save your cookie preferences",
        creditLinkText: "Get this consent manager for free",
        creditLinkAccessibleLabel: "Silktide Consent Manager — open source",
      },
    },
    consentTypes: [
      {
        id: "essential",
        label: "Essential",
        description:
          "Required for the site to work (session, security, load balancing). These cannot be turned off.",
        required: true,
      },
      {
        id: "analytics",
        label: "Analytics",
        description:
          "Helps us understand traffic and improve the product (e.g. page views, errors).",
        defaultValue: false,
        gtag: "analytics_storage",
      },
      {
        id: "marketing",
        label: "Marketing",
        description:
          "Used to measure ads and similar campaigns if we run them in the future.",
        defaultValue: false,
        gtag: ["ad_storage", "ad_user_data", "ad_personalization"],
      },
    ],
  });
})();
