import crypto from "node:crypto";

/**
 * CJ webhook sign header:
 * sign = Base64( HmacSHA256( secret = openId string, message = raw body ) )
 * @see https://developers.cjdropshipping.com/en/api/api2/api/webhook.html
 */
export function verifyCjWebhookSignature(
  rawBody: string,
  signHeader: string | null,
  openId: string
): boolean {
  if (!signHeader || !openId) return false;
  const expected = crypto
    .createHmac("sha256", String(openId))
    .update(rawBody, "utf8")
    .digest("base64");

  try {
    const a = Buffer.from(expected);
    const b = Buffer.from(signHeader);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
