export function isAdminRequest(request: Request): boolean {
  const configured = process.env.ADMIN_ACCESS_TOKEN;
  if (!configured) return false; // fail closed if no token is configured
  const header = request.headers.get("x-admin-token") || "";
  return header.length > 0 && header === configured;
}
