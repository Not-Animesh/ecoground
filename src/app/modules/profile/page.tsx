"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Camera, Edit3, Trophy, Target, Zap, Star, Crown, TreePine } from "lucide-react"
import { Users } from "lucide-react" // Import Users component

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "EcoWarrior",
    avatar: "eco-guardian",
    banner: "forest-gradient",
    bio: "🌱 Passionate about saving our planet! 🌍",
    level: 12,
    rank: "Eco Guardian",
    position: 47,
    ecoPoints: 1250,
    lifeOrbs: 45,
    streak: 7,
    modulesCompleted: 23,
    challengesWon: 15,
    treesPlanted: 89,
  })

  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // In-game collectible avatars
  const avatars = [
    { id: "eco-guardian", name: "Eco Guardian", icon: "🌿", unlocked: true },
    { id: "tree-keeper", name: "Tree Keeper", icon: "🌳", unlocked: true },
    { id: "ocean-protector", name: "Ocean Protector", icon: "🌊", unlocked: false },
    { id: "solar-champion", name: "Solar Champion", icon: "☀️", unlocked: true },
    { id: "earth-defender", name: "Earth Defender", icon: "🌍", unlocked: false },
    { id: "nature-sage", name: "Nature Sage", icon: "🦉", unlocked: false },
  ]

  // In-game collectible banners
  const banners = [
    { id: "forest-gradient", name: "Forest Gradient", unlocked: true },
    { id: "ocean-waves", name: "Ocean Waves", unlocked: true },
    { id: "sunset-mountains", name: "Sunset Mountains", unlocked: false },
    { id: "aurora-sky", name: "Aurora Sky", unlocked: false },
    { id: "tropical-paradise", name: "Tropical Paradise", unlocked: false },
  ]

  const getBannerGradient = (bannerId: string) => {
    const gradients = {
      "forest-gradient": "from-emerald-400 via-green-500 to-teal-600",
      "ocean-waves": "from-blue-400 via-cyan-500 to-teal-600",
      "sunset-mountains": "from-orange-400 via-red-500 to-pink-600",
      "aurora-sky": "from-purple-400 via-pink-500 to-indigo-600",
      "tropical-paradise": "from-yellow-400 via-green-500 to-blue-600",
    }
    return gradients[bannerId as keyof typeof gradients] || gradients["forest-gradient"]
  }

  const getAvatarIcon = (avatarId: string) => {
    const avatar = avatars.find((a) => a.id === avatarId)
    return avatar?.icon || "🌿"
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="profile" />

      <main className="flex-1 overflow-auto">
        {/* Profile Banner */}
        <div className={`h-48 bg-gradient-to-r ${getBannerGradient(profile.banner)} relative`}>
          <div className="absolute inset-0 bg-black/20" />

          {/* Edit Banner Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border-0"
              >
                <Camera className="w-4 h-4 mr-2" />
                Change Banner
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-game">Choose Banner</DialogTitle>
                <DialogDescription>
                  Select from your collected banners or unlock new ones by completing challenges!
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                {banners.map((banner) => (
                  <div
                    key={banner.id}
                    className={`relative h-20 rounded-lg bg-gradient-to-r ${getBannerGradient(banner.id)} cursor-pointer border-2 ${
                      profile.banner === banner.id ? "border-primary" : "border-transparent"
                    } ${!banner.unlocked ? "opacity-50" : ""}`}
                    onClick={() => {
                      if (banner.unlocked) {
                        setProfile({ ...profile, banner: banner.id })
                      }
                    }}
                  >
                    {!banner.unlocked && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-medium">🔒 Locked</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 text-white text-xs font-medium">{banner.name}</div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="px-8 pb-8">
          {/* Profile Header */}
          <div className="relative -mt-16 mb-8">
            <div className="flex items-end space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-6xl">
                    {getAvatarIcon(profile.avatar)}
                  </div>
                </div>

                {/* Edit Avatar Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-game">Choose Avatar</DialogTitle>
                      <DialogDescription>
                        Select from your collected avatars or unlock new ones by leveling up!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-3 gap-4">
                      {avatars.map((avatar) => (
                        <div
                          key={avatar.id}
                          className={`relative p-4 rounded-lg border-2 cursor-pointer text-center ${
                            profile.avatar === avatar.id ? "border-primary bg-primary/10" : "border-border"
                          } ${!avatar.unlocked ? "opacity-50" : ""}`}
                          onClick={() => {
                            if (avatar.unlocked) {
                              setProfile({ ...profile, avatar: avatar.id })
                            }
                          }}
                        >
                          <div className="text-4xl mb-2">{avatar.icon}</div>
                          <div className="text-sm font-medium">{avatar.name}</div>
                          {!avatar.unlocked && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs">🔒</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Profile Info */}
              <div className="flex-1 pb-4">
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-3xl font-game text-foreground">{profile.username}</h1>
                  <Badge variant="secondary" className="font-game">
                    <Crown className="w-4 h-4 mr-1" />
                    {profile.rank}
                  </Badge>
                  <Badge variant="outline" className="font-game">
                    Level {profile.level}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4">{profile.bio}</p>

                {/* Quick Stats */}
                <div className="flex space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-game text-primary">{profile.ecoPoints}</div>
                    <div className="text-xs text-muted-foreground">Eco-Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-game text-destructive">{profile.lifeOrbs}</div>
                    <div className="text-xs text-muted-foreground">Life-Orbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-game text-accent">#{profile.position}</div>
                    <div className="text-xs text-muted-foreground">Global Rank</div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <Button onClick={() => setIsEditingProfile(true)} className="font-game">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Profile Content */}
          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stats" className="font-game">
                Stats
              </TabsTrigger>
              <TabsTrigger value="achievements" className="font-game">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="activity" className="font-game">
                Activity
              </TabsTrigger>
              <TabsTrigger value="social" className="font-game">
                Social
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                      Current Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-game text-yellow-500">{profile.streak} days</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Target className="w-4 h-4 mr-2 text-blue-500" />
                      Modules Completed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-game text-blue-500">{profile.modulesCompleted}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Trophy className="w-4 h-4 mr-2 text-orange-500" />
                      Challenges Won
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-game text-orange-500">{profile.challengesWon}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <TreePine className="w-4 h-4 mr-2 text-green-500" />
                      Trees Planted
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-game text-green-500">{profile.treesPlanted}</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "First Steps", description: "Complete your first module", icon: "🌱", unlocked: true },
                  { name: "Eco Warrior", description: "Reach level 10", icon: "⚔️", unlocked: true },
                  { name: "Tree Hugger", description: "Plant 50 virtual trees", icon: "🌳", unlocked: true },
                  {
                    name: "Ocean Guardian",
                    description: "Complete ocean conservation module",
                    icon: "🌊",
                    unlocked: false,
                  },
                  {
                    name: "Solar Pioneer",
                    description: "Master renewable energy challenges",
                    icon: "☀️",
                    unlocked: false,
                  },
                  { name: "Climate Champion", description: "Reach top 10 on leaderboard", icon: "🏆", unlocked: false },
                ].map((achievement, index) => (
                  <Card key={index} className={achievement.unlocked ? "" : "opacity-50"}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <div className="font-game text-sm">{achievement.name}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        </div>
                        {achievement.unlocked && <Star className="w-4 h-4 text-yellow-500 ml-auto" />}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-game">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: "Completed Climate Change module", time: "2 hours ago", points: "+50" },
                    { action: "Won Weekly Challenge", time: "1 day ago", points: "+100" },
                    { action: "Planted 5 virtual trees", time: "2 days ago", points: "+25" },
                    { action: "Reached Level 12", time: "3 days ago", points: "+200" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div>
                        <div className="text-sm font-medium">{activity.action}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                      <Badge variant="secondary" className="font-game text-green-600">
                        {activity.points}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-game">Social Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Connect with friends to share your eco journey!</p>
                    <Button className="mt-4 font-game">Find Friends</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-game">Edit Profile</DialogTitle>
              <DialogDescription>Customize your profile information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="font-game">
                  Username
                </Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="font-game"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="font-game">
                  Bio
                </Label>
                <Input
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell others about your eco journey..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditingProfile(false)} className="font-game">
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
