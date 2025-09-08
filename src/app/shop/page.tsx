"use client"

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Coins, Heart, Palette, ImageIcon, Sparkles, Lock, Check, Star } from "lucide-react";
import Image from "next/image";

export default function ShopPage() {
  const [userPoints] = useState(1250);
  const [userOrbs] = useState(45);
  const [ownedItems, setOwnedItems] = useState<number[]>([1, 5, 9]);

  const shopCategories = [
    { id: "avatars", label: "Avatars", icon: ImageIcon },
    { id: "banners", label: "Banners", icon: Palette },
    { id: "badges", label: "Badges", icon: Star },
    { id: "themes", label: "Themes", icon: Sparkles },
  ];

  const shopItems = {
    avatars: [
      {
        id: 1,
        name: "Eco Warrior",
        description: "A brave environmental defender",
        price: 200,
        currency: "points",
        rarity: "common",
        image: "/i1.png",
      },
      {
        id: 2,
        name: "Forest Guardian",
        description: "Protector of ancient forests",
        price: 500,
        currency: "points",
        rarity: "rare",
        image: "/i2.png"  ,
      },
      {
        id: 3,
        name: "Ocean Keeper",
        description: "Guardian of marine ecosystems",
        price: 15,
        currency: "orbs",
        rarity: "epic",
        image: "/i5.jpg",
      },
      {
        id: 4,
        name: "Solar Champion",
        description: "Master of renewable energy",
        price: 25,
        currency: "orbs",
        rarity: "legendary",
        image: "/i4.jpg",
      },
    ],
    banners: [
      {
        id: 5,
        name: "Sunset Forest",
        description: "Beautiful forest at golden hour",
        price: 300,
        currency: "points",
        rarity: "common",
        image: "/sunset-forest-banner.jpg",
      },
      {
        id: 6,
        name: "Aurora Borealis",
        description: "Magical northern lights display",
        price: 800,
        currency: "points",
        rarity: "rare",
        image: "/aurora-borealis-banner.jpg",
      },
      {
        id: 7,
        name: "Coral Reef Paradise",
        description: "Vibrant underwater ecosystem",
        price: 20,
        currency: "orbs",
        rarity: "epic",
        image: "/coral-reef-banner.jpg",
      },
    ],
    badges: [
      {
        id: 8,
        name: "Tree Planter",
        description: "Planted 100+ virtual trees",
        price: 150,
        currency: "points",
        rarity: "common",
        image: "/tree-planter-badge.jpg",
      },
      {
        id: 9,
        name: "Carbon Neutral",
        description: "Achieved carbon neutrality",
        price: 400,
        currency: "points",
        rarity: "rare",
        image: "/carbon-neutral-badge.jpg",
      },
      {
        id: 10,
        name: "Eco Legend",
        description: "Ultimate environmental achievement",
        price: 30,
        currency: "orbs",
        rarity: "legendary",
        image: "/eco-legend-badge.jpg",
      },
    ],
    themes: [
      {
        id: 11,
        name: "Ocean Depths",
        description: "Deep blue gradient theme",
        price: 600,
        currency: "points",
        rarity: "rare",
        image: "/ocean-depths-theme.jpg",
      },
      {
        id: 12,
        name: "Forest Canopy",
        description: "Lush green gradient theme",
        price: 18,
        currency: "orbs",
        rarity: "epic",
        image: "/forest-canopy-theme.jpg",
      },
    ],
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
    return currency === "points" ? userPoints >= price : userOrbs >= price;
  };

  const isOwned = (itemId: number) => {
    return ownedItems.includes(itemId);
  };

  const handlePurchase = (itemId: number, price: number, currency: string) => {
    if (canAfford(price, currency) && !isOwned(itemId)) {
      setOwnedItems([...ownedItems, itemId]);
      // In a real app, you'd update the user's currency here
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
                <span className="font-game text-lg">{userPoints.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">Eco-Points</span>
              </div>
              <div className="flex items-center gap-2 bg-card border rounded-lg px-4 py-2">
                <Heart className="w-5 h-5 text-destructive" />
                <span className="font-game text-lg">{userOrbs}</span>
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
                        {/* Use next/image for local images */}
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={256}
                          height={256}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 rounded-lg"
                        />
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-game">{item.name}</CardTitle>
                          <CardDescription className="text-sm">{item.description}</CardDescription>
                        </div>
                        {isOwned(item.id) && <Check className="w-5 h-5 text-green-500" />}
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
                          disabled={!canAfford(item.price, item.currency) || isOwned(item.id)}
                          onClick={() => handlePurchase(item.id, item.price, item.currency)}
                          variant={isOwned(item.id) ? "outline" : "default"}
                        >
                          {isOwned(item.id) ? (
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