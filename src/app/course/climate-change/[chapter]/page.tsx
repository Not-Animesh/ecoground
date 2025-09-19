"use client";

import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { useRef, useState } from "react";
import React from "react";

// Dummy chapter data
const chapterData = [
  {
    number: 1,
    title: "The Science of Climate Change",
    subtitles: [
      "The Greenhouse Effect Explained",
      "Natural vs. Human Causes",
      "Evidence from Past and Present",
    ],
    summary:
      "This chapter unpacks the science: how greenhouse gases trap heat, how industrial activity altered Earth’s natural balance, and how evidence from ice cores, rising temperatures, and extreme weather events proves that climate change is real and accelerating.",
    icon: Leaf,
    youtube: "https://www.youtube.com/embed/G4H1N_yXBiA",
    task: "Take a photo or short video of something in your daily life that relates to greenhouse gases (e.g., transportation, energy usage) and upload it here.",
  },
  // ...other chapters
];

// Letters for MCQ options
const optionLetters = ["A", "B", "C", "D"];

// Fetch one quiz from local API
async function fetchOneQuiz(seen: number[]) {
  const res = await fetch("/api/generate-quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seen }),
  });
  if (!res.ok) throw new Error("Failed to fetch quiz");
  const data = await res.json();
  return data.quiz;
}

export default function ClimateChangeChapterPage() {
  const router = useRouter();
  const params = useParams();
  const chapterNumber = parseInt(params.chapter as string, 10) || 1;
  const chapter = chapterData.find((c) => c.number === chapterNumber) || chapterData[0];

  // Quiz state
  const [quiz, setQuiz] = useState<{
    question: string;
    options: string[];
    answerIndex: number;
    index: number;
  } | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [seen, setSeen] = useState<number[]>([]);
  const [quizCount, setQuizCount] = useState(0);
  const maxQuiz = 10;
  const [finished, setFinished] = useState(false);

  // Upload state for real-life task
  const [file, setFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [taskNote, setTaskNote] = useState<string>("");
  const [taskSubmitted, setTaskSubmitted] = useState(false);
  const [taskSubmitLoading, setTaskSubmitLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch a new quiz question
  async function handleFetchQuiz() {
    setQuizLoading(true);
    setQuizError(null);
    setQuiz(null);
    setSelected(null);
    setShowAnswer(false);
    try {
      if (quizCount >= maxQuiz) {
        setFinished(true);
        setQuiz(null);
        setQuizLoading(false);
        return;
      }
      const quizObj = await fetchOneQuiz(seen);
      setQuiz(quizObj);
    } catch (e) {
      if (e instanceof Error) {
        setQuizError(e.message);
      } else {
        setQuizError("Unknown error");
      }
    }
    setQuizLoading(false);
  }

  // Next Question handler
  async function handleNextQuestion() {
    if (quiz && quiz.index !== undefined) {
      setSeen((prev) => [...prev, quiz.index]);
      setQuizCount((prev) => prev + 1);
    }
    if (quizCount + 1 >= maxQuiz) {
      setFinished(true);
      setQuiz(null);
      return;
    }
    setTimeout(handleFetchQuiz, 300);
  }

  // On mount, start first quiz
  React.useEffect(() => {
    if (quizCount === 0 && !finished) handleFetchQuiz();
    // eslint-disable-next-line
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleTaskSubmit = async () => {
    setTaskSubmitLoading(true);
    // Here you would upload file and note, but for now just fake submit
    setTimeout(() => {
      setTaskSubmitLoading(false);
      setTaskSubmitted(true);
      setFile(null);
      setUploadPreview(null);
      setTaskNote("");
      // Optionally scroll to notification
      const taskNotif = document.getElementById("task-notif");
      if (taskNotif) taskNotif.scrollIntoView({ behavior: "smooth" });
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Back button */}
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push("/course/climate-change")}
      >
        ← Back to Course
      </Button>

      {/* Chapter Title */}
      <div className="mb-4 flex flex-col gap-2">
        <Badge className="bg-green-600 text-white text-base px-3 py-1 rounded w-fit mb-1">
          Chapter {chapter.number}
        </Badge>
        <h1 className="text-3xl font-semibold mb-1">{chapter.title}</h1>
        <div className="flex flex-wrap gap-2">
          {chapter.subtitles.map((subtitle) => (
            <Badge
              key={subtitle}
              className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 rounded"
            >
              {subtitle}
            </Badge>
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Watch: {chapter.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src={chapter.youtube}
                title={chapter.title}
                width="100%"
                height="315"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[315px] rounded-lg border"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Summary */}
      <div className="mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Summary</CardTitle>
            <Button
              size="sm"
              variant="secondary"
              className="ml-2"
              onClick={() => alert("AI-generated summary coming soon!")}
            >
              AI-summary
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-md text-zinc-700 dark:text-zinc-200">
              {chapter.summary}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quiz */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz</CardTitle>
            <CardDescription>
              {finished
                ? "You have finished all quizzes for this chapter!"
                : `Answer the question. (${quizCount + (quiz ? 1 : 0)}/${maxQuiz})`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {quizError && (
              <div className="text-red-500 mb-4">{quizError}</div>
            )}

            {finished ? (
              <div className="text-green-600 font-bold text-xl py-8 text-center">
                🎉 Quiz Complete! You answered {quizCount} questions.
              </div>
            ) : quiz ? (
              <div className="space-y-3">
                <div className="font-semibold text-lg mb-2 text-zinc-800 dark:text-zinc-100">
                  {quiz.question}
                </div>
                <ul className="flex flex-col gap-3">
                  {quiz.options.map((opt, i) => (
                    <li key={i}>
                      <button
                        className={`w-full flex items-center gap-2 px-4 py-2 rounded transition border
                          ${
                            showAnswer
                              ? i === quiz.answerIndex
                                ? "bg-green-600 border-green-700 text-white font-bold"
                                : selected === i
                                ? "bg-red-600 border-red-700 text-white font-bold"
                                : "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100"
                              : selected === i
                              ? "bg-blue-600 border-blue-700 text-white font-bold"
                              : "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100"
                          }
                        `}
                        disabled={showAnswer}
                        onClick={() => setSelected(i)}
                      >
                        <span className="font-bold mr-2">
                          {optionLetters[i] || String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4 mt-4">
                  {!showAnswer ? (
                    <Button
                      variant="default"
                      disabled={selected === null}
                      onClick={() => setShowAnswer(true)}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={async () => {
                        await handleNextQuestion();
                      }}
                    >
                      {quizCount + 1 >= maxQuiz
                        ? "Finish Quiz"
                        : "Next Question"}
                    </Button>
                  )}
                </div>
                {showAnswer && (
                  <div className="mt-2">
                    {selected === quiz.answerIndex ? (
                      <span className="text-green-600 font-bold">
                        Correct!
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold">
                        Incorrect. The correct answer is:{" "}
                        <span className="underline">
                          {optionLetters[quiz.answerIndex]}.
                          {quiz.options[quiz.answerIndex]}
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              !finished && (
                <Button
                  className="mb-4"
                  onClick={handleFetchQuiz}
                  disabled={quizLoading}
                >
                  {quizLoading ? "Generating..." : "Generate Quiz"}
                </Button>
              )
            )}
          </CardContent>
        </Card>
      </div>

      {/* Real-life Task */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-life Task</CardTitle>
            <CardDescription>
              Complete the activity below and submit your proof (photo or video) with a short note.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-3">{chapter.task}</p>
            <div className="flex flex-col gap-3 mb-2">
              <label className="font-medium">Upload a photo or video:</label>
              <input
                type="file"
                accept="image/*,video/*"
                ref={fileInputRef}
                className="mb-1"
                onChange={handleFileChange}
                disabled={taskSubmitLoading || taskSubmitted}
              />
              {uploadPreview && (
                <div className="mb-2">
                  {file && file.type.startsWith("image") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={uploadPreview}
                      alt="Preview"
                      className="w-full max-h-60 object-contain rounded"
                    />
                  ) : (
                    <video
                      src={uploadPreview}
                      controls
                      className="w-full max-h-60 rounded"
                    />
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <label htmlFor="task-note" className="font-medium">Add a short note:</label>
              <textarea
                id="task-note"
                value={taskNote}
                onChange={e => setTaskNote(e.target.value)}
                className="resize-none rounded border bg-zinc-50 dark:bg-zinc-800 p-2 min-h-[70px]"
                placeholder="Describe your action or learning…"
                disabled={taskSubmitLoading || taskSubmitted}
              />
            </div>
            <Button
              disabled={!file || !taskNote.trim() || taskSubmitLoading || taskSubmitted}
              onClick={handleTaskSubmit}
              className="w-full"
            >
              {taskSubmitLoading ? "Submitting..." : taskSubmitted ? "Task Submitted" : "Submit"}
            </Button>
            {taskSubmitted && (
              <div
                id="task-notif"
                className="mt-4 bg-green-100 border border-green-500 text-green-800 px-4 py-2 rounded text-center font-semibold"
              >
                Task submitted and will be verified by a teacher!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}