<!-- "use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check, Code, Lightbulb, Menu, MousePointerClick, Rocket, X } from "lucide-react"
import { Footer } from "@/components/footer"
import { Progress } from "@/components/ui/progress"
import { useMediaQuery } from "@/hooks/use-media-query"

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

export default function Home() {
  const [currentStepId, setCurrentStepId] = useState<string>("welcome")
  const [path, setPath] = useState<string[]>([])
  const [userType, setUserType] = useState<string>("")
  const [progress, setProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const handleNext = (nextStepId: string, type?: string) => {
    setPath([...path, currentStepId])
    setCurrentStepId(nextStepId)
    if (type) setUserType(type)

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

  const WelcomeStep = (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <MousePointerClick className="h-6 w-6 text-tapfunnel-600" />
        <h1 className="text-3xl font-bold gradient-text">Tapfunnel</h1>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
        Stop scrolling.
        <br />
        <span className="gradient-text">Start converting.</span>
      </h2>
      <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12">
        Replace endless scrolling with interactive, tap-based journeys that learn from visitors and boost conversions.
      </p>
      <div className="grid gap-4 w-full max-w-md">
        <Button
          size={isMobile ? "default" : "lg"}
          className="h-auto py-4 md:py-6 justify-start text-left bg-tapfunnel-600 hover:bg-tapfunnel-700"
          onClick={() => handleNext("what-brings-you", "founder")}
        >
          <div className="flex items-center gap-3">
            <Rocket className="h-5 w-5" />
            <div>
              <div className="font-medium">I'm a founder or maker</div>
              <div className="text-xs md:text-sm text-primary-foreground/80">Looking to convert more visitors</div>
            </div>
          </div>
        </Button>

        <Button
          size={isMobile ? "default" : "lg"}
          variant="outline"
          className="h-auto py-4 md:py-6 justify-start text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
          onClick={() => handleNext("what-brings-you", "marketer")}
        >
          <div className="flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-tapfunnel-600" />
            <div>
              <div className="font-medium text-tapfunnel-800">I'm a marketer</div>
              <div className="text-xs md:text-sm text-muted-foreground">Seeking better landing page results</div>
            </div>
          </div>
        </Button>

        <Button
          size={isMobile ? "default" : "lg"}
          variant="outline"
          className="h-auto py-4 md:py-6 justify-start text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
          onClick={() => handleNext("what-brings-you", "developer")}
        >
          <div className="flex items-center gap-3">
            <Code className="h-5 w-5 text-tapfunnel-600" />
            <div>
              <div className="font-medium text-tapfunnel-800">I'm a developer</div>
              <div className="text-xs md:text-sm text-muted-foreground">Looking for technical details</div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  )

  const WhatBringsYouStep = (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">What brings you here today?</h2>
      <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12">
        {userType === "founder"
          ? "As a founder, what's your biggest challenge right now?"
          : userType === "marketer"
            ? "What marketing challenge are you trying to solve?"
            : "What development aspect interests you most?"}
      </p>
      <div className="grid gap-4 w-full max-w-md">
        {userType === "founder" ? (
          <>
            <Button
              size={isMobile ? "default" : "lg"}
              className="h-auto py-3 md:py-4 justify-start text-left bg-tapfunnel-600 hover:bg-tapfunnel-700"
              onClick={() => handleNext("conversion-problem")}
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-tapfunnel-500/20 flex items-center justify-center text-white">
                  1
                </div>
                <div>Low conversion rates on my landing page</div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="h-auto py-3 md:py-4 justify-start text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
              onClick={() => handleNext("understanding-visitors")}
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-tapfunnel-100 flex items-center justify-center text-tapfunnel-600">
                  2
                </div>
                <div className="text-tapfunnel-800">Don't understand what visitors want</div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="h-auto py-3 md:py-4 justify-start text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
              onClick={() => handleNext("development-time")}
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-tapfunnel-100 flex items-center justify-center text-tapfunnel-600">
                  3
                </div>
                <div className="text-tapfunnel-800">Too much time spent on landing pages</div>
              </div>
            </Button>
          </>
        ) : userType === "marketer" ? (
          <>
            <Button
              size={isMobile ? "default" : "lg"}
              className="h-auto py-3 md:py-4 justify-start text-left bg-tapfunnel-600 hover:bg-tapfunnel-700"
              onClick={() => handleNext("conversion-problem")}
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-tapfunnel-500/20 flex items-center justify-center text-white">
                  1
                </div>
                <div>Need higher conversion rates</div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="h-auto py-3 md:py-4 justify-start text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
              onClick={() => handleNext("understanding-visitors")}
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-tapfunnel-100 flex items-center justify-center text-tapfunnel-600">
                  2
                </div>
                <div className="text-tapfunnel-800">Better visitor segmentation</div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="h-auto py-3 md:py-4 justify-start text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
              onClick={() => handleNext("ab-testing")}
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-tapfunnel-100 flex items-center justify-center text-tapfunnel-600">
                  3
                </div>
                <div className="text-tapfunnel-800">Easier A/B testing</div>
              </div>
            </Button>
          </>
        ) : (
          <>
            <Button
              size={isMobile ? "default" : "lg"}
              className="h-auto py-3 md:py-4 justify-start text-left bg-tapfunnel-600 hover:bg-tapfunnel-700"
              onClick={() => handleNext("technical-details")}
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-tapfunnel-500/20 flex items-center justify-center text-white">
                  1
                </div>
                <div>Technical implementation details</div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="h-auto py-3 md:py-4 justify-start text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
              onClick={() => handleNext("integration")}
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-tapfunnel-100 flex items-center justify-center text-tapfunnel-600">
                  2
                </div>
                <div className="text-tapfunnel-800">Integration with existing sites</div>
              </div>
            </Button>

            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="h-auto py-3 md:py-4 justify-start text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
              onClick={() => handleNext("api-details")}
            >
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-tapfunnel-100 flex items-center justify-center text-tapfunnel-600">
                  3
                </div>
                <div className="text-tapfunnel-800">API and customization options</div>
              </div>
            </Button>
          </>
        )}
      </div>
    </div>
  )

  const ConversionProblemStep = (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      <div className="h-16 w-16 rounded-full bg-tapfunnel-100 flex items-center justify-center mb-6">
        <Check className="h-8 w-8 text-tapfunnel-600" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        <span className="gradient-text">Double your conversion rates</span>
      </h2>
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 text-center">
        Tapfunnel users see 2-3x higher conversion rates compared to traditional landing pages.
      </p>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-tapfunnel-800">How Tapfunnel helps:</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Interactive experience keeps visitors engaged longer</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Personalized content based on visitor responses</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Dynamic CTAs tailored to visitor intent</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Real-time optimization based on conversion data</span>
            </li>
          </ul>

          <div className="pt-4">
            <Button
              size={isMobile ? "default" : "lg"}
              className="gap-2 w-full sm:w-auto bg-tapfunnel-600 hover:bg-tapfunnel-700"
              onClick={() => handleNext("pricing-info")}
            >
              See pricing <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-tapfunnel-50 rounded-lg p-4 md:p-6 border border-tapfunnel-100">
          <div className="text-sm text-muted-foreground mb-2">From our customers:</div>
          <blockquote className="text-base md:text-lg italic mb-4">
            "We switched from a traditional landing page to Tapfunnel and saw our conversion rate jump from 2.1% to 5.8%
            in the first week."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-tapfunnel-200"></div>
            <div>
              <div className="font-medium text-tapfunnel-800">Sarah Johnson</div>
              <div className="text-sm text-muted-foreground">Founder, IndieMaker</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Button
          variant="outline"
          className="gap-2 border-tapfunnel-200 text-tapfunnel-700 hover:bg-tapfunnel-50 hover:text-tapfunnel-800 w-full sm:w-auto"
          onClick={() => handleNext("demo-experience")}
        >
          See it in action <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const UnderstandingVisitorsStep = (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      <div className="h-16 w-16 rounded-full bg-tapfunnel-100 flex items-center justify-center mb-6">
        <Check className="h-8 w-8 text-tapfunnel-600" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        <span className="gradient-text">Understand every visitor</span>
      </h2>
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 text-center">
        Learn what your visitors want without requiring them to fill out a form or leave their email.
      </p>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-tapfunnel-800">How Tapfunnel helps:</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Micro-questions reveal visitor intent and needs</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Path analysis shows which features interest visitors most</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Segment visitors based on their responses</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Optimize messaging based on real visitor data</span>
            </li>
          </ul>

          <div className="pt-4">
            <Button
              size={isMobile ? "default" : "lg"}
              className="gap-2 w-full sm:w-auto bg-tapfunnel-600 hover:bg-tapfunnel-700"
              onClick={() => handleNext("pricing-info")}
            >
              See pricing <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-tapfunnel-50 rounded-lg p-4 md:p-6 border border-tapfunnel-100">
          <div className="text-sm text-muted-foreground mb-2">From our customers:</div>
          <blockquote className="text-base md:text-lg italic mb-4">
            "For the first time, we understand exactly what our visitors are looking for, even without them filling out
            a form. It's like having a conversation with every visitor."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-tapfunnel-200"></div>
            <div>
              <div className="font-medium text-tapfunnel-800">Michael Chen</div>
              <div className="text-sm text-muted-foreground">CMO, StartupBoost</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Button
          variant="outline"
          className="gap-2 border-tapfunnel-200 text-tapfunnel-700 hover:bg-tapfunnel-50 hover:text-tapfunnel-800 w-full sm:w-auto"
          onClick={() => handleNext("demo-experience")}
        >
          See it in action <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const DevelopmentTimeStep = (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      <div className="h-16 w-16 rounded-full bg-tapfunnel-100 flex items-center justify-center mb-6">
        <Check className="h-8 w-8 text-tapfunnel-600" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        <span className="gradient-text">Launch in minutes, not days</span>
      </h2>
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 text-center">
        No coding required. Our visual builder lets you create and publish interactive experiences in minutes.
      </p>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-tapfunnel-800">How Tapfunnel helps:</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Visual builder with drag-and-drop interface</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Pre-built templates for common use cases</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>One-click publishing to your custom domain</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Export as React component for developer flexibility</span>
            </li>
          </ul>

          <div className="pt-4">
            <Button
              size={isMobile ? "default" : "lg"}
              className="gap-2 w-full sm:w-auto bg-tapfunnel-600 hover:bg-tapfunnel-700"
              onClick={() => handleNext("pricing-info")}
            >
              See pricing <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-tapfunnel-50 rounded-lg p-4 md:p-6 border border-tapfunnel-100">
          <div className="text-sm text-muted-foreground mb-2">From our customers:</div>
          <blockquote className="text-base md:text-lg italic mb-4">
            "I used to spend a week building landing pages. With Tapfunnel, I created and published a high-converting
            page in under an hour."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-tapfunnel-200"></div>
            <div>
              <div className="font-medium text-tapfunnel-800">Alex Rivera</div>
              <div className="text-sm text-muted-foreground">Indie Developer</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Button
          variant="outline"
          className="gap-2 border-tapfunnel-200 text-tapfunnel-700 hover:bg-tapfunnel-50 hover:text-tapfunnel-800 w-full sm:w-auto"
          onClick={() => handleNext("demo-experience")}
        >
          See it in action <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const TechnicalDetailsStep = (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      <div className="h-16 w-16 rounded-full bg-tapfunnel-100 flex items-center justify-center mb-6">
        <Code className="h-8 w-8 text-tapfunnel-600" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        <span className="gradient-text">Built for developers</span>
      </h2>
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 text-center">
        Flexible implementation options with React components and a robust API.
      </p>

      <div className="w-full bg-tapfunnel-950 rounded-lg p-4 md:p-6 mb-6 md:mb-8 overflow-hidden shadow-lg">
        <div className="text-sm font-medium mb-2 text-tapfunnel-300">React Component Export</div>
        <pre className="text-xs md:text-sm overflow-x-auto p-2 md:p-4 bg-black text-tapfunnel-300 rounded">
          {`// Example Tapfunnel React component
import { TapfunnelExperience } from '@tapfunnel/react';

export default function LandingPage() {
  return (
    <TapfunnelExperience
      steps={[
        {
          id: 'welcome',
          question: 'What brings you here?',
          options: [
            { text: 'Option 1', nextStep: 'step1' },
            { text: 'Option 2', nextStep: 'step2' },
          ]
        },
        // More steps...
      ]}
      onComplete={(path) => {
        console.log('User completed path:', path);
      }}
    />
  );
}`}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-tapfunnel-800">Technical Features:</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>React component library for custom integration</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>RESTful API for headless implementation</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Webhooks for real-time data integration</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Custom CSS and theming options</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-tapfunnel-800">Integration Options:</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Embed via JavaScript snippet</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Import as React/Next.js component</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>API-first approach for custom implementations</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-tapfunnel-600 mt-0.5" />
              <span>Zapier, Make, and n8n integrations</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-4">
        <Button
          className="gap-2 bg-tapfunnel-600 hover:bg-tapfunnel-700 w-full sm:w-auto"
          onClick={() => handleNext("pricing-info")}
        >
          See pricing <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-tapfunnel-200 text-tapfunnel-700 hover:bg-tapfunnel-50 hover:text-tapfunnel-800 w-full sm:w-auto"
          onClick={() => handleNext("demo-experience")}
        >
          Try the demo <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const DemoExperienceStep = (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        <span className="gradient-text">See Tapfunnel in action</span>
      </h2>
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 text-center">
        This is exactly how your visitors will experience your Tapfunnel landing page.
      </p>

      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-6 md:mb-8 border border-tapfunnel-100 purple-glow">
        <div className="p-4 md:p-6">
          <div className="mb-4 md:mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MousePointerClick className="h-5 w-5 text-tapfunnel-600" />
              <span className="font-medium text-tapfunnel-800">Tapfunnel Demo</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-center">What brings you here today?</h3>

            <div className="space-y-3 max-w-xs mx-auto w-full">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4 text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
                onClick={() => handleNext("pricing-info")}
              >
                <div className="flex items-center gap-3">
                  <Rocket className="h-4 w-4 text-tapfunnel-600" />
                  <span className="text-tapfunnel-800">Looking for a better landing page</span>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4 text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
                onClick={() => handleNext("pricing-info")}
              >
                <div className="flex items-center gap-3">
                  <Code className="h-4 w-4 text-tapfunnel-600" />
                  <span className="text-tapfunnel-800">Building a SaaS product</span>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4 text-left border-tapfunnel-200 hover:bg-tapfunnel-50 hover:text-tapfunnel-700"
                onClick={() => handleNext("pricing-info")}
              >
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-4 w-4 text-tapfunnel-600" />
                  <span className="text-tapfunnel-800">Just curious about Tapfunnel</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="mt-4 md:mt-6 text-center text-sm text-muted-foreground">
            <p>Tap to continue • 1 of 2 steps</p>
          </div>
        </div>
      </div>

      <div className="w-full text-center">
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          This is just a simple example. Your Tapfunnel can have multiple steps, conditional logic, and personalized
          content.
        </p>
        <Button
          className="gap-2 bg-tapfunnel-600 hover:bg-tapfunnel-700 w-full sm:w-auto"
          onClick={() => handleNext("pricing-info")}
        >
          See pricing <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  const PricingInfoStep = (
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        <span className="gradient-text">Simple pricing for indie makers</span>
      </h2>
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 text-center">
        Start free, upgrade when you're ready to scale.
      </p>

      <div className="grid gap-6 md:grid-cols-3 w-full mb-8 md:mb-12">
        <div className="bg-white rounded-xl border shadow-sm p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-tapfunnel-800">Starter</h3>
          <div className="text-2xl md:text-3xl font-bold mb-1 text-tapfunnel-900">Free</div>
          <p className="text-sm text-muted-foreground mb-4">Forever</p>

          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>1 active funnel</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Up to 100 visitors/month</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Basic analytics</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Tapfunnel branding</span>
            </li>
          </ul>

          <Button
            variant="outline"
            className="w-full border-tapfunnel-200 text-tapfunnel-700 hover:bg-tapfunnel-50 hover:text-tapfunnel-800"
            onClick={() => handleNext("final-cta")}
          >
            Get started
          </Button>
        </div>

        <div className="bg-white rounded-xl border-2 border-tapfunnel-500 shadow-md p-4 md:p-6 relative purple-glow">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-tapfunnel-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </div>
          <h3 className="text-lg md:text-xl font-bold mb-2 text-tapfunnel-800">Pro</h3>
          <div className="text-2xl md:text-3xl font-bold mb-1 text-tapfunnel-900">$29</div>
          <p className="text-sm text-muted-foreground mb-4">per month</p>

          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>5 active funnels</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Up to 1,000 visitors/month</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Advanced analytics</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Custom domain</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>React component export</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>No Tapfunnel branding</span>
            </li>
          </ul>

          <Button className="w-full bg-tapfunnel-600 hover:bg-tapfunnel-700" onClick={() => handleNext("final-cta")}>
            Get started
          </Button>
        </div>

        <div className="bg-white rounded-xl border shadow-sm p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-tapfunnel-800">Scale</h3>
          <div className="text-2xl md:text-3xl font-bold mb-1 text-tapfunnel-900">$79</div>
          <p className="text-sm text-muted-foreground mb-4">per month</p>

          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Unlimited funnels</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Up to 10,000 visitors/month</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Advanced analytics & A/B testing</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Custom domain</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>API access</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-tapfunnel-600" />
              <span>Priority support</span>
            </li>
          </ul>

          <Button
            variant="outline"
            className="w-full border-tapfunnel-200 text-tapfunnel-700 hover:bg-tapfunnel-50 hover:text-tapfunnel-800"
            onClick={() => handleNext("final-cta")}
          >
            Get started
          </Button>
        </div>
      </div>

      <div className="w-full text-center">
        <Button
          className="gap-2 bg-tapfunnel-600 hover:bg-tapfunnel-700 w-full sm:w-auto"
          onClick={() => handleNext("final-cta")}
        >
          Start free trial <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  // Optimized for mobile
  const FinalCTAStep = (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
      <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-tapfunnel-100 flex items-center justify-center mb-4 md:mb-6">
        <Check className="h-8 w-8 md:h-10 md:w-10 text-tapfunnel-600" />
      </div>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tighter sm:text-3xl md:text-5xl mb-3 md:mb-4">
        Ready to <span className="gradient-text">transform</span> your landing page?
      </h2>
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
        Join the growing community of founders who are converting more visitors with less scrolling.
      </p>

      <div className="w-full max-w-md mx-auto mb-6 md:mb-8">
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 md:h-12 w-full rounded-md border border-tapfunnel-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tapfunnel-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
            <button
              type="submit"
              className="h-10 md:h-12 inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-tapfunnel-600 text-white hover:bg-tapfunnel-700 px-6"
            >
              Get Started Free
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <a href="#" className="underline text-tapfunnel-600 hover:text-tapfunnel-700">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-tapfunnel-600 hover:text-tapfunnel-700">
              Privacy Policy
            </a>
            . No credit card required.
          </p>
        </form>
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8">
        <div className="flex -space-x-2">
          <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-tapfunnel-200 border-2 border-white"></div>
          <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-tapfunnel-300 border-2 border-white"></div>
          <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-tapfunnel-400 border-2 border-white"></div>
          <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-tapfunnel-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
            +
          </div>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground">Join 2,500+ founders already using Tapfunnel</p>
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-8 w-full">
        <div className="text-center">
          <div className="text-xl md:text-3xl font-bold text-tapfunnel-600 mb-1 md:mb-2">2-3x</div>
          <p className="text-xs md:text-sm text-muted-foreground">Higher conversion rates</p>
        </div>
        <div className="text-center">
          <div className="text-xl md:text-3xl font-bold text-tapfunnel-600 mb-1 md:mb-2">5 min</div>
          <p className="text-xs md:text-sm text-muted-foreground">Average setup time</p>
        </div>
        <div className="text-center">
          <div className="text-xl md:text-3xl font-bold text-tapfunnel-600 mb-1 md:mb-2">100%</div>
          <p className="text-xs md:text-sm text-muted-foreground">Satisfaction guarantee</p>
        </div>
      </div>
    </div>
  )

  const steps: Record<string, Step> = {
    welcome: {
      id: "welcome",
      title: "Welcome",
      component: WelcomeStep,
    },
    "what-brings-you": {
      id: "what-brings-you",
      title: "What brings you here",
      component: WhatBringsYouStep,
    },
    "conversion-problem": {
      id: "conversion-problem",
      title: "Conversion Solution",
      component: ConversionProblemStep,
    },
    "understanding-visitors": {
      id: "understanding-visitors",
      title: "Visitor Insights",
      component: UnderstandingVisitorsStep,
    },
    "development-time": {
      id: "development-time",
      title: "Quick Setup",
      component: DevelopmentTimeStep,
    },
    "technical-details": {
      id: "technical-details",
      title: "Technical Details",
      component: TechnicalDetailsStep,
    },
    "demo-experience": {
      id: "demo-experience",
      title: "Interactive Demo",
      component: DemoExperienceStep,
    },
    "pricing-info": {
      id: "pricing-info",
      title: "Pricing",
      component: PricingInfoStep,
    },
    "final-cta": {
      id: "final-cta",
      title: "Get Started",
      component: FinalCTAStep,
    },
  }

  const currentStep = steps[currentStepId]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 md:h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
            <MousePointerClick className="h-4 w-4 md:h-5 md:w-5 text-tapfunnel-600" />
            <span className="gradient-text">Tapfunnel</span>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-tapfunnel-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-6">
            <button
              onClick={handleReset}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-tapfunnel-700"
            >
              Start over
            </button>
          </nav>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-tapfunnel-200 text-tapfunnel-700 hover:bg-tapfunnel-50 hover:text-tapfunnel-800"
            >
              Log in
            </Button>
            <Button size="sm" className="bg-tapfunnel-600 hover:bg-tapfunnel-700">
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-3 px-6 bg-white">
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleReset}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-tapfunnel-700 text-left"
              >
                Start over
              </button>
              <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-tapfunnel-700 text-left">
                Log in
              </button>
              <Button size="sm" className="bg-tapfunnel-600 hover:bg-tapfunnel-700 w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">
        <div className="container py-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {path.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 md:h-8 md:w-8 p-0 text-tapfunnel-600 hover:text-tapfunnel-700 hover:bg-tapfunnel-50"
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              )}
              <span className="text-xs md:text-sm font-medium text-tapfunnel-800">{currentStep.title}</span>
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Step {path.length + 1} of {path.length + (currentStepId === "final-cta" ? 1 : 2)}
            </div>
          </div>
          <Progress value={progress} className="h-1 bg-tapfunnel-100" />
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-12">
          <div className="w-full">{currentStep.component}</div>
        </div>
      </main>

      <Footer />
    </div>
  )
} -->
