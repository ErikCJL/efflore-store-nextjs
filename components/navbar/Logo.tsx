import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import efflore from "@/public/images/efflore_texto.png";

function Logo() {
  return (
    <Button variant={"ghost"} size="default" asChild>
      <Link href="/">
        <Image
          src={efflore}
          alt="Efflore"
          width={170} // Customize width
          height={70} // Customize height
        />
      </Link>
    </Button>
  );
}

export default Logo;
