import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-[100%] mx-auto flex items-center justify-center min-h-screen bg-blue-400 flex-col">
      <h2 className="text-4xl font-extrabold mb-4">Notes</h2>
      <Link href={"/notes"} className="underline">
        Explore notes
      </Link>
    </main>
  );
}
