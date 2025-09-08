"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Play,
  Lock,
  CheckCircle,
  Star,
  Clock,
  Users,
  Trophy,
  Droplets,
  Recycle,
  Sun,
  Wind,
  Mountain,
} from "lucide-react"

export default function ModulesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Modules", icon: BookOpen },
    { id: "climate", label: "Climate Change", icon: Sun },
    { id: "water", label: "Water Conservation", icon: Droplets },
    { id: "recycling", label: "Recycling", icon: Recycle },
    { id: "renewable", label: "Renewable Energy", icon: Wind },
    { id: "biodiversity", label: "Biodiversity", icon: Mountain },
  ]

  const modules = [
    {
      id: 1,
      title: "Climate Change Basics",
      description: "Understanding the fundamentals of climate change and its global impact",
      category: "climate",
      difficulty: "Beginner",
      duration: "45 min",
      participants: 1247,
      progress: 100,
      status: "completed",
      ecoPoints: 150,
      chapters: 8,
      icon: Sun,
      color: "bg-orange-500",
    },
    {
      id: 2,
      title: "Water Cycle & Conservation",
      description: "Learn about the water cycle and effective conservation strategies",
      category: "water",
      difficulty: "Intermediate",
      duration: "60 min",
      participants: 892,
      progress: 65,
      status: "in-progress",
      ecoPoints: 200,
      chapters: 10,
      icon: Droplets,
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Renewable Energy Systems",
      description: "Explore solar, wind, and other renewable energy technologies",
      category: "renewable",
      difficulty: "Advanced",
      duration: "90 min",
      participants: 634,
      progress: 0,
      status: "locked",
      ecoPoints: 300,
      chapters: 12,
      icon: Wind,
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Recycling & Waste Management",
      description: "Master the art of recycling and sustainable waste management",
      category: "recycling",
      difficulty: "Beginner",
      duration: "30 min",
      participants: 1456,
      progress: 0,
      status: "available",
      ecoPoints: 120,
      chapters: 6,
      icon: Recycle,
      color: "bg-emerald-500",
    },
    {
      id: 5,
      title: "Biodiversity & Ecosystems",
      description: "Discover the importance of biodiversity and ecosystem preservation",
      category: "biodiversity",
      difficulty: "Intermediate",
      duration: "75 min",
      participants: 723,
      progress: 0,
      status: "available",
      ecoPoints: 250,
      chapters: 9,
      icon: Mountain,
      color: "bg-teal-500",
    },
  ]

  const filteredModules =
    selectedCategory === "all" ? modules : modules.filter((module) => module.category === selectedCategory)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Play className="w-5 h-5 text-blue-500" />
      case "locked":
        return <Lock className="w-5 h-5 text-muted-foreground" />
      default:
        return <BookOpen className="w-5 h-5 text-primary" />
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
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage="modules" />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-game text-foreground mb-2">Learning Modules</h1>
          <p className="text-muted-foreground text-lg">
            Explore interactive environmental education modules and earn Eco-Points
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

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const Icon = module.icon
            return (
              <Card
                key={module.id}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {getStatusIcon(module.status)}
                  </div>
                  <CardTitle className="text-xl font-game group-hover:text-primary transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-sm">{module.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Bar (if in progress or completed) */}
                  {module.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  )}

                  {/* Module Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{module.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>{module.chapters} chapters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span>{module.ecoPoints} points</span>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full font-game"
                    disabled={module.status === "locked"}
                    variant={module.status === "completed" ? "outline" : "default"}
                  >
                    {module.status === "completed" && "Review Module"}
                    {module.status === "in-progress" && "Continue Learning"}
                    {module.status === "available" && "Start Module"}
                    {module.status === "locked" && "Unlock Required"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
