"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, BookOpen, Globe, Heart, TrendingUp, Handshake, Lightbulb, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const chapters = [
  {
    number: 1,
    title: "The Science of Climate Change",
    subtitles: [
      "The Greenhouse Effect Explained",
      "Natural vs. Human Causes",
      "Evidence from Past and Present",
    ],
    icon: Leaf,
  },
  {
    number: 2,
    title: "Historical Context",
    subtitles: [
      "The Industrial Revolution and Carbon Dependence",
      "Early Warnings Ignored",
      "From Ozone Hole to Global Warming",
    ],
    icon: BookOpen,
  },
  {
    number: 3,
    title: "The Impacts on Earth Systems",
    subtitles: [
      "Rising Temperatures and Heatwaves",
      "Melting Ice and Rising Seas",
      "Biodiversity Loss and Extinctions",
    ],
    icon: Globe,
  },
  {
    number: 4,
    title: "Human Costs of Climate Change",
    subtitles: [
      "Food and Water Security",
      "Health Risks and Pandemics",
      "Climate Refugees and Migration",
    ],
    icon: Heart,
  },
  {
    number: 5,
    title: "Economics of a Warming World",
    subtitles: [
      "The Cost of Inaction vs. Action",
      "Green Energy and New Markets",
      "The Hidden Price of Fossil Fuels",
    ],
    icon: TrendingUp,
  },
  {
    number: 6,
    title: "Politics and Power",
    subtitles: [
      "International Agreements (Kyoto, Paris, COP)",
      "Global North vs. Global South",
      "Lobbying, Greenwashing, and Public Policy",
    ],
    icon: Handshake,
  },
  {
    number: 7,
    title: "Solutions and Innovations",
    subtitles: [
      "Renewable Energy Revolution",
      "Carbon Capture and Geoengineering",
      "Rethinking Cities, Transport, and Agriculture",
    ],
    icon: Lightbulb,
  },
  {
    number: 8,
    title: "A Future in Our Hands",
    subtitles: [
      "Individual Action vs. Systemic Change",
      "Youth Activism and Climate Movements",
      "Building Resilience and Hope",
    ],
    icon: Users,
  },
];

export default function ClimateChangeCoursePage() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Button
        variant="outline"
        className="mb-8"
        onClick={() => router.push("/modules")}
      >
        ← Back to Dashboard
      </Button>

      <Card className="mb-12 shadow-lg border-0 bg-gradient-to-tr from-green-50 to-emerald-100 dark:from-zinc-900 dark:to-green-950">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-600 text-white text-base px-3 py-1 rounded shadow-md">Climate Change</Badge>
          </div>
          <CardTitle className="text-3xl md:text-4xl font-extrabold mt-6 mb-2 text-green-900 dark:text-green-200 tracking-tight leading-tight">
            Climate Change: <span className="block text-emerald-600 dark:text-emerald-400">Understanding the Crisis</span>
            <span className="block text-orange-600 dark:text-orange-300">and Shaping Our Future</span>
          </CardTitle>
          <CardDescription className="mt-3 text-lg text-zinc-700 dark:text-zinc-300">
            Explore each chapter to learn the science, history, impacts, solutions, and your role in addressing the climate crisis.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col gap-10">
        {chapters.map((chapter) => {
          const Icon = chapter.icon;
          return (
            <Link key={chapter.number} href={`/course/climate-change/${chapter.number}`}>
              <Card className="shadow-md hover:border-primary transition-all cursor-pointer py-7 px-3 md:px-6 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-6 pb-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-orange-100 dark:bg-orange-900 shadow-inner">
                    <Icon className="w-8 h-8 text-orange-500 dark:text-orange-300" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                      Chapter {chapter.number}: {chapter.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {chapter.subtitles.map((subtitle) => (
                        <Badge key={subtitle} className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 rounded">
                          {subtitle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}