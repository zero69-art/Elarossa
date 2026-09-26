import { redirect } from "next/navigation";

export default function SwimRedirect() {
  redirect("/products?category=swimwear");
}
