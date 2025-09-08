"use client"

import { useEffect } from "react"
import { Trophy, Target, Globe, Coins, Heart, Flame, CheckCircle, Lock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import { useGameStore } from "@/components/gamification-store"

export default function EcogroundDashboard() {
  const {
    ecoPoints,
    lifeOrbs,
    currentStreak,
    globalRank,
    level,
    completedModules,
    completedChallenges,
    updateStreak,
    completeChallenge,
    completeModule,
  } = useGameStore()

  useEffect(() => {
    updateStreak()
  }, [updateStreak])

  const modules = [
    {
      id: "climate-basics",
      name: "Climate Basics",
      unlocked: true,
      completed: completedModules.includes("climate-basics"),
    },
    {
      id: "water-conservation",
      name: "Water Conservation",
      unlocked: completedModules.includes("climate-basics"),
      completed: completedModules.includes("water-conservation"),
    },
    {
      id: "biodiversity",
      name: "Biodiversity",
      unlocked: completedModules.includes("water-conservation"),
      completed: completedModules.includes("biodiversity"),
    },
    {
      id: "waste-management",
      name: "Waste Management",
      unlocked: completedModules.includes("biodiversity"),
      completed: completedModules.includes("waste-management"),
    },
  ]

  const challenges = [
    { id: "plastic-free-week", name: "Plastic-Free Week", progress: 4, total: 7, points: 50, active: true },
    { id: "energy-audit", name: "Energy Audit", progress: 0, total: 1, points: 75, active: false },
    { id: "bike-to-school", name: "Bike to School", progress: 2, total: 5, points: 30, active: true },
  ]

  const leaderboard = [
    { name: "Alex Smith", points: 1250, avatar: "/diverse-students-studying.png", rank: 1 },
    { name: "Maya Johnson", points: 1180, avatar: "/diverse-students-studying.png", rank: 2 },
    { name: "Luis Chen", points: 1050, avatar: "/diverse-students-studying.png", rank: 3 },
    { name: "You (EcoWarrior)", points: ecoPoints, avatar: "/diverse-group-studying.png", rank: globalRank },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex">
      <div className="blur-orb blur-orb-1"></div>
      <div className="blur-orb blur-orb-2"></div>
      <div className="blur-orb blur-orb-3"></div>

      <Sidebar currentPage="dashboard" />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-game text-foreground mb-2">
            Welcome back, <span className="text-primary">EcoWarrior!</span>
          </h1>
          <p className="text-muted-foreground">Ready to save the planet today? Let&apos;s your progress!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="pulse-glow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm font-medium">
                <Coins className="w-4 h-4 text-accent" />
                <span>Eco-Points</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-game text-foreground">{ecoPoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">For leaderboard ranking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm font-medium">
                <Heart className="w-4 h-4 text-destructive" />
                <span>Life-Orbs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-game text-foreground">{lifeOrbs}</div>
              <p className="text-xs text-muted-foreground">Shop currency</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm font-medium">
                <Flame className="w-4 h-4 text-primary" />
                <span>Current Streak</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-game text-foreground">{currentStreak} days</div>
              <p className="text-xs text-muted-foreground">Keep it going!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm font-medium">
                <Trophy className="w-4 h-4 text-accent" />
                <span>Global Rank</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-game text-foreground">#{globalRank}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progression Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-game">
                <Globe className="w-5 h-5 text-primary" />
                <span>Learning Path</span>
              </CardTitle>
              <CardDescription>Your journey through environmental education</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div key={module.id} className="flex items-center space-x-4 p-4 rounded-lg border bg-card/50">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        module.completed
                          ? "bg-primary text-primary-foreground"
                          : module.unlocked
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {module.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : module.unlocked ? (
                        <Play className="w-6 h-6" />
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-game text-foreground">{module.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.completed ? "Completed!" : module.unlocked ? "Ready to start" : "Locked"}
                      </p>
                    </div>
                    {module.unlocked && !module.completed && (
                      <Button size="sm" onClick={() => completeModule(module.id)} className="bounce-subtle">
                        Start
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Daily Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-game">
                  <Target className="w-5 h-5 text-accent" />
                  <span>Daily Challenges</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{challenge.name}</span>
                      <Badge variant={challenge.active ? "default" : "secondary"} className="text-xs">
                        +{challenge.points} pts
                      </Badge>
                    </div>
                    <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {challenge.progress}/{challenge.total} completed
                      </span>
                      {challenge.active && challenge.progress < challenge.total && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => completeChallenge(challenge.id)}
                          className="h-6 px-2 text-xs"
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-game">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span>Top Eco-Warriors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.slice(0, 4).map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      user.name.includes("You") ? "bg-primary/10" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.rank === 1
                          ? "bg-primary text-primary-foreground"
                          : user.rank === 2
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.points.toLocaleString()} points</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
