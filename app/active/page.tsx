import { redirect } from "next/navigation";

export default function ActiveRedirect() {
  redirect("/products?category=activewear");
}
