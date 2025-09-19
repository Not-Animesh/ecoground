"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type WasteType = "plastic" | "paper" | "glass" | "ewaste";

const WASTE_ITEMS: Record<WasteType, { label: string; emoji: string; color: string }> = {
  plastic: { label: "Plastic", emoji: "🧴", color: "bg-blue-300" },
  paper: { label: "Paper", emoji: "📄", color: "bg-yellow-200" },
  glass: { label: "Glass", emoji: "🍾", color: "bg-green-200" },
  ewaste: { label: "E-Waste", emoji: "💻", color: "bg-gray-300" },
};

type FallingItem = {
  id: string;
  type: WasteType;
  x: number;
  y: number;
  speed: number;
};

export function RecycleRushGame() {
  const [items, setItems] = useState<FallingItem[]>([]);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [ecoMagnet, setEcoMagnet] = useState(false);
  const [ecoMagnetTimer, setEcoMagnetTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game state control
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Bin position (x, in percent of container width)
  const [binX, setBinX] = useState(50); // start in the middle
  const draggingBin = useRef(false);
  const binOffset = useRef(0);

  const playAreaRef = useRef<HTMLDivElement>(null);
  const itemIdRef = useRef(0);

  // Handle game start and countdown
  const handleStart = () => {
    setScore(0);
    setMissed(0);
    setGameOver(false);
    setItems([]);
    setBinX(50);
    setCountdown(5);
    setGameStarted(true);
  };

  // Countdown effect
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      // Items will now start falling, handled by next effect
      return;
    }
    const t = setTimeout(() => setCountdown(c => (c ?? 0) - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Spawn new items at intervals only if game is started and not in countdown
  useEffect(() => {
    if (!gameStarted || countdown !== null || gameOver) return;
    const interval = setInterval(() => {
      setItems(items => [
        ...items,
        {
          id: String(itemIdRef.current++),
          type: (Object.keys(WASTE_ITEMS) as WasteType[])[Math.floor(Math.random() * 4)],
          x: Math.random() * 90 + 5,
          y: 0,
          speed: Math.random() * 0.25 + 0.25,
        },
      ]);
    }, 1400);
    return () => clearInterval(interval);
  }, [gameStarted, countdown, gameOver]);

  // Move items down (only if game started, not in countdown)
  useEffect(() => {
    if (!gameStarted || countdown !== null || gameOver) return;
    let animation: number;
    const step = () => {
      setItems(items =>
        items
          .map(item =>
            ({ ...item, y: item.y + item.speed * (ecoMagnet ? 0.5 : 1) })
          )
          // Filtering out items is handled by collision detection below
      );
      animation = requestAnimationFrame(step);
    };
    animation = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animation);
  }, [ecoMagnet, gameOver, gameStarted, countdown]);

  // EcoMagnet timer
  useEffect(() => {
    if (ecoMagnet && ecoMagnetTimer > 0) {
      const t = setTimeout(() => setEcoMagnetTimer(tm => tm - 1), 1000);
      return () => clearTimeout(t);
    } else if (ecoMagnet && ecoMagnetTimer <= 0) {
      setEcoMagnet(false);
    }
  }, [ecoMagnet, ecoMagnetTimer]);

  // Only count as missed if item is not caught by dustbin!
  useEffect(() => {
    if (!gameStarted || countdown !== null || gameOver) return;
    setItems(items =>
      items.filter(item => {
        if (item.y < 86) return true;
        // Bin collision: if item x is within bin range, collect it (score+10)
        const binWidthPercent = 16;
        if (Math.abs(item.x - binX) < binWidthPercent / 2) {
          setScore(s => s + 10);
          return false;
        } else {
          setMissed(m => m + 1);
          return false;
        }
      })
    );
  }, [binX, items, gameStarted, countdown, gameOver]);

  // Game over if too many missed
  useEffect(() => {
    if (missed >= 5) setGameOver(true);
  }, [missed]);

  // Eco Magnet Power-up: auto-sort
  const triggerEcoMagnet = () => {
    setEcoMagnet(true);
    setEcoMagnetTimer(5);
    setItems(items => {
      let sorted = 0;
      const newItems = items.filter(item => {
        if (item.y > 80) return true;
        setScore(s => s + 10);
        sorted++;
        return false;
      });
      return newItems;
    });
  };

  // Bin drag handlers (enable only if gameStarted && !countdown && !gameOver)
  const handleBinDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameStarted || countdown !== null || gameOver) return;
    draggingBin.current = true;
    let clientX = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    const container = playAreaRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const binPx = (binX / 100) * rect.width;
      binOffset.current = clientX - rect.left - binPx;
    }
  };

  const handleBinDrag = (e: MouseEvent | TouchEvent) => {
    if (!draggingBin.current) return;
    let clientX = 0;
    if ("touches" in e && (e as TouchEvent).touches.length > 0) {
      clientX = (e as TouchEvent).touches[0].clientX;
    } else if ("clientX" in e) {
      clientX = (e as MouseEvent).clientX;
    }
    const container = playAreaRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      let x = ((clientX - rect.left - binOffset.current) / rect.width) * 100;
      x = Math.max(0, Math.min(100, x));
      setBinX(x);
    }
  };

  const handleBinDragEnd = () => {
    draggingBin.current = false;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleBinDrag(e);
    const handleTouchMove = (e: TouchEvent) => handleBinDrag(e);
    const handleMouseUp = () => handleBinDragEnd();
    const handleTouchEnd = () => handleBinDragEnd();

    if (draggingBin.current) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line
  }, [draggingBin.current]);

  // Restart game
  const restartGame = () => {
    setScore(0);
    setMissed(0);
    setGameOver(false);
    setItems([]);
    setBinX(50);
    setGameStarted(false);
    setCountdown(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span>Score: <b>{score}</b></span>
        <button
          className={cn(
            "px-3 py-1 rounded font-semibold transition",
            ecoMagnet || !gameStarted || countdown !== null || gameOver
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          )}
          disabled={ecoMagnet || !gameStarted || countdown !== null || gameOver}
          onClick={triggerEcoMagnet}
        >
          Eco Magnet {ecoMagnet && <>({ecoMagnetTimer})</>}
        </button>
        <span>Missed: <b className={missed > 2 ? "text-red-500" : ""}>{missed}/5</b></span>
      </div>

      <div className="flex justify-center my-2">
        {!gameStarted && !gameOver && (
          <button
            className="px-8 py-2 rounded bg-blue-600 text-white font-bold text-lg hover:bg-blue-700"
            onClick={handleStart}
          >
            Start
          </button>
        )}
        {countdown !== null && (
          <div className="text-2xl font-bold text-green-600 animate-pulse">
            Game starts in {countdown}...
          </div>
        )}
      </div>

      <div
        ref={playAreaRef}
        className="relative h-96 bg-white border rounded-lg overflow-hidden shadow mb-4 select-none"
      >
        {/* Falling Items */}
        {items.map(item => (
          <div
            key={item.id}
            className={cn(
              "absolute flex flex-col items-center transition-transform duration-100",
              WASTE_ITEMS[item.type].color,
              "rounded-lg shadow-lg select-none"
            )}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: 48,
              height: 48,
              fontSize: 32,
              zIndex: 10,
              transform: `translate(-50%, 0)`,
              border: "2px solid #ddd",
            }}
            title={WASTE_ITEMS[item.type].label}
          >
            <span>{WASTE_ITEMS[item.type].emoji}</span>
          </div>
        ))}

        {/* Draggable Bin at the bottom */}
        <div
          className="absolute bottom-1"
          style={{
            left: `${binX}%`,
            transform: "translateX(-50%)",
            zIndex: 20,
            cursor: (gameStarted && countdown === null && !gameOver) ? "grab" : "not-allowed",
            width: 64,
            height: 64,
            userSelect: "none"
          }}
          onMouseDown={handleBinDragStart}
          onTouchStart={handleBinDragStart}
        >
          <Image
            src="/dustbin.png"
            alt="Dustbin"
            width={64}
            height={64}
            draggable={false}
            priority
            className="select-none"
          />
        </div>
      </div>

      {gameOver && (
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold text-red-600 mb-2">Game Over</h2>
          <p>Your final score: <span className="font-bold">{score}</span></p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={restartGame}
          >
            Play Again
          </button>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        <b>How to play:</b> Click Start, wait for the countdown, then move the dustbin left/right to catch the falling items!
      </div>
    </div>
  );
}