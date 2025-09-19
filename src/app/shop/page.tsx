// src/app/shop/page.tsx

"use client"

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Coins, Heart, Palette, ImageIcon, Sparkles, Lock, Check, Star } from "lucide-react";
import Image from "next/image";
import { useGameStore } from "@/components/gamification-store";

export default function ShopPage() {
  const { ecoPoints, lifeOrbs, unlockedAvatars, unlockedBanners, addEcoPoints, spendLifeOrbs, unlockAvatar, unlockBanner } = useGameStore();

  const shopCategories = [
    { id: "avatars", label: "Avatars", icon: ImageIcon },
    { id: "banners", label: "Banners", icon: Palette },
    { id: "badges", label: "Badges", icon: Star },
    { id: "themes", label: "Themes", icon: Sparkles },
  ];

  const bannersData = [
    {
      id: "forest-gradient",
      name: "Forest Gradient",
      price: 150,
      currency: "points",
      rarity: "common",
      gradient: "from-emerald-400 via-green-500 to-teal-600",
    },
    {
      id: "ocean-waves",
      name: "Ocean Waves",
      price: 250,
      currency: "points",
      rarity: "rare",
      gradient: "from-blue-400 via-cyan-500 to-teal-600",
    },
    {
      id: "sunset-mountains",
      name: "Sunset Mountains",
      price: 10,
      currency: "orbs",
      rarity: "epic",
      gradient: "from-orange-400 via-red-500 to-pink-600",
    },
    {
      id: "aurora-sky",
      name: "Aurora Sky",
      price: 20,
      currency: "orbs",
      rarity: "legendary",
      gradient: "from-purple-400 via-pink-500 to-indigo-600",
    },
  ];

  const shopItems = {
    avatars: [
      {
        id: "eco-warrior-shop",
        name: "Eco Warrior",
        description: "A brave environmental defender",
        price: 200,
        currency: "points",
        rarity: "common",
        image: "/i1.png",
      },
      {
        id: "forest-guardian-shop",
        name: "Forest Guardian",
        description: "Protector of ancient forests",
        price: 500,
        currency: "points",
        rarity: "rare",
        image: "/i2.png",
      },
      {
        id: "ocean-keeper-shop",
        name: "Ocean Keeper",
        description: "Guardian of marine ecosystems",
        price: 15,
        currency: "orbs",
        rarity: "epic",
        image: "/i5.jpg",
      },
      {
        id: "solar-champion-shop",
        name: "Solar Champion",
        description: "Master of renewable energy",
        price: 25,
        currency: "orbs",
        rarity: "legendary",
        image: "/i4.jpg",
      },
    ],
    banners: bannersData.map(banner => ({
      id: banner.id,
      name: banner.name,
      description: `A beautiful banner with the ${banner.name} theme.`,
      price: banner.price,
      currency: banner.currency,
      rarity: banner.rarity,
      image: `/img/${banner.id}.png`, // Placeholder image path
      gradient: banner.gradient,
    })),
    badges: [],
    themes: [],
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "epic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "legendary":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const canAfford = (price: number, currency: string) => {
    return currency === "points" ? ecoPoints >= price : lifeOrbs >= price;
  };

  const isAvatarOwned = (itemId: string) => {
    return unlockedAvatars.includes(itemId);
  };

  const isBannerOwned = (itemId: string) => {
    return unlockedBanners.includes(itemId);
  };
  
  const handlePurchase = (itemId: string, price: number, currency: string, itemType: string) => {
    const isOwned = itemType === 'avatars' ? isAvatarOwned(itemId) : isBannerOwned(itemId);
    
    if (canAfford(price, currency) && !isOwned) {
      if (currency === "points") {
        addEcoPoints(-price);
      } else {
        spendLifeOrbs(price);
      }
      if (itemType === 'avatars') {
        unlockAvatar(itemId);
      } else {
        unlockBanner(itemId);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage="shop" />

      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-game text-foreground mb-2">Eco Shop</h1>
              <p className="text-muted-foreground text-lg">Customize your profile with collectible items</p>
            </div>

            {/* Currency Display */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-card border rounded-lg px-4 py-2">
                <Coins className="w-5 h-5 text-accent" />
                <span className="font-game text-lg">{ecoPoints.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Eco-Points</span>
              </div>
              <div className="flex items-center gap-2 bg-card border rounded-lg px-4 py-2">
                <Heart className="w-5 h-5 text-destructive" />
                <span className="font-game text-lg">{lifeOrbs}</span>
                <span className="text-sm text-muted-foreground">Life-Orbs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Tabs */}
        <Tabs defaultValue="avatars" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            {shopCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {category.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {shopCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {shopItems[category.id as keyof typeof shopItems]?.map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                  >
                    <CardHeader className="pb-3">
                      <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                        {category.id === 'banners' ? (
                          <div className={`w-full h-full bg-gradient-to-r ${item.gradient}`}></div>
                        ) : (
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={256}
                            height={256}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 rounded-lg"
                          />
                        )}
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-game">{item.name}</CardTitle>
                          <CardDescription className="text-sm">{item.description}</CardDescription>
                        </div>
                        {isAvatarOwned(item.id) || isBannerOwned(item.id) && <Check className="w-5 h-5 text-green-500" />}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Rarity Badge */}
                      <Badge className={getRarityColor(item.rarity)}>
                        {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
                      </Badge>

                      {/* Price and Purchase Button */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {item.currency === "points" ? (
                              <Coins className="w-4 h-4 text-accent" />
                            ) : (
                              <Heart className="w-4 h-4 text-destructive" />
                            )}
                            <span className="font-game text-lg">{item.price}</span>
                          </div>
                        </div>

                        <Button
                          className="w-full font-game"
                          disabled={!canAfford(item.price, item.currency) || isAvatarOwned(item.id) || isBannerOwned(item.id)}
                          onClick={() => handlePurchase(item.id, item.price, item.currency, category.id)}
                          variant={isAvatarOwned(item.id) || isBannerOwned(item.id) ? "outline" : "default"}
                        >
                          {isAvatarOwned(item.id) || isBannerOwned(item.id) ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Owned
                            </>
                          ) : !canAfford(item.price, item.currency) ? (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Insufficient Funds
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Purchase
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}