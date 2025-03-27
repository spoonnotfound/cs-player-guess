import CounterStrikleGame from "@/components/CounterStrikleGame";
import Image from "next/image";

export const metadata = {
  title: "Counter Strikle - The Wordle of CS. Guess the mystery player",
  description: "Do you want to test your Counter Strike player knowledge? Put it to the test and guess the mystery player of the day on BLAST.tv.",
};

export default function Home() {
  return (
    <main className="bg-background relative min-h-screen w-full flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <Image
          src="https://ext.same-assets.com/1433263999/2759925914.false"
          alt="Background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </div>

      <div className="flex justify-center min-h-screen">
        <div className="max-width-section custom-scrollbar grow overflow-x-auto">
          <CounterStrikleGame />
        </div>
      </div>
    </main>
  );
}
