export class GoogleAnalytics {
  private static gtag(...args) {
    window &&
      (<any>window).dataLayer &&
      (<any>window).dataLayer.push(arguments);
  }

  public static initialize() {
    GoogleAnalytics.gtag("js", new Date());
    GoogleAnalytics.gtag("config", "UA-126482277-2", {
      app_name: "web.mfgdocent",
    });
  }

  public static trackPage(pageName: string) {
    GoogleAnalytics.gtag("config", "UA-126482277-2", {
      page_path: "/" + pageName,
    });
  }

  public static trackView(viewName: string) {
    GoogleAnalytics.gtag("event", "screen_view", { screen_name: viewName });
  }

  public static trackEvent(
    categoryName: string,
    actionName: string,
    label: string
  ) {
    GoogleAnalytics.gtag("event", actionName, {
      event_category: categoryName,
      event_label: label,
    });
  }

  public static trackQuantifiedEvent(
    categoryName: string,
    actionName: string,
    label: string,
    value: number
  ) {
    GoogleAnalytics.gtag("event", actionName, {
      event_category: categoryName,
      event_label: label,
      event_value: value,
    });
  }
}
