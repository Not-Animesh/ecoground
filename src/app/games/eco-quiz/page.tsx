"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Check, Coins, Heart, Play, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useGameStore } from "@/components/gamification-store"

type QuizState = "video" | "quiz" | "result"

const QUIZ_QUESTIONS = [
  {
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    question: "What is the primary cause of climate change?",
    options: [
      "Volcanic eruptions",
      "Human activities (burning fossil fuels)",
      "Solar flares",
      "Changes in the Earth's orbit",
    ],
    correctAnswer: "Human activities (burning fossil fuels)",
    points: 50,
    orbs: 2,
  },
  {
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    question: "What does 'biodiversity' refer to?",
    options: [
      "The variety of life on Earth",
      "The number of new species discovered",
      "The size of a species' population",
      "The color variations within a species",
    ],
    correctAnswer: "The variety of life on Earth",
    points: 60,
    orbs: 3,
  },
]

export default function VideoQuizGame() {
  const [quizState, setQuizState] = useState<QuizState>("video")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timer, setTimer] = useState(30)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)
  const [totalOrbs, setTotalOrbs] = useState(0)

  // Zustand store actions
  const addEcoPoints = useGameStore((s) => s.addEcoPoints)
  const addLifeOrbs = useGameStore((s) => s.addLifeOrbs)

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex]
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (quizState === "quiz" && timer > 0) {
      timerId = setTimeout(() => setTimer(timer - 1), 1000)
    } else if (timer === 0) {
      handleAnswer(null) // Time's up
    }
    return () => clearTimeout(timerId)
    // eslint-disable-next-line
  }, [quizState, timer])

  const handleVideoEnd = () => {
    setQuizState("quiz")
    setTimer(30)
  }

  const handleAnswer = (answer: string | null) => {
    setSelectedOption(answer)
    const correct = answer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    // Award points/orbs for correct answer
    if (correct) {
      setTotalPoints(prevPoints => prevPoints + currentQuestion.points)
      setTotalOrbs(prevOrbs => prevOrbs + (currentQuestion.orbs ?? 0))
      // Update global store
      addEcoPoints(currentQuestion.points)
      addLifeOrbs(currentQuestion.orbs ?? 0)
    }

    setTimeout(() => {
      setShowResult(false)
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1)
        setQuizState("video")
        if (videoRef.current) {
          videoRef.current.play()
        }
      } else {
        setIsGameComplete(true)
        setQuizState("result")
      }
    }, 2000)
  }

  const restartGame = () => {
    setCurrentQuestionIndex(0)
    setQuizState("video")
    setTimer(30)
    setShowResult(false)
    setIsCorrect(false)
    setSelectedOption(null)
    setIsGameComplete(false)
    setTotalPoints(0)
    setTotalOrbs(0)
  }

  const getButtonVariant = (option: string) => {
    if (!showResult) {
      return selectedOption === option ? "default" : "outline"
    }
    if (option === currentQuestion.correctAnswer) {
      return "default"
    }
    if (selectedOption === option && !isCorrect) {
      return "destructive"
    }
    return "outline"
  }

  const renderGameContent = () => {
    if (isGameComplete) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-game">Game Over!</CardTitle>
            <CardDescription>You&apos;ve completed all the quizzes. Well done!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center gap-2">
                <Coins className="w-8 h-8 text-accent" />
                <span className="text-4xl font-game text-foreground">{totalPoints}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-8 h-8 text-destructive" />
                <span className="text-4xl font-game text-foreground">{totalOrbs}</span>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">Total Eco-Points & Life-Orbs earned</p>
            <Button className="w-full font-game" onClick={restartGame}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      )
    }

    if (quizState === "video") {
      return (
        <div className="relative mx-auto w-[640px] aspect-video">
          <Image
            src="/quiz_tv_frame.png"
            alt="TV Frame"
            fill
            className="z-10 pointer-events-none object-contain"
          />

          <video
            ref={videoRef}
            src={currentQuestion.videoUrl}
            onEnded={handleVideoEnd}
            autoPlay
            controls={false}
            className="absolute top-[10.5%] left-[9%] w-[82.5%] h-[74.5%] rounded-lg object-cover"
          />
        </div>
      )
    }

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-game">{currentQuestion.question}</CardTitle>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-destructive" />
            <span className="text-xl font-game">{timer}s</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              className="w-full font-game text-left justify-start"
              variant={getButtonVariant(option)}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
            >
              {showResult && option === currentQuestion.correctAnswer && <CheckCircle className="w-4 h-4 mr-2" />}
              {option}
            </Button>
          ))}
          {showResult && (
            <div className="flex justify-between items-center mt-4">
              <Badge variant={isCorrect ? "default" : "destructive"}>
                {isCorrect ? "Correct!" : "Incorrect"}
              </Badge>
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-accent" />
                <span className="font-game">{isCorrect ? `+${currentQuestion.points}` : `+0`}</span>
                <Heart className="w-4 h-4 text-destructive" />
                <span className="font-game">{isCorrect ? `+${currentQuestion.orbs}` : `+0`}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentPage="games" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-game text-foreground mb-2">Video Quiz Challenge</h1>
          <p className="text-muted-foreground text-lg">
            Watch the video and answer the question in under 30 seconds to earn points.
          </p>
        </div>
        {renderGameContent()}
      </main>
    </div>
  )
}