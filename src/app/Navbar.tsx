import { getCart } from "@/wix-api/cart";
import logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";

export default async function Navbar() {
  const wixClient = getWixServerClient();

  const [cart, loggedInMember] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
  ]);

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Flow Shop logo" width={40} height={40} />
          <span className="text-xl font-bold">Flow Shop</span>
        </Link>
        <div className="flex items-center justify-center gap-5"></div>
        <UserButton loggedInMember={loggedInMember} className="my-0" />
        <ShoppingCartButton initialData={cart} />
      </div>
    </header>
  );
}
