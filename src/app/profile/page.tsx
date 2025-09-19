// src/app/profile/page.tsx

"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Camera, Edit3, Trophy, Target, Zap, Star, Crown, TreePine, Users, ImageIcon, Check } from "lucide-react";
import { useGameStore } from "@/components/gamification-store";

type AvatarType = {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  image?: string; // Optional image for avatar
};

type BannerType = {
  id: string;
  name: string;
  gradient: string;
};

export default function ProfilePage() {
  const { ecoPoints, lifeOrbs, currentStreak, globalRank, level, unlockedAvatars, equippedAvatar, unlockedBanners, equippedBanner, equipAvatar, equipBanner } = useGameStore();

  const [profile, setProfile] = useState({
    username: "EcoWarrior",
    bio: "🌱 Passionate about saving our planet! 🌍",
    level: level,
    rank: "Eco Guardian",
    position: globalRank,
    modulesCompleted: 23,
    challengesWon: 15,
    treesPlanted: 89,
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const avatars: AvatarType[] = [
    { id: "eco-guardian", name: "Eco Guardian", emoji: "🌿", unlocked: unlockedAvatars.includes("eco-guardian") },
    { id: "tree-keeper", name: "Tree Keeper", emoji: "🌳", unlocked: unlockedAvatars.includes("tree-keeper") },
    { id: "ocean-protector", name: "Ocean Protector", emoji: "🌊", unlocked: unlockedAvatars.includes("ocean-protector") },
    { id: "solar-champion", name: "Solar Champion", emoji: "☀️", unlocked: unlockedAvatars.includes("solar-champion") },
    { id: "earth-defender", name: "Earth Defender", emoji: "🌍", unlocked: unlockedAvatars.includes("earth-defender") },
    { id: "nature-sage", name: "Nature Sage", emoji: "🦉", unlocked: unlockedAvatars.includes("nature-sage") },
    { id: "eco-warrior-shop", name: "Eco Warrior", emoji: "🎮", unlocked: unlockedAvatars.includes("eco-warrior-shop"), image: "/i1.png" },
    { id: "forest-guardian-shop", name: "Forest Guardian", emoji: "🌲", unlocked: unlockedAvatars.includes("forest-guardian-shop"), image: "/i2.png" },
    { id: "ocean-keeper-shop", name: "Ocean Keeper", emoji: "🌊", unlocked: unlockedAvatars.includes("ocean-keeper-shop"), image: "/i5.jpg" },
    { id: "solar-champion-shop", name: "Solar Champion", emoji: "☀️", unlocked: unlockedAvatars.includes("solar-champion-shop"), image: "/i4.jpg" },
  ];

  const banners: BannerType[] = [
    { id: "forest-gradient", name: "Forest Gradient", gradient: "from-emerald-400 via-green-500 to-teal-600" },
    { id: "ocean-waves", name: "Ocean Waves", gradient: "from-blue-400 via-cyan-500 to-teal-600" },
    { id: "sunset-mountains", name: "Sunset Mountains", gradient: "from-orange-400 via-red-500 to-pink-600" },
    { id: "aurora-sky", name: "Aurora Sky", gradient: "from-purple-400 via-pink-500 to-indigo-600" },
    { id: "tropical-paradise", name: "Tropical Paradise", gradient: "from-yellow-400 via-green-500 to-blue-600" },
  ];

  const getBannerGradient = (bannerId: string) => {
    const banner = banners.find((b) => b.id === bannerId);
    return banner?.gradient || "from-emerald-400 via-green-500 to-teal-600";
  };

  const getAvatarDisplay = (avatarId: string) => {
    const avatar = avatars.find((a) => a.id === avatarId);
    if (!avatar) return "🌿";
    if (avatar.image) {
      return (
        <img
          src={avatar.image}
          alt={avatar.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        />
      );
    }
    return <span className="text-6xl">{avatar.emoji}</span>;
  };

  const achievements = [
    { name: "First Steps", description: "Complete your first module", icon: "🌱", unlocked: true },
    { name: "Eco Warrior", description: "Reach level 10", icon: "⚔️", unlocked: true },
    { name: "Tree Hugger", description: "Plant 50 virtual trees", icon: "🌳", unlocked: true },
    { name: "Ocean Guardian", description: "Complete ocean conservation module", icon: "🌊", unlocked: false },
    { name: "Solar Pioneer", description: "Master renewable energy challenges", icon: "☀️", unlocked: false },
    { name: "Climate Champion", description: "Reach top 10 on leaderboard", icon: "🏆", unlocked: false },
  ];

  const activityLog = [
    { action: "Completed Climate Change module", time: "2 hours ago", points: "+50" },
    { action: "Won Weekly Challenge", time: "1 day ago", points: "+100" },
    { action: "Planted 5 virtual trees", time: "2 days ago", points: "+25" },
    { action: "Reached Level 12", time: "3 days ago", points: "+200" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage="profile" />

      <main className="flex-1 overflow-auto">
        {/* Profile Banner */}
        <div className={`h-52 bg-gradient-to-r ${getBannerGradient(equippedBanner)} relative`}>
          <div className="absolute inset-0 bg-black/25" />

          {/* Banner Change Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 text-white border-0 z-20"
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
              <div className="grid grid-cols-2 gap-4 mt-4">
                {banners.map((banner) => (
                  <div
                    key={banner.id}
                    className={`relative h-20 rounded-lg bg-gradient-to-r ${banner.gradient} cursor-pointer border-2
                      ${equippedBanner === banner.id ? "border-primary" : "border-transparent"}
                      ${!unlockedBanners.includes(banner.id) ? "opacity-50" : ""}
                    `}
                    onClick={() => {
                      if (unlockedBanners.includes(banner.id)) {
                        equipBanner(banner.id);
                      }
                    }}
                  >
                    {!unlockedBanners.includes(banner.id) && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-medium">🔒 Locked</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 text-white text-xs font-medium">{banner.name}</div>
                    {equippedBanner === banner.id && <Check className="absolute top-2 right-2 text-white" />}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="px-8 pb-8">
          {/* Profile Header */}
          <div className="relative -mt-20 mb-8 flex items-end space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-2 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  {getAvatarDisplay(equippedAvatar)}
                </div>
              </div>

              {/* Edit Avatar Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 z-20">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-game">Choose Avatar</DialogTitle>
                    <DialogDescription>
                      Select from your avatars, emoji or custom image. Unlock more by leveling up!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {avatars.map((avatar) => (
                      <div
                        key={avatar.id}
                        className={`relative p-4 rounded-lg border-2 cursor-pointer text-center
                          ${equippedAvatar === avatar.id ? "border-primary bg-primary/10" : "border-border"}
                          ${!avatar.unlocked ? "opacity-50" : ""}
                        `}
                        onClick={() => {
                          if (avatar.unlocked) {
                            equipAvatar(avatar.id);
                          }
                        }}
                      >
                        {avatar.image ? (
                          <img
                            src={avatar.image}
                            alt={avatar.name}
                            className="w-12 h-12 rounded-full mx-auto mb-2 object-cover border-2 border-primary"
                          />
                        ) : (
                          <div className="text-4xl mb-2">{avatar.emoji}</div>
                        )}
                        <div className="text-sm font-medium">{avatar.name}</div>
                        {!avatar.unlocked && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs">🔒</span>
                          </div>
                        )}
                        {equippedAvatar === avatar.id && <Check className="absolute top-2 right-2 text-primary" />}
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
                  <div className="text-2xl font-game text-primary">{ecoPoints}</div>
                  <div className="text-xs text-muted-foreground">Eco-Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-game text-destructive">{lifeOrbs}</div>
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

          {/* Tabs Section */}
          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stats" className="font-game">Stats</TabsTrigger>
              <TabsTrigger value="achievements" className="font-game">Achievements</TabsTrigger>
              <TabsTrigger value="activity" className="font-game">Activity</TabsTrigger>
              <TabsTrigger value="social" className="font-game">Social</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                      Current Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-game text-yellow-500">{currentStreak} days</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
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
                  <CardHeader>
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
                  <CardHeader>
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
                {achievements.map((achievement, index) => (
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
                  {activityLog.map((activity, index) => (
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
                <Label htmlFor="username" className="font-game">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="font-game"
                />
              </div>
              <div>
                <Label htmlFor="bio" className="font-game">Bio</Label>
                <Input
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell others about your eco journey..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                <Button onClick={() => setIsEditingProfile(false)} className="font-game">Save Changes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}