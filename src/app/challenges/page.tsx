"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"
import {
  Trophy,
  Lock,
  CheckCircle,
  Play,
  Zap,
  Users,
  Award,
  Star,
  Coins,
  Heart,
  Calendar,
  Sparkles,
  ChevronRight,
  School,
  Building,
  Briefcase,
  GitPullRequest,
  Brush,
} from "lucide-react"

export default function ChallengesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Challenges", icon: Sparkles },
    { id: "weekly", label: "Weekly Contest", icon: Calendar },
    { id: "academic", label: "Academic & NGO", icon: School },
    { id: "physical", label: "Physical", icon: Briefcase },
  ]

  const challenges = [
    {
      id: 1,
      title: "Plastic-Free Week",
      description: "Reduce your single-use plastic waste for 7 days",
      category: "weekly",
      difficulty: "Intermediate",
      duration: "7 days",
      participants: 589,
      progress: 4,
      totalProgress: 7,
      status: "in-progress",
      ecoPoints: 100,
      lifeOrbs: 5,
      icon: Sparkles,
      color: "bg-blue-500",
      ngoPartner: null,
      courseAlignment: null,
    },
    {
      id: 2,
      title: "Energy Audit Challenge",
      description: "Conduct a home energy audit to find savings",
      category: "academic",
      difficulty: "Advanced",
      duration: "1 day",
      participants: 345,
      progress: 0,
      totalProgress: 1,
      status: "available",
      ecoPoints: 75,
      lifeOrbs: 8,
      icon: Building,
      color: "bg-yellow-500",
      ngoPartner: "Green Earth Alliance",
      courseAlignment: "Environmental Studies",
    },
    {
      id: 3,
      title: "The Eco-Hack",
      description: "Design a feature to promote sustainable habits",
      category: "weekly",
      difficulty: "Expert",
      duration: "3 days",
      participants: 120,
      progress: 0,
      totalProgress: 1,
      status: "available",
      ecoPoints: 500,
      lifeOrbs: 20,
      icon: GitPullRequest,
      color: "bg-purple-500",
      ngoPartner: null,
      courseAlignment: "Computer Science",
    },
    {
      id: 4,
      title: "Campus Cleanup Blitz",
      description: "Compete to collect the most litter on campus",
      category: "physical",
      difficulty: "Beginner",
      duration: "4 hours",
      participants: 211,
      progress: 0,
      totalProgress: 1,
      status: "locked",
      ecoPoints: 200,
      lifeOrbs: 10,
      icon: Trophy,
      color: "bg-green-500",
      ngoPartner: "Local Parks Foundation",
      courseAlignment: null,
    },
     {
      id: 5,
      title: "BioBlitz Scavenger Hunt",
      description: "Document local flora and fauna on campus",
      category: "physical",
      difficulty: "Intermediate",
      duration: "1 day",
      participants: 211,
      progress: 0,
      totalProgress: 1,
      status: "available",
      ecoPoints: 150,
      lifeOrbs: 8,
      icon: Zap,
      color: "bg-teal-500",
      ngoPartner: null,
      courseAlignment: "Environmental Science",
    },
  ]

  const weeklyLeaders = [
    { rank: 1, username: "Alex Smith", avatar: "/1.png", points: 850 },
    { rank: 2, username: "Maya Johnson", avatar: "/2.png", points: 780 },
    { rank: 3, username: "Luis Chen", avatar: "/3.png", points: 620 },
  ];

  const filteredChallenges =
    selectedCategory === "all" ? challenges : challenges.filter((challenge) => challenge.category === selectedCategory)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Play className="w-5 h-5 text-blue-500" />
      case "locked":
        return <Lock className="w-5 h-5 text-muted-foreground" />
      default:
        return <Award className="w-5 h-5 text-primary" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Expert":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const ChallengesGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {filteredChallenges.map((challenge) => {
        const Icon = challenge.icon
        return (
          <Card
            key={challenge.id}
            className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg ${challenge.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {getStatusIcon(challenge.status)}
              </div>
              <CardTitle className="text-xl font-game group-hover:text-primary transition-colors">
                {challenge.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {challenge.description}
                {(challenge.ngoPartner || challenge.courseAlignment) && (
                  <div className="mt-2 text-xs flex items-center space-x-2 text-muted-foreground">
                    {challenge.ngoPartner && <span className="flex items-center gap-1">
                       <Briefcase className="w-3 h-3"/> {challenge.ngoPartner}
                      </span>}
                    {challenge.courseAlignment && <span className="flex items-center gap-1">
                        <School className="w-3 h-3"/> {challenge.courseAlignment}
                      </span>}
                  </div>
                )}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress Bar */}
              {challenge.status === "in-progress" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((challenge.progress / challenge.totalProgress) * 100)}%</span>
                  </div>
                  <Progress value={(challenge.progress / challenge.totalProgress) * 100} className="h-2" />
                </div>
              )}

              {/* Challenge Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{challenge.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{challenge.participants.toLocaleString()} joined</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-accent" />
                  <span>{challenge.ecoPoints} points</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-destructive" />
                  <span>{challenge.lifeOrbs} orbs</span>
                </div>
              </div>

              {/* Difficulty Badge */}
              <div className="flex items-center justify-between">
                <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <Star className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Action Button */}
              {challenge.title === "Plastic-Free Week" && challenge.status === "in-progress" ? (
                <Link href="/challenges/plastic-free-week" passHref>

                  <Button className="w-full font-game">
                    Continue
                  </Button>
                </Link>
              ) : (
                <Button
                  className="w-full font-game"
                  disabled={challenge.status === "locked"}
                  variant={challenge.status === "completed" ? "outline" : "default"}
                >
                  {challenge.status === "completed" && "View Results"}
                  {challenge.status === "in-progress" && "Continue"}
                  {challenge.status === "available" && "Join Challenge"}
                  {challenge.status === "locked" && "Unlock Required"}
                </Button>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const LeadersLoungeCard = () => (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-xl font-game flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Weekly Contest Leaders
        </CardTitle>
        <CardDescription>
          Goodies will be awarded to the top 3 performers!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {weeklyLeaders.map((leader, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted">
            <span className="w-6 h-6 flex items-center justify-center text-lg font-bold">
              #{leader.rank}
            </span>
            <Avatar className="w-8 h-8">
              <AvatarImage src={leader.avatar} />
              <AvatarFallback>{leader.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{leader.username}</div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {leader.points} pts
            </Badge>
          </div>
        ))}
        <Button className="w-full font-game mt-4">
          View All Leaders
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage="challenges" />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-game text-foreground mb-2">Challenges</h1>
          <p className="text-muted-foreground text-lg">
            Join challenges to test your eco-knowledge and earn exclusive rewards
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Challenges Grid */}
          <div className="lg:col-span-2">
            <ChallengesGrid />
          </div>

          {/* Leaders Lounge Card */}
          <LeadersLoungeCard />
        </div>
      </main>
    </div>
  )
}