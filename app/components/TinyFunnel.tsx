'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Circle, Brain, Code, Lightbulb, Menu, X, Search, Orbit } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Lamp } from "./Lamp"

type Step = {
  id: string
  title: string
  subtitle?: string
  component: React.ReactNode
  options?: {
    text: string
    nextStep: string
    icon?: React.ReactNode
  }[]
}

export default function TinyFunnel() {
  const [currentStepId, setCurrentStepId] = useState<string>("welcome")
  const [path, setPath] = useState<string[]>([])
  const [userType, setUserType] = useState<string>("")
  const [progress, setProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>("")
  const isMobile = useMediaQuery("(max-width: 640px)")

  const handleNext = (nextStepId: string, type?: string) => {
    setPath([...path, currentStepId])
    setCurrentStepId(nextStepId)
    if (type) setUserType(type)
    setSelectedOption("")

    // Calculate progress based on typical path length of 5 steps
    const newProgress = Math.min(100, ((path.length + 1) / 5) * 100)
    setProgress(newProgress)

    // Scroll to top on mobile when changing steps
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleBack = () => {
    if (path.length > 0) {
      const previousStep = path[path.length - 1]
      const newPath = path.slice(0, path.length - 1)
      setPath(newPath)
      setCurrentStepId(previousStep)

      // Update progress
      const newProgress = Math.max(0, (newPath.length / 5) * 100)
      setProgress(newProgress)

      // Scroll to top on mobile when going back
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }

  const handleReset = () => {
    setCurrentStepId("welcome")
    setPath([])
    setUserType("")
    setProgress(0)
    setMobileMenuOpen(false)
  }

  const WelcomeStep: React.FC = () => (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Circle className="h-6 w-6 text-indigo-400" strokeWidth={2.5}/>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-blue-300">
          Halo
        </h1>
      </div>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
        Your Second Brain.
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-indigo-300">
          Everywhere You Browse.
        </span>
      </h2>
      <p className="text-base md:text-lg text-white/50 mb-8 md:mb-12">
        Transform your scattered digital world into a structured second brain with Halo&apos;s Chrome extension.
      </p>
      <div className="grid gap-4 w-full max-w-md">
        <Button
          size={isMobile ? "default" : "lg"}
          variant="outline"
          className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
            selectedOption === "knowledge-worker" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
          }`}
          onClick={() => {
            setSelectedOption("knowledge-worker")
            handleNext("what-brings-you", "knowledge-worker")
          }}
        >
          <div className="flex items-center gap-3">
            <Brain className={`h-5 w-5 ${selectedOption === "knowledge-worker" ? "text-white" : "text-indigo-400"}`} />
            <div>
              <div className="font-medium">I&apos;m a knowledge worker</div>
              <div className="text-xs md:text-sm text-primary-foreground/80">Looking to organize my digital life</div>
            </div>
          </div>
        </Button>

        <Button
          size={isMobile ? "default" : "lg"}
          variant="outline"
          className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
            selectedOption === "student" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
          }`}
          onClick={() => {
            setSelectedOption("student")
            handleNext("what-brings-you", "student")
          }}
        >
          <div className="flex items-center gap-3">
            <Lightbulb className={`h-5 w-5 ${selectedOption === "student" ? "text-white" : "text-indigo-400"}`} />
            <div>
              <div className="font-medium text-white">I&apos;m a student</div>
              <div className="text-xs md:text-sm text-white/50">Need better research organization</div>
            </div>
          </div>
        </Button>

        <Button
          size={isMobile ? "default" : "lg"}
          variant="outline"
          className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
            selectedOption === "creator" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
          }`}
          onClick={() => {
            setSelectedOption("creator")
            handleNext("what-brings-you", "creator")
          }}
        >
          <div className="flex items-center gap-3">
            <Code className={`h-5 w-5 ${selectedOption === "creator" ? "text-white" : "text-indigo-400"}`} />
            <div>
              <div className="font-medium text-white">I&apos;m a creator</div>
              <div className="text-xs md:text-sm text-white/50">Want to streamline content creation</div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  )

  const WhatBringsYouStep: React.FC = () => (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-blue-300">
        Which struggle feels most like yours?
      </h2>
      <p className="text-base md:text-lg text-white/70 mb-8 md:mb-12">
        {userType === "knowledge-worker"
          ? "Every day, brilliant insights slip through the cracks of our digital chaos. Which challenge is holding you back?"
          : userType === "student"
            ? "Research should fuel your learning, not slow it down. What's your biggest obstacle?"
            : "Your creativity deserves a better system. What's getting in your way?"}
      </p>
      <div className="grid gap-4 w-full max-w-md">
        {userType === "knowledge-worker" ? (
          <>
            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
                selectedOption === "information-overload" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
              }`}
              onClick={() => {
                setSelectedOption("information-overload")
                handleNext("information-overload")
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full bg-indigo-400/20 flex items-center justify-center ${
                  selectedOption === "information-overload" ? "text-white" : "text-indigo-400"
                }`}>
                  <Brain className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-1">Drowning in Information</div>
                  <div className="text-xs md:text-sm text-primary-foreground/80">
                    &quot;I save things but can never find them when I need them most&quot;
                  </div>
                </div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
                selectedOption === "lost-information" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
              }`}
              onClick={() => {
                setSelectedOption("lost-information")
                handleNext("lost-information")
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full bg-indigo-400/20 flex items-center justify-center ${
                  selectedOption === "lost-information" ? "text-white" : "text-indigo-400"
                }`}>
                  <Search className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white mb-1">Knowledge Scattered Everywhere</div>
                  <div className="text-xs md:text-sm text-white/50">
                    &quot;My notes, bookmarks, and research are a mess across different tools&quot;
                  </div>
                </div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
                selectedOption === "context-switching" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
              }`}
              onClick={() => {
                setSelectedOption("context-switching")
                handleNext("context-switching")
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full bg-indigo-400/20 flex items-center justify-center ${
                  selectedOption === "context-switching" ? "text-white" : "text-indigo-400"
                }`}>
                  <Orbit className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white mb-1">Lost in Context Switching</div>
                  <div className="text-xs md:text-sm text-white/50">
                    &quot;I waste so much time jumping between tabs and trying to refocus&quot;
                  </div>
                </div>
              </div>
            </Button>
          </>
        ) : userType === "student" ? (
          <>
            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
                selectedOption === "research-organization" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
              }`}
              onClick={() => {
                setSelectedOption("research-organization")
                handleNext("research-organization")
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full bg-indigo-400/20 flex items-center justify-center ${
                  selectedOption === "research-organization" ? "text-white" : "text-indigo-400"
                }`}>
                  <Brain className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-1">Research is Overwhelming</div>
                  <div className="text-xs md:text-sm text-primary-foreground/80">
                    &quot;I spend more time organizing sources than actually learning&quot;
                  </div>
                </div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
                selectedOption === "citation-management" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
              }`}
              onClick={() => {
                setSelectedOption("citation-management")
                handleNext("citation-management")
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full bg-indigo-400/20 flex items-center justify-center ${
                  selectedOption === "citation-management" ? "text-white" : "text-indigo-400"
                }`}>
                  <Search className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white mb-1">Citations are a Pain</div>
                  <div className="text-xs md:text-sm text-white/50">
                    &quot;Managing references and formatting citations takes forever&quot;
                  </div>
                </div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
                selectedOption === "study-efficiency" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
              }`}
              onClick={() => {
                setSelectedOption("study-efficiency")
                handleNext("study-efficiency")
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full bg-indigo-400/20 flex items-center justify-center ${
                  selectedOption === "study-efficiency" ? "text-white" : "text-indigo-400"
                }`}>
                  <Orbit className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white mb-1">Information Overload</div>
                  <div className="text-xs md:text-sm text-white/50">
                    &quot;I take tons of notes but struggle to connect and retain the knowledge&quot;
                  </div>
                </div>
              </div>
            </Button>
          </>
        ) : (
          <>
            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
                selectedOption === "content-organization" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
              }`}
              onClick={() => {
                setSelectedOption("content-organization")
                handleNext("content-organization")
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full bg-indigo-400/20 flex items-center justify-center ${
                  selectedOption === "content-organization" ? "text-white" : "text-indigo-400"
                }`}>
                  <Brain className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-1">Creative Chaos</div>
                  <div className="text-xs md:text-sm text-primary-foreground/80">
                    &quot;My research and references are a scattered mess&quot;
                  </div>
                </div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
                selectedOption === "research-workflow" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
              }`}
              onClick={() => {
                setSelectedOption("research-workflow")
                handleNext("research-workflow")
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full bg-indigo-400/20 flex items-center justify-center ${
                  selectedOption === "research-workflow" ? "text-white" : "text-indigo-400"
                }`}>
                  <Search className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white mb-1">Research Takes Forever</div>
                  <div className="text-xs md:text-sm text-white/50">
                    &quot;I waste too much time searching for and organizing content&quot;
                  </div>
                </div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className={`h-auto py-4 md:py-6 justify-start text-left border-white/10 hover:bg-white/5 ${
                selectedOption === "idea-management" ? "bg-indigo-500 hover:bg-indigo-400 border-indigo-500" : ""
              }`}
              onClick={() => {
                setSelectedOption("idea-management")
                handleNext("idea-management")
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full bg-indigo-400/20 flex items-center justify-center ${
                  selectedOption === "idea-management" ? "text-white" : "text-indigo-400"
                }`}>
                  <Orbit className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white mb-1">Ideas Slip Away</div>
                  <div className="text-xs md:text-sm text-white/50">
                    &quot;Great ideas get lost in the chaos of my creative process&quot;
                  </div>
                </div>
              </div>
            </Button>
          </>
        )}
      </div>
    </div>
  )

  const ProblemStep: React.FC = () => {
    const problems = {
      "information-overload": {
        title: "Information Overload is Killing Your Productivity",
        description: "The average knowledge worker spends 2.5 hours per day searching for information. That's 25% of your workday lost to digital chaos.",
        stats: [
          { label: "Time spent searching", value: "2.5hrs", unit: "daily" },
          { label: "Open tabs", value: "50+", unit: "average" },
          { label: "Lost context", value: "76%", unit: "of time" }
        ]
      },
      "lost-information": {
        title: "Never Lose Important Information Again",
        description: "Bookmarks, notes, and saved links become a graveyard of lost knowledge. 80% of saved information is never accessed again.",
        stats: [
          { label: "Unused bookmarks", value: "80%", unit: "never accessed" },
          { label: "Search attempts", value: "15+", unit: "per day" },
          { label: "Time wasted", value: "5hrs", unit: "per week" }
        ]
      },
      "context-switching": {
        title: "Context Switching is Breaking Your Flow",
        description: "It takes 23 minutes to fully regain focus after a distraction. Constant context switching is fragmenting your productivity.",
        stats: [
          { label: "Refocus time", value: "23min", unit: "per switch" },
          { label: "Daily switches", value: "30+", unit: "average" },
          { label: "Focus lost", value: "40%", unit: "of time" }
        ]
      },
      "research-organization": {
        title: "Research Should Flow, Not Frustrate",
        description: "Students spend 40% of research time just organizing and finding sources. That's time better spent on actual learning.",
        stats: [
          { label: "Organization time", value: "40%", unit: "of research" },
          { label: "Lost sources", value: "35%", unit: "never found again" },
          { label: "Citation time", value: "4hrs", unit: "per paper" }
        ]
      },
      "citation-management": {
        title: "Citations Shouldn't Be a Chore",
        description: "Manual citation management is error-prone and time-consuming. 65% of students report it as their biggest research pain point.",
        stats: [
          { label: "Citation errors", value: "45%", unit: "of papers" },
          { label: "Time spent", value: "3hrs", unit: "per paper" },
          { label: "Manual work", value: "90%", unit: "of process" }
        ]
      },
      "study-efficiency": {
        title: "Study Smarter, Not Harder",
        description: "Inefficient study methods lead to 60% of information being forgotten within a week. Transform how you capture and retain knowledge.",
        stats: [
          { label: "Knowledge retained", value: "40%", unit: "after 1 week" },
          { label: "Study time", value: "65%", unit: "inefficient" },
          { label: "Notes unused", value: "70%", unit: "of total" }
        ]
      },
      "content-organization": {
        title: "Organize Content Like a Pro",
        description: "Content creators lose 30% of their creative time to disorganized research and references. Streamline your creative process.",
        stats: [
          { label: "Time lost", value: "30%", unit: "to organization" },
          { label: "Ideas lost", value: "50%", unit: "never captured" },
          { label: "Research reuse", value: "25%", unit: "efficiency" }
        ]
      },
      "research-workflow": {
        title: "Streamline Your Research Workflow",
        description: "Creators spend more time managing information than creating content. Transform your research into a seamless part of creation.",
        stats: [
          { label: "Research time", value: "40%", unit: "of process" },
          { label: "Content reuse", value: "20%", unit: "efficiency" },
          { label: "Ideas captured", value: "35%", unit: "of total" }
        ]
      },
      "idea-management": {
        title: "Never Lose Another Brilliant Idea",
        description: "The average creator loses 70% of their ideas due to poor capture and organization. Turn inspiration into structured content.",
        stats: [
          { label: "Ideas lost", value: "70%", unit: "not captured" },
          { label: "Implementation", value: "25%", unit: "of ideas" },
          { label: "Time to find", value: "45min", unit: "per reference" }
        ]
      }
    }

    const problem = problems[currentStepId as keyof typeof problems]

    return (
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-blue-300">
            {problem.title}
          </h2>
          <p className="text-base md:text-lg text-white/70">
            {problem.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 w-full max-w-2xl">
          {problem.stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-4 rounded-lg border border-white/10 bg-white/[0.03]">
              <div className="text-xl md:text-2xl font-bold text-indigo-400 mb-1">{stat.value}</div>
              <div className="text-xs text-white/50">
                {stat.label}
                <span className="block text-[10px] opacity-70">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          size={isMobile ? "default" : "lg"}
          className="mt-8 bg-indigo-500 hover:bg-indigo-400"
          onClick={() => handleNext("solution")}
        >
          See how Halo solves this →
        </Button>
      </div>
    )
  }

  const SolutionStep: React.FC = () => {
    const solutions = {
      "knowledge-worker": {
        title: "Your Digital World, Perfectly Organized",
        description: "Halo automatically organizes everything you browse into a structured second brain, with powerful note-taking and task management built in.",
        features: [
          { icon: Brain, title: "Smart Notes", description: "Capture thoughts and web content with AI-powered note organization" },
          { icon: Search, title: "Task Management", description: "Turn notes into actionable tasks and track progress effortlessly" },
          { icon: Orbit, title: "Knowledge Graph", description: "See how your notes, tasks, and research connect in your personal network" }
        ]
      },
      "student": {
        title: "Research Made Effortless",
        description: "Transform how you study with AI-powered note-taking, task planning, and knowledge synthesis.",
        features: [
          { icon: Brain, title: "Study Notes", description: "Take smart notes that automatically link to your research sources" },
          { icon: Search, title: "Assignment Tracker", description: "Convert research into structured tasks and assignment plans" },
          { icon: Orbit, title: "Study Maps", description: "Visualize connections between your notes, tasks, and learning materials" }
        ]
      },
      "creator": {
        title: "Create Without Limits",
        description: "Focus on creating while Halo handles your notes, tasks, and content organization.",
        features: [
          { icon: Brain, title: "Content Notes", description: "Capture ideas and research with AI-powered note organization" },
          { icon: Search, title: "Project Tasks", description: "Turn your content plans into actionable project timelines" },
          { icon: Orbit, title: "Idea Networks", description: "Connect your notes, tasks, and research in a visual knowledge map" }
        ]
      }
    }

    const solution = solutions[userType as keyof typeof solutions]

    return (
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-blue-300">
            {solution.title}
          </h2>
          <p className="text-base md:text-lg text-white/70">
            {solution.description}
          </p>
        </div>

        <div className="w-full max-w-2xl aspect-video rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden mb-12">
          <video 
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/Halo-Demo-Web.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl mb-12">
          {solution.features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-6 rounded-lg border border-white/10 bg-white/[0.03]">
              <feature.icon className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/50">{feature.description}</p>
            </div>
          ))}
        </div>

        <Button
          size={isMobile ? "default" : "lg"}
          className="bg-indigo-500 hover:bg-indigo-400"
          onClick={() => handleNext("social-proof")}
        >
          See early access benefits →
        </Button>
      </div>
    )
  }

  const SocialProofStep: React.FC = () => {
    return (
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-blue-300">
            Be Among the First to Experience Halo
          </h2>
          <p className="text-base md:text-lg text-white/70">
            Join our early access program and help shape the future of digital knowledge management
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl mb-12">
          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.03] text-center">
            <Brain className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Early Access</h3>
            <p className="text-sm text-white/70">
              Be first to try new features and shape the product roadmap
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.03] text-center">
            <Search className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Priority Support</h3>
            <p className="text-sm text-white/70">
              Direct access to our founding team for feedback and support
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/10 bg-white/[0.03] text-center">
            <Orbit className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Founding Member</h3>
            <p className="text-sm text-white/70">
              Special perks and pricing for early supporters
            </p>
          </div>
        </div>

        <Button
          size={isMobile ? "default" : "lg"}
          className="bg-indigo-500 hover:bg-indigo-400"
          onClick={() => handleNext("final-cta")}
        >
          Join early access →
        </Button>
      </div>
    )
  }

  const FinalStep: React.FC = () => {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setError("")

      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, price: "0" }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong")
        }

        setIsSubmitted(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    if (isSubmitted) {
      return (
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <div className="h-16 w-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6">
            <Brain className="h-8 w-8 text-indigo-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-blue-300">
              Thank you for joining!
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/50 mb-6 md:mb-8 text-center">
            We&apos;ll be in touch soon with your exclusive early access invitation.
          </p>
          <p className="text-base md:text-lg text-white/50 mb-6 md:mb-8 text-center">
            Follow <a href="https://x.com/DewrCommunity/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">@dewrcommunity</a> on Twitter to stay updated on our build journey.
          </p>

          <div className="grid grid-cols-3 gap-4 md:gap-8 w-full">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-indigo-400 mb-1 md:mb-2">10x</div>
              <p className="text-xs md:text-sm text-white/50">Faster Information Retrieval</p>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-indigo-400 mb-1 md:mb-2">∞</div>
              <p className="text-xs md:text-sm text-white/50">Digital Memory</p>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-indigo-400 mb-1 md:mb-2">1</div>
              <p className="text-xs md:text-sm text-white/50">Unified Workspace</p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center max-w-3xl mx-auto">
        <div className="h-16 w-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6">
          <Brain className="h-8 w-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-blue-300">
            Your Digital Universe Awaits
          </span>
        </h2>
        <p className="text-base md:text-lg text-white/50 mb-6 md:mb-8 text-center">
          Join the waitlist to be among the first to experience Halo when we launch.
        </p>

        <div className="w-full max-w-md mx-auto mb-6 md:mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 md:h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                required
              />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="h-10 md:h-12 inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-500 text-white hover:bg-indigo-400 px-6"
              >
                {isLoading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </div>
            <p className="text-xs text-white/30">
              By signing up, you agree to our{" "}
              <a href="#" className="underline text-indigo-400 hover:text-indigo-300">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline text-indigo-400 hover:text-indigo-300">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 w-full">
          <div className="text-center">
            <div className="text-xl md:text-3xl font-bold text-indigo-400 mb-1 md:mb-2">10x</div>
            <p className="text-xs md:text-sm text-white/50">Faster Information Retrieval</p>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-3xl font-bold text-indigo-400 mb-1 md:mb-2">∞</div>
            <p className="text-xs md:text-sm text-white/50">Digital Memory</p>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-3xl font-bold text-indigo-400 mb-1 md:mb-2">1</div>
            <p className="text-xs md:text-sm text-white/50">Unified Workspace</p>
          </div>
        </div>
      </div>
    )
  }

  const steps: Record<string, Step> = {
    welcome: {
      id: "welcome",
      title: "Welcome",
      component: <WelcomeStep />,
    },
    "what-brings-you": {
      id: "what-brings-you",
      title: "What brings you here",
      component: <WhatBringsYouStep />,
    },
    "information-overload": {
      id: "information-overload",
      title: "Problem",
      component: <ProblemStep />,
    },
    "lost-information": {
      id: "lost-information",
      title: "Problem",
      component: <ProblemStep />,
    },
    "context-switching": {
      id: "context-switching",
      title: "Problem",
      component: <ProblemStep />,
    },
    "research-organization": {
      id: "research-organization",
      title: "Problem",
      component: <ProblemStep />,
    },
    "citation-management": {
      id: "citation-management",
      title: "Problem",
      component: <ProblemStep />,
    },
    "study-efficiency": {
      id: "study-efficiency",
      title: "Problem",
      component: <ProblemStep />,
    },
    "content-organization": {
      id: "content-organization",
      title: "Problem",
      component: <ProblemStep />,
    },
    "research-workflow": {
      id: "research-workflow",
      title: "Problem",
      component: <ProblemStep />,
    },
    "idea-management": {
      id: "idea-management",
      title: "Problem",
      component: <ProblemStep />,
    },
    "solution": {
      id: "solution",
      title: "Solution",
      component: <SolutionStep />,
    },
    "social-proof": {
      id: "social-proof",
      title: "Social Proof",
      component: <SocialProofStep />,
    },
    "final-cta": {
      id: "final-cta",
      title: "Join Waitlist",
      component: <FinalStep />,
    }
  }

  const currentStep = steps[currentStepId]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        {/* Lamp effect */}
        <div className="absolute inset-x-0 bottom-0 z-50">
          <Lamp />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-14 md:h-16 items-center justify-between relative">
          <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
            <Circle className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" strokeWidth={2.5}/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-blue-300">
              Halo
            </span>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-white/70" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-6">
            <button
              onClick={handleReset}
              className="text-sm font-medium text-white/50 transition-colors hover:text-indigo-400"
            >
              Start over
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 px-6 bg-black">
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleReset}
                className="text-sm font-medium text-white/50 transition-colors hover:text-indigo-400 text-left"
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {path.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 md:h-8 md:w-8 p-0 text-indigo-400 hover:text-indigo-300 hover:bg-white/5"
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              )}
              <span className="text-xs md:text-sm font-medium text-white/70">{currentStep.title}</span>
            </div>
            <div className="text-xs md:text-sm text-white/30">
              Step {path.length + 1} of {path.length + (currentStepId === "final-cta" ? 1 : 2)}
            </div>
          </div>
          <Progress value={progress} className="h-1 bg-white/5" indicatorClassName="bg-indigo-500" />
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-12">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {currentStep.component}
          </div>
        </div>
      </main>
    </div>
  )
} 