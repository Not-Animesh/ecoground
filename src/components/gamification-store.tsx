"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface GameState {
  ecoPoints: number
  lifeOrbs: number
  currentStreak: number
  globalRank: number
  level: number
  completedModules: string[]
  completedChallenges: string[]
  achievements: string[]
  lastLoginDate: string

  // Actions
  addEcoPoints: (points: number) => void
  addLifeOrbs: (orbs: number) => void
  spendLifeOrbs: (orbs: number) => boolean
  completeModule: (moduleId: string) => void
  completeChallenge: (challengeId: string) => void
  updateStreak: () => void
  addAchievement: (achievementId: string) => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ecoPoints: 1250,
      lifeOrbs: 45,
      currentStreak: 7,
      globalRank: 4,
      level: 12,
      completedModules: ["climate-basics"],
      completedChallenges: ["plastic-free-week"],
      achievements: ["eco-warrior", "energy-saver", "top-performer"],
      lastLoginDate: new Date().toDateString(),

      addEcoPoints: (points) =>
        set((state) => ({
          ecoPoints: state.ecoPoints + points,
        })),

      addLifeOrbs: (orbs) =>
        set((state) => ({
          lifeOrbs: state.lifeOrbs + orbs,
        })),

      spendLifeOrbs: (orbs) => {
        const state = get()
        if (state.lifeOrbs >= orbs) {
          set({ lifeOrbs: state.lifeOrbs - orbs })
          return true
        }
        return false
      },

      completeModule: (moduleId) =>
        set((state) => {
          if (!state.completedModules.includes(moduleId)) {
            return {
              completedModules: [...state.completedModules, moduleId],
              ecoPoints: state.ecoPoints + 100,
              lifeOrbs: state.lifeOrbs + 5,
            }
          }
          return state
        }),

      completeChallenge: (challengeId) =>
        set((state) => {
          if (!state.completedChallenges.includes(challengeId)) {
            return {
              completedChallenges: [...state.completedChallenges, challengeId],
              ecoPoints: state.ecoPoints + 50,
              lifeOrbs: state.lifeOrbs + 3,
            }
          }
          return state
        }),

      updateStreak: () =>
        set((state) => {
          const today = new Date().toDateString()
          const lastLogin = new Date(state.lastLoginDate)
          const todayDate = new Date(today)
          const daysDiff = Math.floor((todayDate.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24))

          let newStreak = state.currentStreak
          if (daysDiff === 1) {
            newStreak += 1
          } else if (daysDiff > 1) {
            newStreak = 1
          }

          return {
            currentStreak: newStreak,
            lastLoginDate: today,
            ecoPoints: state.ecoPoints + 10, // Daily login bonus
          }
        }),

      addAchievement: (achievementId) =>
        set((state) => {
          if (!state.achievements.includes(achievementId)) {
            return {
              achievements: [...state.achievements, achievementId],
              lifeOrbs: state.lifeOrbs + 10,
            }
          }
          return state
        }),
    }),
    {
      name: "ecoground-game-state",
    },
  ),
)
