"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  // About BioBlitz points
  const aboutPoints = [
    {
      title: "🌱 Eco Learning, Gamified",
      desc: "BioBlitz turns environmental education into an interactive adventure. Quizzes, games, and daily eco challenges make learning fun and impactful.",
      gradient: "from-green-200 via-green-300 to-green-100",
    },
    {
      title: "🤝 Community & Collaboration",
      desc: "Join a vibrant network of eco-warriors, compete on leaderboards, and collaborate on green missions. Together, we change the world—one habit at a time.",
      gradient: "from-blue-200 via-blue-300 to-blue-100",
    },
    {
      title: "🌍 Real-World Impact",
      desc: "Track real habits, earn rewards, and see your progress both in the app and in your life. Every action helps create a healthier planet.",
      gradient: "from-yellow-200 via-green-200 to-blue-100",
    },
  ];

  // Unique selling features
  const uniqueFeatures = [
    {
      emoji: "🎮",
      title: "Play & Progress",
      desc: "Level up by completing eco-friendly tasks, unlock badges and avatar upgrades, and make every day an achievement.",
      gradient: "from-blue-50 to-green-100",
    },
    {
      emoji: "📊",
      title: "Habit Tracker",
      desc: "A simple, beautiful tracker for everyday green actions—see your streaks, join challenges, and never lose your eco momentum.",
      gradient: "from-green-50 to-blue-100",
    },
    {
      emoji: "🏆",
      title: "Eco Leaderboard",
      desc: "Compete with friends, climb the ranks, and celebrate planet-saving progress together in a supportive global community.",
      gradient: "from-yellow-50 to-green-100",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* Background Blur Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-green-400 rounded-full blur-[120px] opacity-30 z-0"></div>
      <div className="absolute top-[360px] right-[-100px] w-[300px] h-[300px] bg-blue-400 rounded-full blur-[100px] opacity-30 z-0"></div>
      <div className="absolute bottom-[-120px] left-[60%] w-[220px] h-[220px] bg-green-300 rounded-full blur-[80px] opacity-30 z-0"></div>
      <div className="absolute bottom-[-110px] right-[10%] w-[190px] h-[190px] bg-blue-300 rounded-full blur-[80px] opacity-30 z-0"></div>

      {/* Navbar */}
      <nav className="w-full px-8 py-4 flex items-center justify-between bg-white/80 fixed top-0 left-0 z-30 shadow backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <Image src="/favicon.jpg" alt="BioBlitz Logo" width={36} height={36} className="rounded-lg" />
          <span className="font-bold text-xl tracking-wide text-green-700">BioBlitz</span>
        </div>
        <ul className="flex gap-8 text-base font-medium">
          <li>
            <a href="#about" className="hover:text-green-600 transition-colors">About</a>
          </li>
          <li>
            <a href="#feature" className="hover:text-blue-600 transition-colors">Feature</a>
          </li>
          <li>
            <a href="#course" className="hover:text-green-600 transition-colors">Course</a>
          </li>
        </ul>
        <div>
          <Link href="/dashboard">
            <button className="bg-green-500 text-white font-bold py-2 px-5 rounded-full shadow hover:bg-green-600 transition">
              Log In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="pt-32 pb-16 flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 relative z-10"
        style={{ 
          backgroundImage: 'url(/Pixelforest.jpg)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          borderRadius: '20px', // Optional: adds rounded corners to the hero section
          padding: '40px', // Optional: adds some internal padding
          marginTop: '20px', // Optional: separates it from the navbar slightly
        }}
      >
        <div className="flex-1 flex flex-col gap-8 bg-white/80 p-8 rounded-xl shadow-lg"> {/* Added a background to the text for readability */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-2 text-green-700 drop-shadow-lg">
            Transform Playtime into Learning
          </h1>
          <p className="text-lg text-gray-600 max-w-md mb-4">
            Join BioBlitz—where gamified environmental learning meets real-world impact. Learn, play, and grow alongside thousands of eco-warriors committed to making a difference.
          </p>
          <Link href="/dashboard">
            <button className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow hover:bg-blue-600 transition text-lg">
              Get Started &gt;
            </button>
          </Link>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end mb-10 lg:mb-0">
          <Image
            src="/img1.png"
            alt="BioBlitz Hero"
            width={608}
            height={331}
            className="rounded-3xl shadow-lg border-4 border-blue-400 object-cover"
            priority
          />
        </div>
      </section>

      {/* About BioBlitz Section */}
      <section id="about" className="py-12 bg-white/70 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-center text-green-700 mb-10">About BioBlitz</h2>
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            {aboutPoints.map((point, i) => (
              <div
                key={i}
                className={`flex-1 min-w-[240px] bg-gradient-to-br ${point.gradient} rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center hover:scale-[1.03] transition`}
              >
                <h3 className="text-2xl mb-2">{point.title}</h3>
                <p className="text-gray-700 text-center">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="feature" className="py-16 bg-white relative z-10">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-10">Why Choose BioBlitz?</h2>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {uniqueFeatures.map((f, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center gap-6 bg-gradient-to-br ${f.gradient} rounded-2xl py-8 px-4 shadow-lg hover:scale-105 transition`}
            >
              <span className="text-4xl mb-2">{f.emoji}</span>
              <h3 className="text-xl font-bold text-green-800">{f.title}</h3>
              <p className="text-gray-700 text-md">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course Section */}
      <section id="course" className="py-16 bg-white/90 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 text-center mb-8">Our Courses Help You Improve</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Eco Habits",
                desc: "Daily, weekly, and monthly challenges to build lifelong green habits—customized just for you.",
                emoji: "🌿",
                bg: "bg-green-50"
              },
              {
                title: "Knowledge Quests",
                desc: "Quizzes, guides, and fun facts to supercharge your understanding of sustainability topics.",
                emoji: "🧠",
                bg: "bg-blue-50"
              },
              {
                title: "Collaborative Missions",
                desc: "Team up for bigger goals, unlock group badges, and make community-driven impact.",
                emoji: "👥",
                bg: "bg-yellow-50"
              }
            ].map((course, i) => (
              <div key={i} className={`flex flex-col items-center text-center gap-3 ${course.bg} rounded-2xl py-8 px-4 shadow`}>
                <span className="text-4xl mb-2">{course.emoji}</span>
                <h4 className="text-lg font-bold text-blue-700">{course.title}</h4>
                <p className="text-gray-700 text-sm">{course.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 text-gray-700 py-10 px-6 relative z-10 border-t border-green-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-2 text-green-700">Product</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">iOS App</a></li>
              <li><a href="#" className="hover:underline">Android App</a></li>
              <li><a href="#" className="hover:underline">How it Works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-green-700">Company</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">News</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-green-700">Community</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Guidelines</a></li>
              <li><a href="#" className="hover:underline">Hall of Heroes</a></li>
              <li><a href="#" className="hover:underline">Translate BioBlitz</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-green-700">Support</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Report a Bug</a></li>
              <li><a href="#" className="hover:underline">Request a Feature</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <span>© 2025 BioBlitz. All rights reserved.</span>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#"><span className="inline-block w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-lg">T</span></a>
            <a href="#"><span className="inline-block w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-lg">F</span></a>
            <a href="#"><span className="inline-block w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-blue-500 font-bold text-lg">I</span></a>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-400 text-center">
          Privacy Policy | Terms of Service
        </div>
      </footer>
    </div>
  );
}