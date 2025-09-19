"use client"

import { useState, useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Crown, TrendingUp, Users, Flame, Target, Award, Star, Zap } from "lucide-react"
import { useGameStore } from "@/components/gamification-store"

type Period = "weekly" | "monthly" | "allTime"

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("weekly")

  // Get the current user's stats from global store
  const myEcoPoints = useGameStore((s) => s.ecoPoints)
  const myLifeOrbs = useGameStore((s) => s.lifeOrbs)
  const myLevel = useGameStore((s) => s.level)
  const myStreak = useGameStore((s) => s.currentStreak)
  const myUsername = "Ecowarrior" // You can also get this from auth/user context
  const myAvatar = "/diverse-students-studying.png"

  // Original leaderboard data (without current user)
  const leaderboardDataRaw: Record<Period, {
    username: string
    avatar: string
    ecoPoints: number
    lifeOrbs: number
    level: number
    streak: number
    badges: string[]
    trend: string
    change: string
    isCurrentUser?: boolean
  }[]> = {
    weekly: [
      {
        username: "Krishan",
        avatar: "/eco-master-avatar.jpg",
        ecoPoints: 2850,
        lifeOrbs: 67,
        level: 28,
        streak: 15,
        badges: ["Tree Planter", "Carbon Neutral", "Water Saver"],
        trend: "up",
        change: "+245",
      },
      {
        username: "Saqib",
        avatar: "/green-warrior-avatar.jpg",
        ecoPoints: 2720,
        lifeOrbs: 63,
        level: 26,
        streak: 12,
        badges: ["Solar Champion", "Recycling Pro"],
        trend: "up",
        change: "+198",
      },
      {
        username: "Devashish",
        avatar: "/nature-lover-avatar.jpg",
        ecoPoints: 2650,
        lifeOrbs: 61,
        level: 25,
        streak: 18,
        badges: ["Ocean Keeper", "Forest Guardian"],
        trend: "down",
        change: "-12",
      },
      {
        username: "Raj",
        avatar: "/climate-hero-avatar.jpg",
        ecoPoints: 2480,
        lifeOrbs: 58,
        level: 24,
        streak: 9,
        badges: ["Wind Power", "Energy Saver"],
        trend: "up",
        change: "+156",
      },
    ],
    monthly: [],
    allTime: [],
  }

  // Add the current user to leaderboard for current period
  const leaderboardData = useMemo(() => {
    // Use a deep copy to avoid mutating raw data
    const data = [...leaderboardDataRaw[selectedPeriod]]
    data.push({
      username: myUsername,
      avatar: myAvatar,
      ecoPoints: myEcoPoints,
      lifeOrbs: myLifeOrbs,
      level: myLevel,
      streak: myStreak,
      badges: ["Beginner", "First Steps"],
      trend: "up",
      change: "+89",
      isCurrentUser: true,
    })
    // Sort by ecoPoints descending
    data.sort((a, b) => b.ecoPoints - a.ecoPoints)
    // Assign ranks dynamically
    return data.map((player, idx) => ({
      ...player,
      rank: idx + 1,
    }))
  }, [selectedPeriod, myEcoPoints, myLifeOrbs, myLevel, myStreak])

  // Find current user's position
  const myRankObj = leaderboardData.find((p) => p.isCurrentUser)
  const myRank = myRankObj?.rank ?? leaderboardData.length

  const achievements = [
    {
      title: "Top 10 This Week",
      description: "Ranked in the top 10 players this week",
      icon: Trophy,
      earned: myRank <= 10,
      rarity: "rare",
    },
    {
      title: "Streak Master",
      description: "Maintained a 30-day learning streak",
      icon: Flame,
      earned: myStreak >= 30,
      rarity: "epic",
    },
    {
      title: "Point Collector",
      description: "Earned 10,000 total Eco-Points",
      icon: Target,
      earned: myEcoPoints >= 10000,
      rarity: "legendary",
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-muted-foreground">
            #{rank}
          </span>
        )
    }
  }

  const getTrendIcon = (trend: string, change: string) => {
    if (trend === "up") {
      return (
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">{change}</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center gap-1 text-red-500">
          <TrendingUp className="w-4 h-4 rotate-180" />
          <span className="text-sm font-medium">{change}</span>
        </div>
      )
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "rare":
        return "border-blue-500 bg-blue-50 dark:bg-blue-950"
      case "epic":
        return "border-purple-500 bg-purple-50 dark:bg-purple-950"
      case "legendary":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
      default:
        return "border-gray-200 bg-gray-50 dark:bg-gray-950"
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage="leaderboard" />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-game text-foreground mb-2">Leaderboard</h1>
          <p className="text-muted-foreground text-lg">Compete with eco-warriors worldwide and climb the ranks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-game flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-gray-500" />
                    Global Rankings
                  </CardTitle>
                  <div className="flex gap-2">
                    {["weekly", "monthly", "allTime"].map((period) => (
                      <Button
                        key={period}
                        variant={selectedPeriod === period ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPeriod(period as Period)}
                        className="font-game"
                      >
                        {period === "allTime" ? "All Time" : period.charAt(0).toUpperCase() + period.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((player) => (
                    <div
                      key={player.username}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-300 ${
                        player.isCurrentUser
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/20 hover:shadow-sm"
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex-shrink-0">{getRankIcon(player.rank)}</div>

                      {/* Avatar and Info */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={player.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{player.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-game text-lg truncate">{player.username}</h3>
                            {player.isCurrentUser && (
                              <Badge variant="secondary" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Level {player.level}</span>
                            <div className="flex items-center gap-1">
                              <Flame className="w-4 h-4 text-orange-500" />
                              <span>{player.streak} day streak</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-game text-lg text-accent">{player.ecoPoints.toLocaleString()}</div>
                          <div className="text-muted-foreground">Eco-Points</div>
                        </div>
                        <div className="text-center">
                          <div className="font-game text-lg text-destructive">{player.lifeOrbs}</div>
                          <div className="text-muted-foreground">Life-Orbs</div>
                        </div>
                      </div>

                      {/* Trend */}
                      <div className="flex-shrink-0">{getTrendIcon(player.trend, player.change)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Your Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-game flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-game text-primary">{myRank}{myRank === 1 ? "st" : myRank === 2 ? "nd" : myRank === 3 ? "rd" : "th"}</div>
                    <div className="text-sm text-muted-foreground">Global Rank</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-game text-accent">{myEcoPoints.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Eco-Points</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next Rank</span>
                    <span>
                      {myRank > 1
                        ? `${leaderboardData[myRank - 2].ecoPoints - myEcoPoints + 1} points needed`
                        : "You're #1!"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width:
                          myRank > 1
                            ? `${Math.min(
                                100,
                                (myEcoPoints /
                                  leaderboardData[myRank - 2].ecoPoints) *
                                  100
                              )}%`
                            : "100%",
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-game flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 ${getRarityColor(achievement.rarity)} ${
                        achievement.earned ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon
                          className={`w-5 h-5 mt-0.5 ${achievement.earned ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-game text-sm">{achievement.title}</h4>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.earned && <Zap className="w-4 h-4 text-yellow-500" />}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-game flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Players</span>
                  <span className="font-game">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Today</span>
                  <span className="font-game">3,241</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Trees Planted</span>
                  <span className="font-game">1.2M</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}