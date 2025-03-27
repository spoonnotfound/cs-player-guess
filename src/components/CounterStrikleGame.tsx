'use client';

import Image from "next/image";
import Link from "next/link";
import { Search, ChevronUp, ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import playersData from '../../cs_players_detailed_data.json';

// Define player data structure
type PlayerInfo = {
  id: string;
  nickname: string;
  firstName: string;
  lastName: string;
  nationality: string;
  region: string;
  team: string;
  age: number;
  majorAppearances: number;
  role: string;
  isRetired: boolean;
};

// Country flags mapping
const countryFlags: { [key: string]: string } = {
  "Bosnia and Herzegovina": "🇧🇦",
  "Ukraine": "🇺🇦",
  "Russian Federation": "🇷🇺",
  "France": "🇫🇷",
  "Denmark": "🇩🇰",
  "Canada": "🇨🇦",
  "Israel": "🇮🇱",
  "Estonia": "🇪🇪",
  "Sweden": "🇸🇪",
  "South Africa": "🇿🇦",
  "Turkey": "🇹🇷",
  "China": "🇨🇳",
  "Finland": "🇫🇮",
  "Latvia": "🇱🇻",
  "Belgium": "🇧🇪",
  "Brazil": "🇧🇷",
  "Australia": "🇦🇺",
  "United States of America": "🇺🇸",
  "Serbia": "🇷🇸",
  "Bulgaria": "🇧🇬",
  "Lithuania": "🇱🇹",
  "Norway": "🇳🇴",
  "Malaysia": "🇲🇾",
  "Kosovo, Republic of": "🇽🇰",
  "Montenegro": "🇲🇪",
  "Romania": "🇷🇴",
  "Poland": "🇵🇱",
  "Kazakhstan": "🇰🇿",
  "Germany": "🇩🇪",
  "Spain": "🇪🇸",
  "United Kingdom of Great Britain and Northern Ireland": "🇬🇧",
  "Argentina": "🇦🇷",
  "Czechia": "🇨🇿",
  "Hong Kong": "🇭🇰",
  "Mongolia": "🇲🇳",
  "Hungary": "🇭🇺",
  "Netherlands": "🇳🇱",
  "Slovakia": "🇸🇰",
  "Switzerland": "🇨🇭",
  "Portugal": "🇵🇹",
  "Uruguay": "🇺🇾",
  "North Macedonia": "🇲🇰",
};

// Team logo mapping
const teamLogos: { [key: string]: string } = {
  "navi": "NAVI",
  "vitality": "Vitality",
  "g2": "G2",
  "astralis": "Astralis",
  "cloud9": "Cloud9",
  "faze": "FaZe",
  "fnatic": "Fnatic",
  "complexity": "Complexity",
  "liquid": "Liquid",
  "mouz": "MOUZ",
  "spirit": "Spirit",
  "heroic": "Heroic",
  "falcons": "Falcons",
  "eternalfire": "Eternal Fire",
  "FA": "Free Agent",
  "intothebreach": "Into The Breach",
  "9z": "9z",
  "metizport": "Metizport",
  "furia": "FURIA",
  "imperial": "Imperial",
  "tyloo": "TYLOO",
  "ence": "ENCE",
  "big": "BIG",
  "eg": "EG",
  "00nation": "00Nation",
  "1win": "1win",
  "3dmax": "3DMAX",
  "500": "500",
  "9ine": "9ine",
  "9pandas": "9pandas",
  "alliance": "Alliance",
  "aurora": "Aurora",
  "badnewseagles": "Bad News Eagles",
  "bb": "BB",
  "cphflames": "Copenhagen Flames",
  "flyquest": "FlyQuest",
  "fluxo": "Fluxo",
  "gamerlegion": "GamerLegion",
  "godsent": "GODSENT",
  "invictus": "Invictus",
  "jano": "Jano",
  "legacy": "Legacy",
  "m80": "M80",
  "marcos": "Marcos",
  "mibr": "MIBR",
  "mongolz": "The MongolZ",
  "monte": "Monte",
  "movistar": "Movistar Riders",
  "nip": "NIP",
  "nouns": "Nouns",
  "og": "OG",
  "pain": "paiN",
  "parivision": "Parivision",
  "partyastronauts": "Party Astronauts",
  "rareatom": "Rare Atom",
  "sashi": "Sashi",
  "saw": "SAW",
  "sharks": "Sharks",
  "sinners": "SINNERS",
  "sprout": "Sprout",
  "talon": "Talon",
  "vertex": "Vertex",
  "virtuspro": "Virtus.pro",
  "wildcard": "Wildcard",
  "b8": "B8",
  "eyb": "EYB",
  "Retired": "Retired",
};

// Parse the player database from the JSON file
const playerDatabase: PlayerInfo[] = playersData as PlayerInfo[];

// Mystery player for today (in a real app, this would be determined on the server and fixed for 24 hours)
const todaysMysteryPlayer: PlayerInfo = playerDatabase[5]; // ZywOo

type ResultStatus = 'correct' | 'close' | 'incorrect';

type GuessResultData = {
  name: ResultStatus;
  team: ResultStatus;
  nationality: ResultStatus;
  age: ResultStatus;
  role: ResultStatus;
  majorAppearances: ResultStatus;
};

type GuessResult = {
  player: PlayerInfo;
  results: GuessResultData;
  comparison: {
    age: 'higher' | 'lower' | 'equal';
    majorAppearances: 'higher' | 'lower' | 'equal';
  };
};

type ComparisonResult = 'higher' | 'lower' | 'equal';

const CounterStrikleGame = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerInfo[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [remainingGuesses, setRemainingGuesses] = useState(8);
  const [message, setMessage] = useState("");
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPlayers([]);
      setShowDropdown(false);
      return;
    }

    const filtered = playerDatabase.filter(player =>
      player.nickname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlayers(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchQuery]);

  const getComparisonResult = (val1: number, val2: number): ComparisonResult => {
    if (val1 === val2) return 'equal';
    return val1 > val2 ? 'higher' : 'lower';
  };

  const evaluateGuess = (player: PlayerInfo): GuessResult => {
    // Create results object with proper types
    const resultsData: GuessResultData = {
      name: player.nickname === todaysMysteryPlayer.nickname ? 'correct' : 'incorrect',
      team: player.team === todaysMysteryPlayer.team ? 'correct' : 'incorrect', // No 'close' for teams
      nationality: 'incorrect',
      age: 'incorrect',
      role: player.role === todaysMysteryPlayer.role ? 'correct' : 'incorrect',
      majorAppearances: 'incorrect',
    };

    // Comparison data for arrows
    const comparison = {
      age: getComparisonResult(player.age, todaysMysteryPlayer.age),
      majorAppearances: getComparisonResult(player.majorAppearances, todaysMysteryPlayer.majorAppearances),
    };

    // Nationality evaluation - correct if same, close if same region
    if (player.nationality === todaysMysteryPlayer.nationality) {
      resultsData.nationality = 'correct';
    } else if (player.region === todaysMysteryPlayer.region) {
      resultsData.nationality = 'close';
    }

    // Age close if within 2 years
    if (player.age === todaysMysteryPlayer.age) {
      resultsData.age = 'correct';
    } else if (Math.abs(player.age - todaysMysteryPlayer.age) <= 2) {
      resultsData.age = 'close';
    }

    // Major appearances close if within 2
    if (player.majorAppearances === todaysMysteryPlayer.majorAppearances) {
      resultsData.majorAppearances = 'correct';
    } else if (Math.abs(player.majorAppearances - todaysMysteryPlayer.majorAppearances) <= 2) {
      resultsData.majorAppearances = 'close';
    }

    return { player, results: resultsData, comparison };
  };

  const handlePlayerSelect = (player: PlayerInfo) => {
    // Check if player already guessed
    if (guesses.some(guess => guess.player.nickname === player.nickname)) {
      setMessage("You've already guessed this player!");
      setShowDropdown(false);
      setSearchQuery("");
      return;
    }

    // Check if game is over
    if (gameOver) {
      return;
    }

    const result = evaluateGuess(player);
    const newGuesses = [...guesses, result];
    setGuesses(newGuesses);
    setRemainingGuesses(remainingGuesses - 1);
    setSearchQuery("");
    setShowDropdown(false);

    // Check if player guessed correctly
    if (player.nickname === todaysMysteryPlayer.nickname) {
      setGameOver(true);
      setMessage("Congratulations! You found the mystery player!");
    }
    // Check if out of guesses
    else if (remainingGuesses <= 1) {
      setGameOver(true);
      setMessage(`You're out of guesses!`);
    }
  };

  const getResultColor = (result: ResultStatus) => {
    switch (result) {
      case 'correct': return 'bg-green-500';
      case 'close': return 'bg-yellow-600';
      case 'incorrect': return 'bg-[#2a133a]';
    }
  };

  const getFormattedTeamName = (teamCode: string) => {
    return teamLogos[teamCode] || teamCode;
  };

  return (
    <div className="m-auto flex h-full max-w-4xl flex-col items-center overflow-y-hidden pt-10 pb-12 max-md:min-h-screen md:min-h-[800px] md:justify-center px-4">
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
      
      <div className="flex flex-col items-center gap-6 mb-10">
        <Image
          src="https://ext.same-assets.com/1433263999/14102037.svg"
          alt="Counter Strikle Logo"
          className="w-full max-w-xs max-md:max-w-60"
          width={320}
          height={100}
        />
        <span className="font-style-heading-h5 text-foreground/95">Guess the mystery CS player</span>
      </div>

      {message && (
        <div className={`mt-4 mb-4 p-3 px-5 rounded text-center w-full max-w-2xl ${message.includes('Congratulations') ? 'bg-green-500/20 text-green-300' : 'bg-background text-yellow-500'}`}>
          <div className="flex items-center gap-2 justify-center">
            <Search className="size-5" />
            <span>{message}</span>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-2xl overflow-visible mt-6 mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-foreground/70" />
          <input
            ref={inputRef}
            className="w-full rounded border border-primary/70 bg-background py-3 pr-4 pl-12 placeholder:font-style-body-b2 focus:border-primary disabled:border-primary/30"
            placeholder="Type a CS player's name..."
            type="text"
            role="combobox"
            aria-expanded={showDropdown}
            aria-autocomplete="list"
            aria-controls="player-suggestions"
            id="player-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={gameOver}
          />
        </div>

        {showDropdown && filteredPlayers.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded border border-primary/30 bg-background shadow-lg">
            <ul className="custom-scrollbar max-h-60 overflow-auto">
              {filteredPlayers.map((player) => (
                <li
                  key={player.id}
                  className="px-4 py-2 cursor-pointer hover:bg-secondary text-foreground/90"
                  onClick={() => handlePlayerSelect(player)}
                >
                  {player.nickname}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {guesses.length > 0 && (
        <div className="custom-scrollbar w-full overflow-auto mt-2">
          <table className="w-full table-fixed border-separate border-spacing-1 text-center select-none">
            <thead>
              <tr className="truncate bg-[#1e0d1c] text-white font-style-label-l4 uppercase [&>th]:py-4">
                <th className="">NAME</th>
                <th>TEAM</th>
                <th className="w-32 max-md:w-16">NAT</th>
                <th className="w-32 max-md:w-16">AGE</th>
                <th className="w-32 max-md:w-16">ROLE</th>
                <th className="w-32 max-md:w-16">MAJ APP</th>
              </tr>
            </thead>
            <tbody>
              {guesses.map((guess, index) => (
                <tr key={index} className="font-style-body-b1 text-white">
                  <td className={`py-5 rounded ${getResultColor(guess.results.name)}`}>
                    {guess.player.nickname}
                  </td>
                  <td className={`py-5 rounded ${getResultColor(guess.results.team)}`}>
                    {getFormattedTeamName(guess.player.team)}
                  </td>
                  <td className={`py-5 rounded ${getResultColor(guess.results.nationality)}`}>
                    {countryFlags[guess.player.nationality] || guess.player.nationality}
                  </td>
                  <td className={`py-5 rounded ${getResultColor(guess.results.age)}`}>
                    <div className="flex items-center justify-center gap-1">
                      {guess.player.age}
                      {guess.comparison.age !== 'equal' && (
                        guess.comparison.age === 'higher' ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />
                      )}
                    </div>
                  </td>
                  <td className={`py-5 rounded ${getResultColor(guess.results.role)}`}>
                    {guess.player.role.charAt(0).toUpperCase() + guess.player.role.slice(1)}
                  </td>
                  <td className={`py-5 rounded ${getResultColor(guess.results.majorAppearances)}`}>
                    <div className="flex items-center justify-center gap-1">
                      {guess.player.majorAppearances}
                      {guess.comparison.majorAppearances !== 'equal' && (
                        guess.comparison.majorAppearances === 'higher' ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-center gap-3 mt-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`size-2 rounded-full transition-all ease-in-out ${
              index < 8 - remainingGuesses
                ? 'bg-red-500'
                : 'bg-[#2a133a]'
            }`}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
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

export default CounterStrikleGame;
