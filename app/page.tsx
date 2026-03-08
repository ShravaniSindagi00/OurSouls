'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Users, TrendingUp, Brain, Calendar, MessageCircle } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">OurSouls</div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-balance leading-tight mb-6">
              Your Mental Wellness <span className="text-primary">Journey</span> Starts Here
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect with licensed therapists, track your mental health progress, and join a supportive community dedicated to your emotional wellbeing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="text-base">
                  Start Your Journey
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-base">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Everything You Need for Better Mental Health</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">Comprehensive tools to support your wellness journey</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Therapist Connection */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Licensed Therapists</h3>
              <p className="text-muted-foreground">Find and connect with qualified therapists who specialize in your areas of concern.</p>
            </Card>

            {/* Booking System */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Calendar className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">Schedule therapy sessions with availability tracking and automated video conferencing.</p>
            </Card>

            {/* Mood Tracking */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
              <p className="text-muted-foreground">Log your daily mood and energy levels to visualize your mental health progress.</p>
            </Card>

            {/* AI Insights */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Brain className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground">Get personalized session summaries and actionable wellness recommendations.</p>
            </Card>

            {/* Community */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-muted-foreground">Share experiences and support others in a safe, moderated community space.</p>
            </Card>

            {/* Crisis Support */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <MessageCircle className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Access our AI chatbot anytime for immediate emotional support and coping strategies.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Sign Up', desc: 'Create your account and tell us about your wellness goals' },
              { num: '2', title: 'Explore Therapists', desc: 'Browse and filter therapists by specialization' },
              { num: '3', title: 'Book a Session', desc: 'Schedule your first therapy session at your convenience' },
              { num: '4', title: 'Start Healing', desc: 'Begin your journey with professional support' },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="bg-white rounded-lg p-6 border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Real Stories from Our Community</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "OurSouls helped me find the right therapist and I've seen real progress in managing my anxiety.",
                author: "Sarah M.",
                role: "Patient"
              },
              {
                quote: "The booking system is so easy to use, and my clients appreciate the convenience of video sessions.",
                author: "Dr. James L.",
                role: "Therapist"
              },
              {
                quote: "Tracking my mood daily gives me insights I never had before. It's empowering to see my progress.",
                author: "Maria T.",
                role: "Patient"
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 border-l-4 border-l-primary">
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Mental Health?</h2>
          <p className="text-lg opacity-90 mb-8">Join thousands of people on their wellness journey</p>
          <Link href="/signup">
            <Button size="lg" variant="secondary">
              Get Started Free Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">OurSouls</h3>
              <p className="text-sm text-muted-foreground">Transforming mental health through technology and compassion.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Features</Link></li>
                <li><Link href="#" className="hover:text-primary">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">About</Link></li>
                <li><Link href="#" className="hover:text-primary">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary">Terms</Link></li>
                <li><Link href="#" className="hover:text-primary">HIPAA</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">© 2024 OurSouls. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
