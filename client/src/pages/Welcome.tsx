import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sun,
  Moon,
  Search,
  MapPin,
  Calendar,
  Menu,
  Mail,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const textAndImage = [
  {
    id: 1,
    text: "Discover Ethiopian Hotels",
    imageUrl: "/assets/Hotel.jpg",
    icon: "🏨",
    desc: "Luxurious stays in vibrant cities and serene landscapes",
  },
  {
    id: 2,
    text: "Savor Top-Rated Dining",
    imageUrl: "/assets/jupitor.jpg",
    icon: "🍴",
    desc: "Authentic Ethiopian cuisine and global flavors",
  },
  {
    id: 3,
    text: "Exciting Tours & Activities",
    imageUrl: "/assets/sheraton.jpg",
    icon: "🗺️",
    desc: "Explore cultural landmarks and thrilling adventures",
  },
  {
    id: 4,
    text: "Premium Hotel Experiences",
    imageUrl: "/assets/skylight.jpg",
    icon: "⭐",
    desc: "Top-rated hotels with world-class amenities",
  },
  {
    id: 5,
    text: "Book Your Dream Stay",
    imageUrl: "/assets/base.jpg",
    icon: "📅",
    desc: "Hassle-free booking for your perfect vacation",
  },
];

const featuredDestinations = [
  {
    id: 1,
    name: "Addis Ababa",
    image: "/assets/addis.jpg",
    desc: "Vibrant capital with rich culture",
  },
  {
    id: 2,
    name: "Lalibela",
    image: "/assets/lalibela.jpg",
    desc: "Ancient rock-hewn churches",
  },
  {
    id: 3,
    name: "Gondar",
    image: "/assets/gondar.jpg",
    desc: "Historic castles and royal heritage",
  },
];

function WelcomePage() {
  const container = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Sync theme
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme as "light" | "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useGSAP(() => {
    if (!container.current || !headerRef.current) return;

    // Hero Title Animation (Fade and Slide)
    const tl = gsap.timeline();
    tl.fromTo(
      headerRef.current.querySelectorAll("h1 span"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "power3.out",
      }
    )
      .fromTo(
        headerRef.current.querySelector(".book-now-btn"),
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
        "-=0.8"
      )
      .fromTo(
        headerRef.current.querySelector(".search-bar"),
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      );

    // Background Particle Animation
    gsap.to(".bg-particle", {
      y: "-=200",
      opacity: 0.3,
      duration: 10,
      repeat: -1,
      ease: "none",
      stagger: {
        each: 0.2,
        from: "random",
      },
    });

    // Parallax Items Animation
    const items = container.current.querySelectorAll(".parallax-item");
    items.forEach((item, index) => {
      const card = item.querySelector(".parallax-card");
      const icon = item.querySelector(".parallax-icon");

      // Parallax Background
      gsap.to(item, {
        backgroundPositionY: "120%",
        ease: "none",
        scrollTrigger: {
          trigger: item,
          scroller: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Card Animation
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            scroller: container.current,
            start: "top 85%",
            end: "center 35%",
            scrub: 0.5,
          },
        }
      );

      // Icon Animation
      gsap.fromTo(
        icon,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: item,
            scroller: container.current,
            start: "top 85%",
            end: "center 35%",
            scrub: 0.5,
          },
        }
      );

      // Hover Effect
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(card, {
          rotateX: y / 30,
          rotateY: -x / 30,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      // Particle Animation
      ScrollTrigger.create({
        trigger: item,
        scroller: container.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const shapes = ["circle", "square", "triangle"];
          for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.className = `particle particle-${shapes[i % 3]}`;
            item.appendChild(particle);
            gsap.to(particle, {
              x: gsap.utils.random(-100, 100),
              y: gsap.utils.random(-100, 100),
              rotation: gsap.utils.random(0, 360),
              opacity: 0,
              scale: gsap.utils.random(0.4, 0.9),
              duration: 1.5,
              ease: "power2.out",
              onComplete: () => particle.remove(),
            });
          }
        },
      });
    });

    // Navigation Dots Animation
    const dots = container.current.querySelectorAll(".nav-dot");
    dots.forEach((dot, index) => {
      ScrollTrigger.create({
        trigger: items[index],
        scroller: container.current,
        start: "top center",
        end: "bottom center",
        onEnter: () =>
          gsap.to(dot, {
            scale: 1.6,
            backgroundColor: theme === "light" ? "#059669" : "#f59e0b",
            duration: 0.3,
          }),
        onLeave: () =>
          gsap.to(dot, {
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            duration: 0.3,
          }),
        onEnterBack: () =>
          gsap.to(dot, {
            scale: 1.6,
            backgroundColor: theme === "light" ? "#059669" : "#f59e0b",
            duration: 0.3,
          }),
        onLeaveBack: () =>
          gsap.to(dot, {
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            duration: 0.3,
          }),
      });

      dot.addEventListener("click", () => {
        const target = items[index];
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });

    // Featured Destinations Animation
    const tabs = container.current.querySelectorAll(".destination-tab");
    tabs.forEach((tab, index) => {
      gsap.fromTo(
        tab,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tab,
            scroller: container.current,
            start: "top 90%",
            end: "center 50%",
            scrub: 0.5,
          },
        }
      );
    });
  }, [theme]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate newsletter subscription
    alert("Subscribed to newsletter!");
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

          /* Hide scrollbars */
          .scroll-container {
            scrollbar-width: none;
            -ms-overflow-style: none;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            width: 100%;
            max-width: 100%;
            height: 100vh;
            position: relative;
            z-index: 2;
          }
          .scroll-container::-webkit-scrollbar {
            display: none;
          }

          /* Background */
          .bg-gradient {
            min-height: 100vh;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0;
            margin: 0;
            will-change: background;
          }
          .bg-particle {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: ${theme === "light" ? "#059669" : "#f59e0b"};
            opacity: 0.5;
            border-radius: 50%;
            pointer-events: none;
          }

          /* Particle */
          .particle {
            position: absolute;
            width: 12px;
            height: 12px;
            background-color: ${theme === "light" ? "#059669" : "#f59e0b"};
            opacity: 0.9;
            pointer-events: none;
          }
          .particle-circle {
            border-radius: 50%;
          }
          .particle-square {
            border-radius: 0;
          }
          .particle-triangle {
            width: 0;
            height: 0;
            background: none;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 12px solid ${
              theme === "light" ? "#059669" : "#f59e0b"
            };
          }

          /* Sticky Nav */
          .sticky-nav {
            position: sticky;
            top: 0;
            z-index: 20;
            background: ${
              theme === "light"
                ? "rgba(255, 255, 255, 0.98)"
                : "rgba(31, 41, 55, 0.98)"
            };
            padding: 1rem;
          }

          /* Hero Section */
          .header-section {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 2rem;
            padding: 2rem;
            position: relative;
            z-index: 5;
            background: url('/assets/hero-bg.jpg');
            background-size: cover;
            background-position: center;
          }
          .header-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
            z-index: 1;
          }
          .header-section > * {
            position: relative;
            z-index: 2;
          }
          .header-section h1 {
            font-family: 'Montserrat', sans-serif;
            font-size: 5rem;
            font-weight: 700;
            color: ${theme === "light" ? "#059669" : "#f59e0b"};
            letter-spacing: 0.5px;
            line-height: 1.2;
          }

          /* Search Bar */
          .search-bar {
            display: flex;
            gap: 1rem;
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
          }

          /* Parallax Item */
          .parallax-item {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4rem;
            padding: 2.5rem;
            background-size: cover;
            background-position: center 0%;
            position: relative;
            overflow: hidden;
            border-radius: 28px;
            margin: 2.5rem 0;
            transform-style: preserve-3d;
            perspective: 1500px;
          }

          /* Card Styling */
          .parallax-card {
            background: ${
              theme === "light"
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(31, 41, 55, 0.3)"
            };
            border: 1px solid ${
              theme === "light"
                ? "rgba(6, 95, 70, 0.4)"
                : "rgba(245, 158, 11, 0.4)"
            };
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
            will-change: transform;
          }
          .parallax-card:hover {
            background: ${
              theme === "light"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(31, 41, 55, 0.4)"
            };
            border-color: ${theme === "light" ? "#059669" : "#f59e0b"};
            transform: translateY(-10px);
          }
          .parallax-icon {
            font-size: 4.5rem;
            color: #ffffff;
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .parallax-item:hover .parallax-icon {
            transform: scale(1.4);
            color: ${theme === "light" ? "#059669" : "#f59e0b"};
          }

          /* Book Now Button */
          .book-now-btn {
            padding: 1.4rem 4rem;
            font-size: 1.8rem;
            font-family: 'Montserrat', sans-serif;
            color: #ffffff;
            background: ${theme === "light" ? "#059669" : "#f59e0b"};
            border-radius: 50px;
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
          }
          .book-now-btn:hover {
            background: ${theme === "light" ? "#047857" : "#d97706"};
            transform: scale(1.1);
          }

          /* Dot Navigation */
          .nav-dots {
            position: fixed;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            z-index: 10;
          }
          .nav-dot {
            width: 16px;
            height: 16px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          /* Footer */
          .footer-section {
            padding: 3rem 1rem;
            text-align: center;
            background: ${theme === "light" ? "#f7fafc" : "#1a202c"};
            color: ${theme === "light" ? "#2d3748" : "#e2e8f0"};
          }
          .social-links a {
            margin: 0 1rem;
            color: ${theme === "light" ? "#059669" : "#f59e0b"};
            transition: transform 0.3s ease;
          }
          .social-links a:hover {
            transform: scale(1.2);
          }
          .newsletter-form {
            max-width: 500px;
            margin: 2rem auto;
            display: flex;
            gap: 1rem;
          }

          /* Responsive Adjustments */
          @media (max-width: 1024px) {
            .header-section h1 {
              font-size: 3.8rem;
            }
            .parallax-item {
              flex-direction: column;
              min-height: 70vh;
              padding: 2rem;
            }
            .parallax-card {
              padding: 1.5rem;
            }
            .book-now-btn {
              padding: 1.2rem 3rem;
              font-size: 1.6rem;
            }
            .parallax-icon {
              font-size: 4rem;
            }
            .search-bar {
              flex-direction: column;
              gap: 0.5rem;
            }
          }
          @media (max-width: 768px) {
            .header-section h1 {
              font-size: 2.8rem;
            }
            .parallax-item {
              min-height: 60vh;
              padding: 1.5rem;
            }
            .parallax-card {
              padding: 1.2rem;
            }
            .parallax-icon {
              font-size: 3.5rem;
            }
            .book-now-btn {
              padding: 1rem 2.5rem;
              font-size: 1.4rem;
            }
            .nav-dots {
              right: 1rem;
              gap: 1rem;
            }
            .nav-dot {
              width: 12px;
              height: 12px;
            }
            .newsletter-form {
              flex-direction: column;
            }
          }
          @media (max-width: 480px) {
            .header-section h1 {
              font-size: 2rem;
            }
            .parallax-card {
              padding: 1rem;
            }
            .parallax-icon {
              font-size: 3rem;
            }
            .book-now-btn {
              padding: 0.8rem 2rem;
              font-size: 1.2rem;
            }
            .nav-dots {
              right: 0.8rem;
              gap: 0.8rem;
            }
            .nav-dot {
              width: 10px;
              height: 10px;
            }
            .search-bar {
              padding: 0 1rem;
            }
          }
        `}
      </style>
      <div
        className={cn(
          "bg-gradient min-h-screen flex flex-col items-center gap-10 relative",
          theme === "light"
            ? "bg-gradient-to-b from-green-50 to-teal-100"
            : "bg-gradient-to-b from-gray-900 to-gray-700 dark:bg-gray-900"
        )}
      >
        {/* Background Particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bg-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 5}px`,
              height: `${Math.random() * 8 + 5}px`,
            }}
          />
        ))}

        {/* Sticky Navigation */}
        <div
          className={cn(
            "sticky-nav w-full flex items-center justify-between px-6 py-3",
            theme === "light"
              ? "bg-white/98"
              : "bg-gray-800/98 dark:bg-gray-800/98"
          )}
        >
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/assets/logo.png" alt="Book Ethiopia Logo" />
              <AvatarFallback>BE</AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "font-bold text-xl",
                theme === "light"
                  ? "text-emerald-900"
                  : "text-gray-100 dark:text-gray-100"
              )}
            >
              Book Ethiopia
            </span>
          </div>
          <div className="hidden md:flex gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/home")}
              className={cn(
                theme === "light"
                  ? "text-emerald-900 hover:bg-emerald-100"
                  : "text-gray-100 hover:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-700"
              )}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/profile")}
              className={cn(
                theme === "light"
                  ? "text-emerald-900 hover:bg-emerald-100"
                  : "text-gray-100 hover:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-700"
              )}
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/auth")}
              className={cn(
                theme === "light"
                  ? "text-emerald-900 hover:bg-emerald-100"
                  : "text-gray-100 hover:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-700"
              )}
            >
              Login
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden",
                  theme === "light"
                    ? "text-emerald-900 hover:bg-emerald-100"
                    : "text-gray-100 hover:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={cn(
                theme === "light"
                  ? "bg-white border-emerald-200"
                  : "bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-600"
              )}
            >
              <DropdownMenuItem onClick={() => navigate("/home")}>
                Home
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/auth")}>
                Login
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Theme Toggle Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={cn(
                  "fixed top-4 right-4 z-50 rounded-full w-12 h-12",
                  theme === "light"
                    ? "hover:bg-green-100 text-emerald-900"
                    : "hover:bg-gray-800 text-gray-100 dark:hover:bg-gray-700 dark:text-gray-100"
                )}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle {theme === "light" ? "Dark" : "Light"} Mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Quick Book Floating Action Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    className={cn(
                      "fixed bottom-8 right-8 z-50 rounded-full w-16 h-16 shadow-lg",
                      theme === "light"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    )}
                  >
                    <Search className="w-7 h-7" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick Book</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent
            className={cn(
              theme === "light"
                ? "bg-white border-emerald-200"
                : "bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-600"
            )}
          >
            <DialogHeader>
              <DialogTitle
                className={cn(
                  theme === "light"
                    ? "text-emerald-900"
                    : "text-gray-100 dark:text-gray-100"
                )}
              >
                Quick Book
              </DialogTitle>
              <DialogDescription
                className={cn(
                  theme === "light"
                    ? "text-gray-600"
                    : "text-gray-300 dark:text-gray-300"
                )}
              >
                Find your perfect stay in Ethiopia
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <label
                  className={cn(
                    "text-sm font-medium",
                    theme === "light"
                      ? "text-gray-700"
                      : "text-gray-200 dark:text-gray-200"
                  )}
                >
                  Destination
                </label>
                <Input
                  placeholder="e.g., Addis Ababa"
                  className={cn(
                    theme === "light"
                      ? "border-emerald-300"
                      : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  )}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    className={cn(
                      "text-sm font-medium",
                      theme === "light"
                        ? "text-gray-700"
                        : "text-gray-200 dark:text-gray-200"
                    )}
                  >
                    Check-in
                  </label>
                  <Input
                    type="date"
                    className={cn(
                      theme === "light"
                        ? "border-emerald-300"
                        : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    )}
                  />
                </div>
                <div className="flex-1">
                  <label
                    className={cn(
                      "text-sm font-medium",
                      theme === "light"
                        ? "text-gray-700"
                        : "text-gray-200 dark:text-gray-200"
                    )}
                  >
                    Check-out
                  </label>
                  <Input
                    type="date"
                    className={cn(
                      theme === "light"
                        ? "border-emerald-300"
                        : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    )}
                  />
                </div>
              </div>
              <Button
                className={cn(
                  "w-full",
                  theme === "light"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                )}
                onClick={() => {
                  setIsDialogOpen(false);
                  navigate("/home");
                }}
              >
                <Search className="mr-2 h-5 w-5" /> Search Hotels
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Hero Section */}
        <motion.div
          ref={headerRef}
          className="header-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Avatar className="w-20 h-20 mb-6">
            <AvatarImage src="/assets/logo.png" alt="Book Ethiopia Logo" />
            <AvatarFallback>BE</AvatarFallback>
          </Avatar>
          <h1>
            {Array.from("Welcome to Book Ethiopia").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </h1>
          <div className="search-bar">
            <Input
              placeholder="Search hotels, destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                theme === "light"
                  ? "border-emerald-300"
                  : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              )}
            />
            <Button
              onClick={handleSearch}
              className={cn(
                theme === "light"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              )}
            >
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </div>
          <Button
            className="book-now-btn"
            onClick={() => navigate("/home")}
            aria-label="Book now"
          >
            <Calendar className="mr-2 h-6 w-6" /> Book Now
          </Button>
        </motion.div>

        {/* Scrollable Content */}
        <div
          ref={container}
          className="scroll-container text-white max-w-7xl w-full px-8"
        >
          <Separator
            className={cn(
              theme === "light"
                ? "bg-emerald-300"
                : "bg-gray-600 dark:bg-gray-600"
            )}
          />
          {textAndImage.map((item) => (
            <HoverCard key={item.id}>
              <HoverCardTrigger asChild>
                <div
                  className={cn(
                    "parallax-item flex items-center justify-center gap-10",
                    item.id % 2 === 1 ? "flex-row" : "flex-row-reverse"
                  )}
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                >
                  <span className="parallax-icon">{item.icon}</span>
                  <Card
                    className={cn(
                      "parallax-card",
                      theme === "light"
                        ? "bg-white/30 border-emerald-200/50"
                        : "bg-gray-800/30 border-gray-700/50 dark:bg-gray-800/30 dark:border-gray-600/50"
                    )}
                  >
                    <CardHeader>
                      <CardTitle
                        className={cn(
                          "text-3xl font-bold",
                          theme === "light"
                            ? "text-white"
                            : "text-gray-100 dark:text-gray-100"
                        )}
                      >
                        {item.text}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge
                        className={cn(
                          theme === "light"
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                        )}
                        onClick={() => navigate("/home")}
                      >
                        Explore Now
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                className={cn(
                  theme === "light"
                    ? "bg-white text-gray-700 border-emerald-200"
                    : "bg-gray-800 text-gray-100 border-gray-700 dark:bg-gray-800 dark:border-gray-600"
                )}
              >
                {item.desc}
              </HoverCardContent>
            </HoverCard>
          ))}
          <Separator
            className={cn(
              theme === "light"
                ? "bg-emerald-300"
                : "bg-gray-600 dark:bg-gray-600"
            )}
          />

          {/* Featured Destinations */}
          <div className="py-12">
            <h2
              className={cn(
                "text-4xl font-bold text-center mb-8",
                theme === "light"
                  ? "text-emerald-900"
                  : "text-gray-100 dark:text-gray-100"
              )}
            >
              Featured Destinations
            </h2>
            <Tabs
              defaultValue={featuredDestinations[0].name}
              className="w-full"
            >
              <TabsList
                className={cn(
                  "grid grid-cols-3 gap-4",
                  theme === "light"
                    ? "bg-emerald-100"
                    : "bg-gray-700 dark:bg-gray-700"
                )}
              >
                {featuredDestinations.map((dest) => (
                  <TabsTrigger
                    key={dest.id}
                    value={dest.name}
                    className={cn(
                      theme === "light"
                        ? "data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                        : "data-[state=active]:bg-emerald-500 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-500"
                    )}
                  >
                    {dest.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {featuredDestinations.map((dest) => (
                <TabsContent key={dest.id} value={dest.name}>
                  <div
                    className="destination-tab h-96 flex items-end p-6"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  >
                    <Card
                      className={cn(
                        "w-full max-w-md",
                        theme === "light"
                          ? "bg-white/30 border-emerald-200/50"
                          : "bg-gray-800/30 border-gray-700/50 dark:bg-gray-800/30 dark:border-gray-600/50"
                      )}
                    >
                      <CardHeader>
                        <CardTitle
                          className={cn(
                            theme === "light"
                              ? "text-white"
                              : "text-gray-100 dark:text-gray-100"
                          )}
                        >
                          {dest.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p
                          className={cn(
                            theme === "light"
                              ? "text-white"
                              : "text-gray-100 dark:text-gray-100"
                          )}
                        >
                          {dest.desc}
                        </p>
                        <Button
                          className={cn(
                            "mt-4",
                            theme === "light"
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                          )}
                          onClick={() => navigate("/home")}
                        >
                          Explore {dest.name}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <Separator
            className={cn(
              theme === "light"
                ? "bg-emerald-300"
                : "bg-gray-600 dark:bg-gray-600"
            )}
          />

          {/* Footer Section */}
          <div className="footer-section">
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <div className="social-links flex justify-center mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <Input
                type="email"
                placeholder="Enter your email"
                className={cn(
                  theme === "light"
                    ? "border-emerald-300"
                    : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                )}
              />
              <Button
                type="submit"
                className={cn(
                  theme === "light"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                )}
              >
                <Mail className="mr-2 h-5 w-5" /> Subscribe
              </Button>
            </form>
            <p className="mt-4 text-sm">
              © 2025 Book Ethiopia. All rights reserved.
            </p>
          </div>

          {/* Dot Navigation */}
          <div className="nav-dots">
            {textAndImage.map((item) => (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="nav-dot" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.text}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
