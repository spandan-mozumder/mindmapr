import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import logo from "../assets/logo.png"
import Image from "next/image";

const Header = () => {
  return (
    <header>
        <nav>
            <Link href="/">
                  <Image src={logo} alt="mindmapr logo" width={200} height={60} />
            </Link>
        </nav>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
    </header>
  );
};

export default Header;
