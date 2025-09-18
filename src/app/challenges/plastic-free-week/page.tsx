"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, Zap, Coins, Heart } from "lucide-react"

export default function PlasticFreeWeekPage() {
  const [dailyProgress, setDailyProgress] = useState(
    Array(7).fill(false)
  )

  const handleDayCheck = (dayIndex: number) => {
    setDailyProgress((prevProgress) => {
      const newProgress = [...prevProgress]
      newProgress[dayIndex] = !newProgress[dayIndex]
      return newProgress
    })
  }

  const completedDays = dailyProgress.filter(day => day).length
  const completionPercentage = Math.round((completedDays / 7) * 100)

  const dailyTasks = [
    "Used a reusable coffee cup instead of a disposable one.",
    "Used a reusable bag for all purchases.",
    "Avoided all plastic-wrapped snacks.",
    "Used a reusable water bottle all day.",
    "Packed lunch in a non-plastic container.",
    "Said 'no' to a plastic straw or cutlery.",
    "Recycled all plastic waste correctly.",
  ]

  const miniChallenges = [
    { title: "Zero-Waste Lunch", description: "Pack a completely plastic-free lunch for a day.", points: 25, orbs: 1 },
    { title: "Bulk Bin Hero", description: "Buy at least two items from the bulk section with your own containers.", points: 50, orbs: 3 },
    { title: "DIY Beauty Products", description: "Create a homemade beauty product to replace a plastic-packaged one.", points: 75, orbs: 5 },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage="challenges" />

      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-game text-foreground mb-2">Plastic-Free Week</h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and complete daily tasks to earn rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-game flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Your Progress
                </CardTitle>
                <CardDescription>
                  Keep up the streak to complete the challenge!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>{completedDays} out of 7 days completed</span>
                  <span className="font-game">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-4" />
                <div className="mt-4 grid grid-cols-7 gap-2">
                  {dailyProgress.map((isComplete, index) => (
                    <div
                      key={index}
                      className={`h-8 w-full rounded-md flex items-center justify-center border-2 transition-colors ${
                        isComplete ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      Day {index + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-game flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Daily Tracker
                </CardTitle>
                <CardDescription>
                  Check off a day&apos;s task once you&apos;ve completed it.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailyTasks.map((task, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border bg-card/50">
                    <Checkbox
                      id={`day-${index}`}
                      checked={dailyProgress[index]}
                      onCheckedChange={() => handleDayCheck(index)}
                    />
                    <label htmlFor={`day-${index}`} className="flex-1 text-sm font-medium">
                      Day {index + 1}: {task}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-game flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  Additional Challenges
                </CardTitle>
                <CardDescription>
                  Complete these to earn extra rewards!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {miniChallenges.map((challenge, index) => (
                  <div key={index} className="space-y-2 p-3 border rounded-lg">
                    <h3 className="font-game text-foreground">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Coins className="w-3 h-3"/> {challenge.points}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Heart className="w-3 h-3"/> {challenge.orbs}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
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