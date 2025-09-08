"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Trophy,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Coins,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  currentPage?: string
}

export function Sidebar({ currentPage = "dashboard" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "profile", icon: User, label: "Profile", href: "/profile" },
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { id: "modules", icon: BookOpen, label: "Modules", href: "/modules" },
    { id: "shop", icon: ShoppingBag, label: "Shop", href: "/shop" },
    { id: "leaderboard", icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
  ]

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-game text-sidebar-foreground">BioBlitz</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent ${
                  isActive ? "bg-primary text-primary-foreground" : ""
                } ${isCollapsed ? "px-2" : "px-3"}`}
              >
                <Icon className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Stats (when expanded) */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coins className="w-4 h-4 text-accent" />
              <span className="text-sm text-sidebar-foreground">Eco-Points</span>
            </div>
            <Badge variant="secondary" className="text-game">
              1,250
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-destructive" />
              <span className="text-sm text-sidebar-foreground">Life-Orbs</span>
            </div>
            <Badge variant="secondary" className="text-game">
              45
            </Badge>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/diverse-students-studying.png" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sidebar-foreground truncate">EcoWarrior</div>
              <div className="text-xs text-sidebar-foreground/70">Level 12</div>
            </div>
          )}
          <Button variant="ghost" size="sm" className="text-sidebar-foreground hover:bg-sidebar-accent">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
