import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Rocket,
  Lock,
} from "lucide-react";

import Button from "../components/Button";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import slide1 from "../assets/slide 1.png";
import slide2 from "../assets/slide 2.png";
import slide3 from "../assets/slide 3.png";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleStartTest = () => {
    if (token) {
      navigate("/exam");
    } else {
      navigate("/login");
    }
  };

  const handleDivisionStart = (division) => {
    localStorage.setItem("selectedDivision", division);
    handleStartTest();
  };
  const heroSlides = useMemo(
    () => [
      {
        image: slide1,
        badge: "India's #1 Skill-Based Platform",
        title1: "Discover Your",
        highlight: "True Potential",
        title2: "Beyond Marks",
        desc:
          "AI-powered skill assessments that measure creativity, logic, leadership and real-world intelligence.",
      },
      {
        image: slide2,
        badge: "Trusted by 50,000+ Students",
        title1: "Rank Nationally",
        highlight: "Grow Faster",
        title2: "Win Smarter",
        desc:
          "Compete with students across India and unlock deep insights to improve every week.",
      },
      {
        image: slide3,
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

  const trustBadges = [Brain, Trophy, Star, Rocket];

  const divisionCards = [
    {
      title: "6-8",
      text: "Foundational skill checks for young learners building confidence early.",
    },
    {
      title: "9-10",
      text: "Competitive prep cards with sharper reasoning and exam discipline.",
    },
    {
      title: "11-12",
      text: "Higher secondary assessments for deeper aptitude and career direction.",
    },
    {
      title: "UG",
      text: "Undergraduate tests focused on employability, logic and problem solving.",
    },
    {
      title: "PG",
      text: "Postgraduate cards for advanced analysis, leadership and specialization.",
    },
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
    <main className="bg-white dark:bg-slate-950 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* HERO */}
      <section className="relative px-6 pt-8 pb-20 bg-linear-to-br from-orange-50 via-white to-orange-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <Carousel
            items={heroSlides.map((slide, i) => (
              <div
                key={i}
                className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center min-h-140 md:min-h-160 lg:min-h-175"
              >
                {/* Left */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ duration: 0.7 }}
                >
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-300 font-medium mb-6 transition-colors duration-300">
                    <Sparkles size={16} />
                    {slide.badge}
                  </div>

                  <h1 className="text-5xl md:text-7xl font-black leading-tight text-gray-900 dark:text-white transition-colors duration-300">
                    {slide.title1}
                    <br />
                    <span className="text-orange-500">{slide.highlight}</span>
                    <br />
                    {slide.title2}
                  </h1>

                  <p className="mt-7 text-xl text-gray-600 dark:text-slate-300 leading-9 max-w-xl transition-colors duration-300">
                    {slide.desc}
                  </p>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Button size="lg" onClick={handleStartTest}>
                      Start Free Test <ArrowRight size={18} />
                    </Button>

                    <Link
                      to="/#how-it-works"
                      className="inline-flex items-center justify-center rounded-full border border-orange-500 bg-white/80 dark:bg-slate-950/70 px-8 py-4 text-base font-semibold text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-300 shadow-sm"
                    >
                      <ChevronRight size={18} />
                      <span className="ml-2">How It Works</span>
                    </Link>
                  </div>

                  <div className="mt-10 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {trustBadges.map((Icon, index) => (
                        <div
                          key={index}
                          className="w-11 h-11 rounded-full border-2 border-white bg-orange-200 flex items-center justify-center text-white"
                        >
                          <Icon size={15} strokeWidth={2.5} />
                        </div>
                      ))}
                    </div>

                    <p className="text-gray-600 dark:text-slate-300 transition-colors duration-300">
                      Trusted by <b>50,000+</b> students
                    </p>
                  </div>
                </motion.div>

                {/* Right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full mb-2 lg:mb-0"
                >
                  <div className="relative w-full h-55 sm:h-75 md:h-105 lg:h-140 overflow-hidden rounded-3xl lg:rounded-4xl transition-colors duration-300">
                    <img
                      src={slide.image}
                      alt={slide.title1}
                      className="w-full h-full object-contain bg-white/40 dark:bg-slate-900/40"
                    />

                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute top-3 sm:top-6 left-2 sm:left-3 z-20 glass-panel px-3 sm:px-5 py-2 sm:py-4 rounded-2xl border border-gray-100/80 dark:border-slate-700/80"
                    >
                      <p className="text-gray-500 dark:text-slate-400 text-xs sm:text-sm">Your Rank</p>
                      <p className="font-bold text-sm sm:text-xl text-gray-900 dark:text-white">#12 National</p>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 12, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute bottom-3 sm:bottom-8 right-2 sm:right-3 z-20 glass-panel px-3 sm:px-5 py-2 sm:py-4 rounded-2xl border border-gray-100/80 dark:border-slate-700/80"
                    >
                      <p className="text-gray-500 dark:text-slate-400 text-xs sm:text-sm">Skill Score</p>
                      <p className="font-bold text-sm sm:text-xl text-gray-900 dark:text-white">87 / 100</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          />
        </div>
      </section>

      {/* ABOUT / FEATURES */}
      <section id="about" className="px-6 -mt-10 relative z-10 py-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-5">
          {[
            ["50K+", "Students Assessed"],
            ["120+", "Schools Partnered"],
            ["98%", "Satisfaction Rate"],
            ["15+", "Skill Categories"],
          ].map((item, i) => (
            <Card key={i} className="text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-3xl font-black text-orange-500">
                {item[0]}
              </h3>
              <p className="text-gray-600 dark:text-slate-300 mt-2 transition-colors duration-300">{item[1]}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* DIVISIONS */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-300 transition-colors duration-300">
                Division Wise Exams
              </span>
              <h2 className="mt-5 text-4xl font-black text-gray-900 dark:text-white transition-colors duration-300">
                Choose the right exam card
              </h2>
            </div>

            <Button variant="secondary" className="sm:self-end" onClick={handleStartTest}>
              View Exam Flow <ArrowRight size={16} />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-5 items-stretch">
            {divisionCards.map((item, i) => (
              <motion.div key={item.title} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                <Card className="h-full min-h-85 p-8 sm:p-9 border border-orange-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-orange-500 font-bold">Exam Card</p>
                      <h3 className="mt-4 text-4xl font-black text-gray-900 dark:text-white">{item.title}</h3>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center font-black text-lg">
                      {i + 1}
                    </div>
                  </div>

                  <p className="mt-6 flex-1 text-base leading-8 text-gray-600 dark:text-slate-300 transition-colors duration-300">
                    {item.text}
                  </p>

                  <Button
                    size="lg"
                    className="mt-8 w-full"
                    onClick={() => handleDivisionStart(item.title)}
                  >
                    Start This Test
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section id="features" className="py-10 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-300 transition-colors duration-300">
            Our Platform
          </span>

          <h2 className="text-5xl font-black mt-6 text-gray-900 dark:text-white transition-colors duration-300">
            Everything you need to excel
          </h2>

          <p className="mt-5 text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto transition-colors duration-300">
            Comprehensive tools designed to evaluate, rank and guide students
            based on real skills.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 mt-14">
            {platform.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full text-left hover:shadow-xl transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
                      <Icon size={28} />
                    </div>

                    <h3 className="text-2xl font-bold mt-6 text-gray-900 dark:text-white transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600 dark:text-slate-300 mt-4 leading-8 transition-colors duration-300">
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
      <section className="py-10 px-6 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-300 transition-colors duration-300">
            Why Choose Us
          </span>

          <h2 className="text-5xl font-black mt-6 text-gray-900 dark:text-white transition-colors duration-300">
            Built for the future of education
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-14">
            {whyChoose.map((item, i) => (
              <Card key={i} hover>
                <Star className="text-orange-500" />
                <h3 className="text-2xl font-bold mt-5 text-gray-900 dark:text-white transition-colors duration-300">{item}</h3>
                <p className="text-gray-600 dark:text-slate-300 mt-3 transition-colors duration-300">
                  Modern learning tools built to help every student grow faster.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM LOCKED */}
      <section id="pricing" className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-300 transition-colors duration-300">
                Premium Preview
              </span>
              <h2 className="text-4xl font-black mt-5 text-gray-900 dark:text-white transition-colors duration-300">
                Locked insights for premium users
              </h2>
            </div>
            <Button className="hidden md:inline-flex items-center gap-2">
              <Lock size={16} />
              Unlock Premium
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              ["Career Blueprint", "Detailed roadmap to your ideal career path."],
              ["Scholarship Match", "Find opportunities based on your strength profile."],
              ["Deep Analytics", "See hidden patterns in your performance data."],
            ].map(([title, desc], i) => (
              <Card key={i} className="relative overflow-hidden">
                <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg">
                      <Lock size={20} />
                    </div>
                    <p className="mt-3 font-bold text-gray-900 dark:text-white">Locked</p>
                  </div>
                </div>

                <div className="opacity-30 select-none">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
                  <p className="mt-3 text-gray-600 dark:text-slate-300 leading-7">{desc}</p>
                  <div className="mt-6 h-32 rounded-2xl bg-linear-to-br from-orange-100 to-orange-50 dark:from-slate-800 dark:to-slate-700" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how-it-works" className="py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-300 transition-colors duration-300">
            How It Works
          </span>

          <h2 className="text-5xl font-black mt-6 text-gray-900 dark:text-white transition-colors duration-300">
            Three simple steps to your rank
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              ["Take the Assessment", BookOpen],
              ["Get Your Analysis", Brain],
              ["Claim Your Rank", Trophy],
            ].map(([title, Icon], i) => (
              <Card key={i} hover>
                <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center mx-auto">
                  <Icon size={30} />
                </div>
                <h3 className="text-2xl font-bold mt-6 text-gray-900 dark:text-white transition-colors duration-300">{title}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 px-6 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <span className="px-5 py-2 rounded-full bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-300 transition-colors duration-300">
            Testimonials
          </span>

          <h2 className="text-5xl font-black mt-6 text-gray-900 dark:text-white transition-colors duration-300">
            What students are saying
          </h2>

          <div className="grid md:grid-cols-3 gap-7 mt-14">
            {testimonials.map((item, i) => (
              <Card key={i} hover>
                <div className="text-orange-400">★★★★★</div>
                <p className="text-gray-700 dark:text-slate-300 mt-5 leading-8 transition-colors duration-300">{item.text}</p>
                <h4 className="font-bold mt-6 text-gray-900 dark:text-white transition-colors duration-300">{item.name}</h4>
                <p className="text-gray-500 dark:text-slate-400 text-sm transition-colors duration-300">{item.city}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-slate-300 transition-colors duration-300">
            Powered by modern technology
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {["React", "Node.js", "MongoDB", "Razorpay"].map((item, i) => (
              <Card key={i} className="text-center py-8 hover:shadow-lg transition-all duration-300">
                <Rocket className="mx-auto text-orange-500" />
                <p className="mt-4 font-semibold text-gray-900 dark:text-white transition-colors duration-300">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto rounded-4xl bg-linear-to-r from-orange-500 to-orange-400 text-white text-center py-20 px-6 shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
          <h2 className="text-5xl font-black">
            Ready to discover your true potential?
          </h2>

          <p className="mt-5 text-xl opacity-90">
            Join thousands of students already ranking beyond marks.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link to="/register">
              <Button size="lg" className="bg-white text-orange-500 border-white hover:bg-orange-50">
                Start Free Test
              </Button>
            </Link>
            <Link
              to="/#about"
              className="inline-flex items-center justify-center rounded-full border border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}