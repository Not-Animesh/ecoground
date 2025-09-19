"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Sparkles, Star, Coins, Heart, Zap, Award } from "lucide-react"
import Link from "next/link"

export default function GamesPage() {
  const games = [
    {
      id: "eco-quiz",
      title: "Eco-Quiz Challenge",
      description: "Test your knowledge on a range of environmental topics.",
      difficulty: "Beginner",
      points: 50,
      orbs: 3,
      icon: Award,
      color: "bg-teal-500",
      link: "/games/eco-quiz"
    },
    {
      id: "waste-segregation",
      title: "Waste Segregation Trainer",
      description: "A fun and quick game to practice sorting trash correctly.",
      difficulty: "Beginner",
      points: 20,
      orbs: 1,
      icon: Zap,
      color: "bg-emerald-500",
      link: "/games/waste-segregation"
    },
    {
      id: "recycling-mania",
      title: "Recycling Mania",
      description: "A fast-paced game to sort waste into the correct bins.",
      difficulty: "Intermediate",
      points: 100,
      orbs: 5,
      icon: Zap,
      color: "bg-purple-500",
      link: "/games/recycling-mania"
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage="games" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-game text-foreground mb-2">Learning Games</h1>
          <p className="text-muted-foreground text-lg">
            Have fun while expanding your eco-knowledge and earning rewards!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <Card key={game.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg ${game.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-game group-hover:text-primary transition-colors">
                    {game.title}
                  </CardTitle>
                  <CardDescription className="text-sm">{game.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-accent" />
                      <span>{game.points} points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-destructive" />
                      <span>{game.orbs} orbs</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                  </div>
                  <Link href={game.link}>
                    <Button className="w-full font-game flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}