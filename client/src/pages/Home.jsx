import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Brain,
  Trophy,
  Sparkles,
  Target,
  BookOpen,
  Star,
  ArrowRight,
  BarChart3,
  Rocket,
  Medal,
} from "lucide-react";

import Button from "../components/Button";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const heroSlides = useMemo(
    () => [
      {
        badge: "India's #1 Skill-Based Platform",
        title1: "Discover Your",
        highlight: "True Potential",
        title2: "Beyond Marks",
        desc:
          "AI-powered skill assessments that measure creativity, logic, leadership and real-world intelligence.",
      },
      {
        badge: "Trusted by 50,000+ Students",
        title1: "Rank Nationally",
        highlight: "Grow Faster",
        title2: "Win Smarter",
        desc:
          "Compete with students across India and unlock deep insights to improve every week.",
      },
      {
        badge: "Career Guidance Engine",
        title1: "Choose Careers",
        highlight: "With Confidence",
        title2: "Using AI Reports",
        desc:
          "Get career recommendations based on your strengths, aptitude and future opportunities.",
      },
    ],
    []
  );

  const platform = [
    {
      icon: Brain,
      title: "Skill Analysis",
      desc: "Deep dive into cognitive and analytical abilities with our proprietary framework.",
    },
    {
      icon: Trophy,
      title: "Ranking System",
      desc: "Get ranked nationally based on real skills, not rote memorization.",
    },
    {
      icon: Sparkles,
      title: "AI Insights",
      desc: "Smart personalized insights to identify strengths and growth areas.",
    },
    {
      icon: Target,
      title: "Career Guidance",
      desc: "Career paths aligned with your natural abilities and goals.",
    },
  ];

  const whyChoose = [
    "Beyond Marks",
    "National Rankings",
    "AI-Powered Reports",
    "Career Mapping",
    "Progress Tracking",
    "Gamified Learning",
  ];

  const testimonials = [
    {
      name: "Priya Patel",
      city: "DPS, New Delhi",
      text:
        "First Rank India showed me strengths I never knew I had. My confidence has grown immensely!",
    },
    {
      name: "Rahul Verma",
      city: "St. Xavier's, Mumbai",
      text:
        "The skill analysis is incredibly detailed. It helped me choose the right career path.",
    },
    {
      name: "Ananya Singh",
      city: "Kendriya Vidyalaya, Bangalore",
      text:
        "Finally a platform that values skills over marks. The AI insights are game-changing.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative px-6 pt-8 pb-20 bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="max-w-7xl mx-auto">
          <Carousel
            items={heroSlides.map((slide, i) => (
              <div
                key={i}
                className="grid lg:grid-cols-2 gap-14 items-center min-h-[700px]"
              >
                {/* Left */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ duration: 0.7 }}
                >
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-medium mb-6">
                    <Sparkles size={16} />
                    {slide.badge}
                  </div>

                  <h1 className="text-5xl md:text-7xl font-black leading-tight text-gray-900">
                    {slide.title1}
                    <br />
                    <span className="text-orange-500">{slide.highlight}</span>
                    <br />
                    {slide.title2}
                  </h1>

                  <p className="mt-7 text-xl text-gray-600 leading-9 max-w-xl">
                    {slide.desc}
                  </p>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link to="/exam">
                      <Button size="lg">
                        Start Test <ArrowRight size={18} />
                      </Button>
                    </Link>

                    <Link to="/leaderboard">
                      <Button variant="secondary" size="lg">
                        <Trophy size={18} />
                        View Rankings
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-10 flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((x) => (
                        <div
                          key={x}
                          className="w-11 h-11 rounded-full border-2 border-white bg-orange-200"
                        />
                      ))}
                    </div>

                    <p className="text-gray-600">
                      Trusted by <b>50,000+</b> students
                    </p>
                  </div>
                </motion.div>

                {/* Right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="bg-white rounded-[2rem] shadow-2xl p-8 border border-orange-100">
                    <div className="h-[520px] rounded-[2rem] bg-gradient-to-br from-orange-50 to-white flex items-center justify-center relative overflow-hidden">
                      <img
                        src="/hero.png"
                        alt="hero"
                        className="w-full h-full object-cover opacity-95"
                      />

                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute top-10 left-0 bg-white shadow-xl px-5 py-4 rounded-2xl"
                      >
                        <p className="text-gray-500 text-sm">Your Rank</p>
                        <p className="font-bold text-xl">#12 National</p>
                      </motion.div>

                      <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute bottom-12 right-0 bg-white shadow-xl px-5 py-4 rounded-2xl"
                      >
                        <p className="text-gray-500 text-sm">Skill Score</p>
                        <p className="font-bold text-xl">87 / 100</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          />
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-5">
          {[
            ["50K+", "Students Assessed"],
            ["120+", "Schools Partnered"],
            ["98%", "Satisfaction Rate"],
            ["15+", "Skill Categories"],
          ].map((item, i) => (
            <Card key={i} className="text-center">
              <h3 className="text-3xl font-black text-orange-500">
                {item[0]}
              </h3>
              <p className="text-gray-600 mt-2">{item[1]}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* PLATFORM */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500">
            Our Platform
          </span>

          <h2 className="text-5xl font-black mt-6">
            Everything you need to excel
          </h2>

          <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools designed to evaluate, rank and guide students
            based on real skills.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mt-14">
            {platform.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full text-left">
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
                      <Icon size={28} />
                    </div>

                    <h3 className="text-2xl font-bold mt-6">{item.title}</h3>
                    <p className="text-gray-600 mt-4 leading-8">
                      {item.desc}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500">
            Why Choose Us
          </span>

          <h2 className="text-5xl font-black mt-6">
            Built for the future of education
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
            {whyChoose.map((item, i) => (
              <Card key={i}>
                <Star className="text-orange-500" />
                <h3 className="text-2xl font-bold mt-5">{item}</h3>
                <p className="text-gray-600 mt-3">
                  Modern learning tools built to help every student grow faster.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500">
            How It Works
          </span>

          <h2 className="text-5xl font-black mt-6">
            Three simple steps to your rank
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              ["Take the Assessment", BookOpen],
              ["Get Your Analysis", Brain],
              ["Claim Your Rank", Trophy],
            ].map(([title, Icon], i) => (
              <Card key={i}>
                <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center mx-auto">
                  <Icon size={30} />
                </div>
                <h3 className="text-2xl font-bold mt-6">{title}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500">
            Testimonials
          </span>

          <h2 className="text-5xl font-black mt-6">
            What students are saying
          </h2>

          <div className="grid md:grid-cols-3 gap-7 mt-14">
            {testimonials.map((item, i) => (
              <Card key={i}>
                <div className="text-orange-400">★★★★★</div>
                <p className="text-gray-700 mt-5 leading-8">{item.text}</p>
                <h4 className="font-bold mt-6">{item.name}</h4>
                <p className="text-gray-500 text-sm">{item.city}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-700">
            Powered by modern technology
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {["React", "Node.js", "MongoDB", "Razorpay"].map((item, i) => (
              <Card key={i} className="text-center py-8">
                <Rocket className="mx-auto text-orange-500" />
                <p className="mt-4 font-semibold">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-r from-orange-500 to-orange-400 text-white text-center py-20 px-6 shadow-2xl">
          <h2 className="text-5xl font-black">
            Ready to discover your true potential?
          </h2>

          <p className="mt-5 text-xl opacity-90">
            Join thousands of students already ranking beyond marks.
          </p>

          <div className="mt-10">
            <Link to="/register">
              <Button size="lg" className="bg-white text-orange-500">
                Start Free Test
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}