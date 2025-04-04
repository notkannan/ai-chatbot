import Image from "next/image";
import Link from "next/link";
import NEU from "@/../public/NEU.png";
import IM from "@/../public/im.png";

export default function Home() {
  return (
    <main className="absolute inset-0 flex justify-center items-center bg-gray-100">
      <Link 
        href="https://northeastern.edu" 
        target="_blank"
      >
        <Image
          src={NEU}
          alt="Northeastern University's Logo"
          width={375}
        ></Image>
      </Link>
      <div className="h-[450px] border-l border-l-gray-500 rounded-2xl"></div>
      <Link
        href="https://recreation.northeastern.edu/intramural-sports/"
        target="_blank"
      >
        <Image
          src={IM}
          alt="Northeastern University Intramural League's Logo"
          width={375}
          className="ml-10"
        ></Image>
      </Link>
    </main>
  );
}
