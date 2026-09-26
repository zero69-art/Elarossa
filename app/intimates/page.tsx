import { redirect } from "next/navigation";

export default function IntimatesRedirect() {
  redirect("/products?category=intimates");
}
