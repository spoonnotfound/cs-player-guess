import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState } from "react";

const CounterStrikleContainer = () => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  
  return (
    <div className="m-auto flex h-full max-w-2xl flex-col items-center overflow-y-hidden pt-24 pb-12 max-md:min-h-screen md:min-h-[800px] md:justify-center">
      {/* How to Play Modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 relative">
              <button 
                onClick={() => setShowHowToPlay(false)}
                className="absolute right-4 top-4 text-foreground/60 hover:text-foreground"
              >
                <X className="size-6" />
              </button>
              
              <h1 className="font-style-heading-h5 text-foreground text-3xl mb-8 text-center">How to play</h1>
              
              <div className="max-w-lg mx-auto space-y-8">
                <p className="font-style-body-b1 text-center text-foreground/90">
                  You have 8 attempts to guess the mystery cs player.
                  <br />
                  Everyday there will be a new Counter-Strikle so make sure you come back daily!
                </p>

                <div className="space-y-6">
                  <h2 className="font-style-heading-h5 text-xl uppercase">Answers</h2>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-36 h-10 bg-green-500 rounded flex items-center justify-center">
                        <span className="font-bold text-white">Green boxes</span>
                      </div>
                      <span className="text-foreground/90">are correct answers.</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-36 h-10 bg-yellow-600 rounded flex items-center justify-center">
                        <span className="font-bold text-white">Orange boxes</span>
                      </div>
                      <span className="text-foreground/90">are close answers.</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-36 h-10 bg-[#2a133a] rounded flex items-center justify-center">
                        <span className="font-bold text-white">Blank boxes</span>
                      </div>
                      <span className="text-foreground/90">are incorrect answers.</span>
                    </div>

                    <div className="flex items-center gap-4 text-foreground/90">
                      <span className="text-white">👋</span>
                      <span>Hover on each answer for more help.</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="font-style-heading-h5 text-xl uppercase">Regions</h2>
                  <p className="font-style-body-b1 text-foreground/90">
                    North America, South America, Europe, CIS, Middle East & Africa, Asia, Oceania
                  </p>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setShowHowToPlay(false)}
                    className="button w-40 py-3 text-lg font-bold uppercase"
                  >
                    OK, COOL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    
      <div className="flex flex-col items-center gap-6">
        <Image
          src="https://ext.same-assets.com/1433263999/14102037.svg"
          alt="Counter Strikle Logo"
          className="w-full max-w-xs max-md:max-w-60"
          width={320}
          height={100}
        />
        <span className="font-style-heading-h5 text-foreground/95">Guess the mystery CS player</span>
      </div>

      <div className="relative w-full overflow-visible mt-12">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-foreground/70" />
          <input
            className="w-full rounded border border-primary/70 bg-background py-3 pr-4 pl-12 placeholder:font-style-body-b2 focus:border-primary disabled:border-primary/30"
            placeholder="Type a CS player's name..."
            type="text"
            role="combobox"
            aria-expanded="false"
            aria-autocomplete="list"
            aria-controls="player-suggestions"
            id="player-search"
          />
        </div>
      </div>

      <div
        className="custom-scrollbar w-full overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: "0px" }}
        id="player-suggestions"
      >
        <table className="w-full table-fixed border-separate border-spacing-y-1 text-center select-none">
          <thead>
            <tr className="truncate bg-[#2a133a] font-style-label-l4 [&>th]:p-2">
              <th className="rounded-l-sm">Name</th>
              <th>Team</th>
              <th className="w-20 max-md:w-12">Nat</th>
              <th className="w-20 max-md:w-14">Age</th>
              <th className="w-20 max-md:w-14">Role</th>
              <th className="w-20 rounded-r-sm max-md:w-12">Maj App</th>
            </tr>
          </thead>
          <tbody>
            {/* Results will be populated here */}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-3 opacity-0 mt-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="duration-default h-1 w-3 rounded-full bg-[#2a133a] transition-all ease-in-out"
          />
        ))}
      </div>

      <div className="mt-12 flex items-center gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHowToPlay(true)}
            className="duration-default font-style-label-l3 text-foreground/95 transition-all ease-in-out hover:text-white hover:opacity-80"
          >
            How to play
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounterStrikleContainer;
