import { auth } from "@clerk/nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import { links, loggedLinks, adminLinks } from "@/utils/links";
import UserIcon from "./UserIcon";
import SignOutLink from "./SignOutLink";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

function LinksDropdown() {
  const { userId } = auth();
  const isAdmin = userId === process.env.CLERK_ADMIN_USER_ID;
  console.log("isAdmin", isAdmin);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="start" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>

        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="capitalize w-full">
                {link.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem></DropdownMenuItem>

        <SignedIn>
          {loggedLinks.map((link) => {
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
        </SignedIn>

        {isAdmin && (
          <SignedIn>
            {adminLinks.map((link) => {
              return (
                <div key={link.href} className="bg-red-300">
                  <DropdownMenuItem>
                    <Link href={link.href} className="capitalize w-full">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                </div>
              );
            })}
          </SignedIn>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutLink />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
