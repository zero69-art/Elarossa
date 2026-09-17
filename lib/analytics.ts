export type ElarossaEvent =
  | "view_item"
  | "search"
  | "add_to_cart"
  | "begin_checkout"
  | "purchase"
  | "newsletter_signup";

export function track(event: ElarossaEvent, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(`elarossa:${event}`, { detail: payload }));
}
