"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Zap, Coins, RefreshCw, Hand, Recycle, Trash2, Lightbulb, Heart } from "lucide-react"
import Image from "next/image"
import { useGameStore } from "@/components/gamification-store"
import React from "react"

type WasteItem = {
  id: number;
  name: string;
  image: string;
  correctBin: "Recycle" | "Compost" | "Landfill";
};

const WASTE_ITEMS: WasteItem[] = [
  { id: 1, name: "Plastic Bottle", image: "/plastic_bottle.jpg", correctBin: "Recycle" },
  { id: 2, name: "Apple Core", image: "/apple_core.jpg", correctBin: "Compost" },
  { id: 3, name: "Old Newspaper", image: "/old_newspaper.jpg", correctBin: "Recycle" },
  { id: 4, name: "Chip Packet", image: "/chip_packet.jpg", correctBin: "Landfill" },
  { id: 5, name: "Banana Peel", image: "/banana_peel.jpg", correctBin: "Compost" },
  { id: 6, name: "Cardboard Box", image: "/cardboard_box.jpg", correctBin: "Recycle" },
];

const BINS = [
  { name: "Recycle", icon: Recycle, color: "bg-blue-500", emoji: "♻️" },
  { name: "Compost", icon: Hand, color: "bg-green-500", emoji: "🍃" },
  { name: "Landfill", icon: Trash2, color: "bg-gray-500", emoji: "🗑️" },
];

export default function WasteSegregationGame() {
  const [score, setScore] = useState(0);
  const [orbs, setOrbs] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentWasteItem, setCurrentWasteItem] = useState<WasteItem>(WASTE_ITEMS[0]);
  const [gameState, setGameState] = useState<"playing" | "result">("playing");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Zustand store actions
  const addEcoPoints = useGameStore((s) => s.addEcoPoints)
  const addLifeOrbs = useGameStore((s) => s.addLifeOrbs)

  const handleDrop = (bin: "Recycle" | "Compost" | "Landfill") => {
    if (!currentWasteItem) return;

    const isCorrect = bin === currentWasteItem.correctBin;
    setFeedback(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      if (isCorrect) {
        setScore(prev => prev + 10);
        setStreak(prev => prev + 1);

        // Award 1 orb every 3 correct streaks
        if ((streak + 1) % 3 === 0) {
          setOrbs(prev => prev + 1);
        }
      } else {
        setStreak(0);
      }

      const nextItemIndex = (currentWasteItem.id) % WASTE_ITEMS.length;
      if (currentWasteItem.id >= WASTE_ITEMS.length) {
        setGameState("result");
      } else {
        setCurrentWasteItem(WASTE_ITEMS[nextItemIndex]);
      }
      setFeedback(null);
    }, 500);
  };

  const restartGame = () => {
    setScore(0);
    setOrbs(0);
    setStreak(0);
    setGameState("playing");
    setCurrentWasteItem(WASTE_ITEMS[0]);
    setFeedback(null);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", currentWasteItem.name);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Award points and orbs to the global store when game ends
  React.useEffect(() => {
    if (gameState === "result" && (score > 0 || orbs > 0)) {
      addEcoPoints(score)
      addLifeOrbs(orbs)
    }
    // eslint-disable-next-line
  }, [gameState])

  const renderGameArea = () => {
    if (gameState === "result") {
      return (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-game">Game Over!</CardTitle>
            <CardDescription>You've completed the sorting challenge.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center items-center gap-6">
              <div className="flex items-center gap-2">
                <Coins className="w-8 h-8 text-accent" />
                <span className="text-4xl font-game">{score}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-8 h-8 text-destructive" />
                <span className="text-4xl font-game">{orbs}</span>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">Total Eco-Points & Life-Orbs earned</p>
            <Button className="w-full font-game" onClick={restartGame}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="flex flex-col items-center justify-between h-[500px]">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-game">Sort the Waste Item:</h2>
          {currentWasteItem && (
            <div
              className={`w-48 h-48 relative mx-auto my-4 border-4 rounded-lg overflow-hidden bg-white shadow-md transition-transform duration-300 ${isDragging ? "scale-110" : ""}`}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <Image 
                src={currentWasteItem.image}
                alt={currentWasteItem.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </div>
        
        <div className="flex gap-4 w-full">
          {BINS.map(bin => (
            <BinButton 
              key={bin.name}
              label={bin.name}
              emoji={bin.emoji}
              onClick={() => handleDrop(bin.name as "Recycle" | "Compost" | "Landfill")} 
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(bin.name as "Recycle" | "Compost" | "Landfill")}
            />
          ))}
        </div>
      </div>
    );
  };

  const BinButton = ({ label, emoji, onClick, onDragOver, onDrop }: { label: string; emoji: string; onClick: () => void; onDragOver: (e: React.DragEvent) => void; onDrop: () => void }) => (
    <Button 
      onClick={onClick} 
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="flex-1 w-32 h-32 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors hover:border-primary/50"
      variant="outline"
    >
      <div className="text-4xl">{emoji}</div>
      <span className="mt-2 text-sm font-game">{label}</span>
    </Button>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage="games" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-game text-foreground mb-2">Waste Segregation Trainer</h1>
          <p className="text-muted-foreground text-lg">
            A mini-game to test your knowledge of waste segregation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Current Score: {score}
                </CardTitle>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Coins className="w-3 h-3" /> Streak: {streak}
                </Badge>
              </CardHeader>
              <CardContent>
                {renderGameArea()}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-game flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Sorting Rules
                </CardTitle>
                <CardDescription>
                  Review these rules to improve your score.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm space-y-2">
                  <li><b>Recycle:</b> Paper, cardboard, glass, most plastics (check for symbol).</li>
                  <li><b>Compost:</b> Food scraps, yard waste.</li>
                  <li><b>Landfill:</b> Plastic wrappers, Styrofoam, broken glass.</li>
                </ul>
              </CardContent>
            </Card>
            
            {feedback && (
              <div className={`p-4 rounded-lg flex items-center gap-2 font-bold ${
                feedback === "correct" 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              }`}>
                {feedback === "correct" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                {feedback === "correct" ? "Correct! +10 Points" : "Incorrect! Streak reset."}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}