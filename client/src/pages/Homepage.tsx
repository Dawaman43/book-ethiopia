import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  ChevronDown,
  Mail,
  Sun,
  Moon,
  Map,
  Info,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [filter, setFilter] = useState("all");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [weather, setWeather] = useState({
    addis: { temp: 0, condition: "", icon: "" },
    lalibela: { temp: 0, condition: "", icon: "" },
    gondar: { temp: 0, condition: "", icon: "" },
  });

  useEffect(() => {
    // Ensure dark mode is applied correctly
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme as "light" | "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    // Countdown timer for offers
    const endDate = new Date("2025-10-01T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch weather data from WeatherAPI
    const fetchWeather = async () => {
      const apiKey = "a5791138a69b4127a00134332252105";
      const cities = ["Addis Ababa", "Lalibela", "Gondar"];
      const weatherData = { addis: {}, lalibela: {}, gondar: {} };

      for (const city of cities) {
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
          );
          const data = await response.json();
          const key = city.toLowerCase().replace(" ", "");
          weatherData[key] = {
            temp: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
          };
        } catch (error) {
          console.error(`Error fetching weather for ${city}:`, error);
        }
      }
      setWeather(weatherData);
    };
    fetchWeather();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const hotels = [
    {
      name: "Sheraton Addis",
      location: "Addis Ababa",
      stars: 5,
      price: 250,
      type: "luxury",
      image: "/assets/sheraton.jpg",
      reviews: 1200,
      rating: 4.8,
    },
    {
      name: "Skylight Hotel",
      location: "Addis Ababa",
      stars: 4,
      price: 180,
      type: "business",
      image: "/assets/skylight.jpg",
      reviews: 980,
      rating: 4.5,
    },
    {
      name: "Jupiter International",
      location: "Addis Ababa",
      stars: 3,
      price: 100,
      type: "budget",
      image: "/assets/jupitor.jpg",
      reviews: 750,
      rating: 4.2,
    },
    {
      name: "Ethio Palace",
      location: "Lalibela",
      stars: 4,
      price: 200,
      type: "luxury",
      image: "/assets/Hotel.jpg",
      reviews: 600,
      rating: 4.7,
    },
  ];

  const filteredHotels =
    filter === "all" ? hotels : hotels.filter((hotel) => hotel.type === filter);

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        theme === "light"
          ? "bg-gradient-to-b from-green-50 to-teal-100"
          : "bg-gradient-to-b from-gray-900 to-gray-700 dark:bg-gray-900"
      )}
    >
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={cn(
            "rounded-full w-10 h-10",
            theme === "light"
              ? "hover:bg-green-100 text-emerald-900"
              : "hover:bg-gray-800 text-gray-100 dark:hover:bg-gray-700 dark:text-gray-100"
          )}
        >
          {theme === "light" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Quick Book Floating Action Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={cn(
                "fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-lg",
                theme === "light"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              )}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Search className="w-6 h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Quick Book</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Hero Section with Parallax Effect and Video Background Option */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        >
          {theme === "light" ? (
            <img
              src="/assets/base.jpg"
              alt="Ethiopian Landscape"
              className="w-full h-full object-cover opacity-80"
            />
          ) : (
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover opacity-70"
            >
              <source src="/assets/ethiopia-night.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900 dark:to-gray-900 opacity-60"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            className={cn(
              "text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg",
              theme === "light"
                ? "text-white"
                : "text-gray-100 dark:text-gray-100"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Ethiopia's Finest Hotels
          </motion.h1>
          <motion.p
            className={cn(
              "text-xl md:text-2xl mb-8 drop-shadow-md",
              theme === "light"
                ? "text-emerald-100"
                : "text-gray-300 dark:text-gray-300"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Book your dream stay in Ethiopia's vibrant cities and serene
            landscapes
          </motion.p>
          <motion.div
            className={cn(
              "p-6 md:p-8 rounded-xl shadow-2xl max-w-4xl mx-auto border",
              theme === "light"
                ? "bg-white border-emerald-200"
                : "bg-gray-800 border-gray-700 dark:bg-gray-800 dark:border-gray-600"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="flex items-center space-x-2 col-span-2">
                <MapPin
                  className={cn(
                    theme === "light"
                      ? "text-emerald-600"
                      : "text-emerald-400 dark:text-emerald-400"
                  )}
                />
                <Input
                  placeholder="Destination (e.g., Addis Ababa, Lalibela)"
                  className={cn(
                    theme === "light"
                      ? "border-emerald-300"
                      : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Calendar
                  className={cn(
                    theme === "light"
                      ? "text-emerald-600"
                      : "text-emerald-400 dark:text-emerald-400"
                  )}
                />
                <Input
                  placeholder="Check-in"
                  type="date"
                  className={cn(
                    theme === "light"
                      ? "border-emerald-300"
                      : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Calendar
                  className={cn(
                    theme === "light"
                      ? "text-emerald-600"
                      : "text-emerald-400 dark:text-emerald-400"
                  )}
                />
                <Input
                  placeholder="Check-out"
                  type="date"
                  className={cn(
                    theme === "light"
                      ? "border-emerald-300"
                      : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Users
                  className={cn(
                    theme === "light"
                      ? "text-emerald-600"
                      : "text-emerald-400 dark:text-emerald-400"
                  )}
                />
                <Select>
                  <SelectTrigger
                    className={cn(
                      theme === "light"
                        ? "border-emerald-300"
                        : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    )}
                  >
                    <SelectValue placeholder="Guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className={cn(
                "mt-6 w-full text-lg py-6",
                theme === "light"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              )}
            >
              <Search className="mr-2 h-5 w-5" /> Find Your Perfect Stay
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light" ? "bg-white" : "bg-gray-800 dark:bg-gray-800"
        )}
      >
        <h2
          className={cn(
            "text-4xl font-bold text-center mb-12",
            theme === "light"
              ? "text-emerald-900"
              : "text-gray-100 dark:text-gray-100"
          )}
        >
          Explore Ethiopia on the Map
        </h2>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-lg overflow-hidden shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252486.76980388837!2d38.613326299999996!3d8.96336015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cd15f292fb%3A0x3e2c3d3c3f4b2b0!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1697041234567!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow">
              <Button
                variant="outline"
                className={cn(
                  theme === "light"
                    ? "border-emerald-300 text-emerald-600"
                    : "border-gray-600 text-gray-100 dark:border-gray-600 dark:text-gray-100"
                )}
              >
                <Map className="mr-2 h-4 w-4" /> View Hotels on Map
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Destinations with HoverCard */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light" ? "bg-emerald-50" : "bg-gray-900 dark:bg-gray-900"
        )}
      >
        <h2
          className={cn(
            "text-4xl font-bold text-center mb-12",
            theme === "light"
              ? "text-emerald-900"
              : "text-gray-100 dark:text-gray-100"
          )}
        >
          Top Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            {
              name: "Addis Ababa",
              img: "/assets/Hotel.jpg",
              desc: "Vibrant capital with cultural landmarks",
              highlights: [
                "National Museum",
                "Holy Trinity Cathedral",
                "Entoto Hill",
              ],
            },
            {
              name: "Lalibela",
              img: "/assets/sheraton.jpg",
              desc: "UNESCO rock-hewn churches",
              highlights: [
                "Rock-Hewn Churches",
                "Yemrehanna Kristos",
                "Asheton Maryam",
              ],
            },
            {
              name: "Axum",
              img: "/assets/skylight.jpg",
              desc: "Ancient kingdom with obelisks",
              highlights: [
                "Axum Obelisks",
                "Church of St. Mary of Zion",
                "Queen of Sheba's Palace",
              ],
            },
            {
              name: "Gondar",
              img: "/assets/jupitor.jpg",
              desc: "Royal castles and medieval history",
              highlights: [
                "Fasil Ghebbi",
                "Debre Berhan Selassie",
                "Baths of Fasilides",
              ],
            },
          ].map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card
                    className={cn(
                      "overflow-hidden cursor-pointer",
                      theme === "light"
                        ? "bg-white"
                        : "bg-gray-800 dark:bg-gray-800"
                    )}
                  >
                    <CardHeader className="p-0">
                      <img
                        src={dest.img}
                        alt={dest.name}
                        className="h-48 w-full object-cover"
                      />
                    </CardHeader>
                    <CardContent className="pt-4">
                      <CardTitle>{dest.name}</CardTitle>
                      <CardDescription>{dest.desc}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className={cn(
                          theme === "light"
                            ? "border-emerald-300 text-emerald-600"
                            : "border-gray-600 text-gray-100 dark:border-gray-600 dark:text-gray-100"
                        )}
                      >
                        Explore Hotels
                      </Button>
                    </CardFooter>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent
                  className={cn(
                    theme === "light"
                      ? "bg-white"
                      : "bg-gray-800 dark:bg-gray-800"
                  )}
                >
                  <h3 className="text-lg font-semibold">
                    {dest.name} Highlights
                  </h3>
                  <ul className="list-disc pl-4 mt-2">
                    {dest.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className={cn(
                          "text-sm",
                          theme === "light"
                            ? "text-gray-600"
                            : "text-gray-300 dark:text-gray-300"
                        )}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Hotels with Advanced Filters */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light" ? "bg-white" : "bg-gray-800 dark:bg-gray-800"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <h2
              className={cn(
                "text-4xl font-bold",
                theme === "light"
                  ? "text-emerald-900"
                  : "text-gray-100 dark:text-gray-100"
              )}
            >
              Featured Hotels
            </h2>
            <div className="flex gap-4">
              <Select onValueChange={setFilter} defaultValue="all">
                <SelectTrigger
                  className={cn(
                    theme === "light"
                      ? "border-emerald-300"
                      : "border-gray-600 bg-gray-700 text-white dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  )}
                >
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hotels</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Carousel className="max-w-6xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {filteredHotels.map((hotel, index) => (
                <CarouselItem key={index} className="md:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className={cn(
                        "h-full",
                        theme === "light"
                          ? "bg-white"
                          : "bg-gray-800 dark:bg-gray-800"
                      )}
                    >
                      <CardHeader className="p-0">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="h-64 w-full object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-emerald-600 capitalize">
                          {hotel.type}
                        </Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <CardTitle>{hotel.name}</CardTitle>
                        <CardDescription>
                          {hotel.location} • {hotel.stars} Stars
                        </CardDescription>
                        <p
                          className={cn(
                            "text-sm mt-2",
                            theme === "light"
                              ? "text-gray-600"
                              : "text-gray-300 dark:text-gray-300"
                          )}
                        >
                          {hotel.type === "luxury"
                            ? "World-class luxury experience"
                            : hotel.type === "business"
                            ? "Ideal for business travelers"
                            : "Affordable comfort"}
                        </p>
                        <div className="flex items-center mt-2">
                          <Star
                            className="h-4 w-4 text-yellow-400 mr-1"
                            fill="currentColor"
                          />
                          {hotel.rating} ({hotel.reviews} reviews)
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <p
                          className={cn(
                            "font-bold",
                            theme === "light"
                              ? "text-emerald-700"
                              : "text-emerald-400 dark:text-emerald-400"
                          )}
                        >
                          ${hotel.price}/night
                        </p>
                        <Button
                          className={cn(
                            theme === "light"
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                          )}
                        >
                          Book Now
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className={cn(
                theme === "light"
                  ? "bg-white text-emerald-900"
                  : "bg-gray-700 text-gray-100 dark:bg-gray-700 dark:text-gray-100"
              )}
            />
            <CarouselNext
              className={cn(
                theme === "light"
                  ? "bg-white text-emerald-900"
                  : "bg-gray-700 text-gray-100 dark:bg-gray-700 dark:text-gray-100"
              )}
            />
          </Carousel>
        </div>
      </section>

      {/* Weather Widget with Real-Time Data */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light" ? "bg-white" : "bg-gray-800 dark:bg-gray-800"
        )}
      >
        <h2
          className={cn(
            "text-4xl font-bold text-center mb-12",
            theme === "light"
              ? "text-emerald-900"
              : "text-gray-100 dark:text-gray-100"
          )}
        >
          Weather in Ethiopia
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { city: "Addis Ababa", data: weather.addis },
            { city: "Lalibela", data: weather.lalibela },
            { city: "Gondar", data: weather.gondar },
          ].map((item, index) => (
            <motion.div
              key={item.city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  theme === "light"
                    ? "bg-white"
                    : "bg-gray-800 dark:bg-gray-800"
                )}
              >
                <CardHeader>
                  <CardTitle>{item.city}</CardTitle>
                  <CardDescription>Current Weather</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.data.icon
                          ? `https:${item.data.icon}`
                          : "/assets/cloudy.png"
                      }
                      alt={item.data.condition || "Weather"}
                      className="h-16 w-16"
                    />
                    <div>
                      <p className="text-2xl font-bold">{item.data.temp}°C</p>
                      <p
                        className={cn(
                          theme === "light"
                            ? "text-gray-600"
                            : "text-gray-300 dark:text-gray-300"
                        )}
                      >
                        {item.data.condition || "Loading..."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Amenities with Progress Bars */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light" ? "bg-emerald-50" : "bg-gray-900 dark:bg-gray-900"
        )}
      >
        <h2
          className={cn(
            "text-4xl font-bold text-center mb-12",
            theme === "light"
              ? "text-emerald-900"
              : "text-gray-100 dark:text-gray-100"
          )}
        >
          Popular Hotel Amenities
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "Free Wi-Fi",
              value: 95,
              desc: "High-speed internet access in all rooms",
            },
            {
              name: "Spa Services",
              value: 85,
              desc: "Relax with world-class spa treatments",
            },
            {
              name: "Pool Facilities",
              value: 90,
              desc: "Enjoy refreshing pools with scenic views",
            },
            {
              name: "Guided Tours",
              value: 80,
              desc: "Explore Ethiopia with expert guides",
            },
          ].map((amenity, index) => (
            <motion.div
              key={amenity.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  theme === "light"
                    ? "bg-white"
                    : "bg-gray-800 dark:bg-gray-800"
                )}
              >
                <CardHeader>
                  <CardTitle>{amenity.name}</CardTitle>
                  <CardDescription>{amenity.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={amenity.value}
                    className={cn(
                      "h-2",
                      theme === "light"
                        ? "bg-emerald-200 [&>div]:bg-emerald-600"
                        : "bg-gray-700 [&>div]:bg-emerald-500 dark:bg-gray-700 dark:[&>div]:bg-emerald-500"
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm mt-2",
                      theme === "light"
                        ? "text-gray-600"
                        : "text-gray-300 dark:text-gray-300"
                    )}
                  >
                    {amenity.value}% of guests rated this amenity highly
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Travel Tips with Alert Components */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light" ? "bg-white" : "bg-gray-800 dark:bg-gray-800"
        )}
      >
        <h2
          className={cn(
            "text-4xl font-bold text-center mb-12",
            theme === "light"
              ? "text-emerald-900"
              : "text-gray-100 dark:text-gray-100"
          )}
        >
          Travel Tips for Ethiopia
        </h2>
        <div className="max-w-7xl mx-auto space-y-6">
          {[
            {
              title: "Cultural Etiquette",
              desc: "Respect local customs by dressing modestly and greeting with a handshake.",
            },
            {
              title: "Best Time to Visit",
              desc: "Visit during the dry season (October to May) for pleasant weather.",
            },
            {
              title: "Local Cuisine",
              desc: "Try injera and doro wat for an authentic Ethiopian dining experience.",
            },
          ].map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Alert
                className={cn(
                  theme === "light"
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-gray-600 bg-gray-800 dark:border-gray-600 dark:bg-gray-800"
                )}
              >
                <Info
                  className={cn(
                    "h-4 w-4",
                    theme === "light"
                      ? "text-emerald-600"
                      : "text-emerald-400 dark:text-emerald-400"
                  )}
                />
                <AlertTitle>{tip.title}</AlertTitle>
                <AlertDescription
                  className={cn(
                    theme === "light"
                      ? "text-gray-600"
                      : "text-gray-300 dark:text-gray-300"
                  )}
                >
                  {tip.desc}
                </AlertDescription>
              </Alert>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Special Offers with Live Countdown */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light" ? "bg-emerald-50" : "bg-gray-900 dark:bg-gray-900"
        )}
      >
        <h2
          className={cn(
            "text-4xl font-bold text-center mb-12",
            theme === "light"
              ? "text-emerald-900"
              : "text-gray-100 dark:text-gray-100"
          )}
        >
          Limited-Time Offers
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              className={cn(
                theme === "light" ? "bg-white" : "bg-gray-800 dark:bg-gray-800"
              )}
            >
              <CardHeader>
                <CardTitle>Weekend Escape</CardTitle>
                <CardDescription>30% off in Addis Ababa</CardDescription>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    theme === "light"
                      ? "text-gray-600"
                      : "text-gray-300 dark:text-gray-300"
                  )}
                >
                  Book by midnight to save big on your weekend getaway.
                </p>
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold">Offer ends in:</p>
                  <p
                    className={cn(
                      "text-lg font-bold",
                      theme === "light"
                        ? "text-emerald-700"
                        : "text-emerald-400 dark:text-emerald-400"
                    )}
                  >
                    {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
                    {countdown.seconds}s
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={cn(
                    "w-full",
                    theme === "light"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  )}
                >
                  Claim Offer
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card
              className={cn(
                theme === "light" ? "bg-white" : "bg-gray-800 dark:bg-gray-800"
              )}
            >
              <CardHeader>
                <CardTitle>Cultural Journey</CardTitle>
                <CardDescription>Hotel + Guided Tour Package</CardDescription>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    theme === "light"
                      ? "text-gray-600"
                      : "text-gray-300 dark:text-gray-300"
                  )}
                >
                  Explore Lalibela's rock-hewn churches with this exclusive
                  package.
                </p>
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold">Offer ends in:</p>
                  <p
                    className={cn(
                      "text-lg font-bold",
                      theme === "light"
                        ? "text-emerald-700"
                        : "text-emerald-400 dark:text-emerald-400"
                    )}
                  >
                    {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
                    {countdown.seconds}s
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={cn(
                    "w-full",
                    theme === "light"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  )}
                >
                  Claim Offer
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card
              className={cn(
                theme === "light" ? "bg-white" : "bg-gray-800 dark:bg-gray-800"
              )}
            >
              <CardHeader>
                <CardTitle>Family Adventure</CardTitle>
                <CardDescription>
                  Free kids' activities included
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    theme === "light"
                      ? "text-gray-600"
                      : "text-gray-300 dark:text-gray-300"
                  )}
                >
                  Enjoy a family-friendly stay with complimentary activities.
                </p>
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold">Offer ends in:</p>
                  <p
                    className={cn(
                      "text-lg font-bold",
                      theme === "light"
                        ? "text-emerald-700"
                        : "text-emerald-400 dark:text-emerald-400"
                    )}
                  >
                    {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
                    {countdown.seconds}s
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className={cn(
                    "w-full",
                    theme === "light"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  )}
                >
                  Claim Offer
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us with Animations */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light" ? "bg-white" : "bg-gray-800 dark:bg-gray-800"
        )}
      >
        <h2
          className={cn(
            "text-4xl font-bold text-center mb-12",
            theme === "light"
              ? "text-emerald-900"
              : "text-gray-100 dark:text-gray-100"
          )}
        >
          Why Book With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            {
              icon: MapPin,
              title: "Local Expertise",
              desc: "Deep knowledge of Ethiopia's culture and destinations.",
            },
            {
              icon: Star,
              title: "Best Price Guarantee",
              desc: "Competitive rates with a price match promise.",
            },
            {
              icon: Users,
              title: "24/7 Support",
              desc: "Dedicated team available around the clock.",
            },
            {
              icon: ChevronDown,
              title: "Flexible Booking",
              desc: "Easy cancellations and modifications for your peace of mind.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "text-center",
                  theme === "light"
                    ? "bg-white"
                    : "bg-gray-800 dark:bg-gray-800"
                )}
              >
                <CardHeader>
                  <div
                    className={cn(
                      "mx-auto rounded-full p-4 mb-4",
                      theme === "light"
                        ? "bg-emerald-100"
                        : "bg-gray-700 dark:bg-gray-700"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-8 w-8",
                        theme === "light"
                          ? "text-emerald-600"
                          : "text-emerald-400 dark:text-emerald-400"
                      )}
                    />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={cn(
                      theme === "light"
                        ? "text-gray-600"
                        : "text-gray-300 dark:text-gray-300"
                    )}
                  >
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Guest Reviews with Carousel */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light" ? "bg-emerald-50" : "bg-gray-900 dark:bg-gray-900"
        )}
      >
        <h2
          className={cn(
            "text-4xl font-bold text-center mb-12",
            theme === "light"
              ? "text-emerald-900"
              : "text-gray-100 dark:text-gray-100"
          )}
        >
          What Our Guests Say
        </h2>
        <Carousel className="max-w-5xl mx-auto" opts={{ loop: true }}>
          <CarouselContent>
            {[
              {
                name: "John Doe",
                country: "USA",
                date: "June 2025",
                review:
                  "An unforgettable stay in Addis Ababa. The service was impeccable!",
                avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=John",
              },
              {
                name: "Jane Smith",
                country: "UK",
                date: "August 2025",
                review:
                  "Lalibela's magic came alive with our perfect hotel choice.",
                avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Jane",
              },
              {
                name: "Alex Kim",
                country: "South Korea",
                date: "September 2025",
                review:
                  "Great value and excellent support throughout our trip.",
                avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alex",
              },
            ].map((review, index) => (
              <CarouselItem key={index}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    className={cn(
                      theme === "light"
                        ? "bg-white"
                        : "bg-gray-800 dark:bg-gray-800"
                    )}
                  >
                    <CardContent className="pt-6">
                      <p
                        className={cn(
                          "italic mb-4",
                          theme === "light"
                            ? "text-gray-600"
                            : "text-gray-300 dark:text-gray-300"
                        )}
                      >
                        "{review.review}"
                      </p>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p
                            className={cn(
                              "text-sm",
                              theme === "light"
                                ? "text-gray-500"
                                : "text-gray-400 dark:text-gray-400"
                            )}
                          >
                            {review.country} • {review.date}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={cn(
              theme === "light"
                ? "bg-white text-emerald-900"
                : "bg-gray-700 text-gray-100 dark:bg-gray-700 dark:text-gray-100"
            )}
          />
          <CarouselNext
            className={cn(
              theme === "light"
                ? "bg-white text-emerald-900"
                : "bg-gray-700 text-gray-100 dark:bg-gray-700 dark:text-gray-100"
            )}
          />
        </Carousel>
      </section>

      {/* Interactive FAQ Section */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light" ? "bg-white" : "bg-gray-800 dark:bg-gray-800"
        )}
      >
        <h2
          className={cn(
            "text-4xl font-bold text-center mb-12",
            theme === "light"
              ? "text-emerald-900"
              : "text-gray-100 dark:text-gray-100"
          )}
        >
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {[
            {
              q: "How do I book a hotel?",
              a: "Use our search form to select your destination, dates, and number of guests, then choose from available hotels.",
            },
            {
              q: "Is there a cancellation fee?",
              a: "Cancellation policies vary by hotel. Check the specific hotel's policy during booking.",
            },
            {
              q: "Do you offer group bookings?",
              a: "Yes, contact our support team for special group rates and arrangements.",
            },
            {
              q: "How secure is my payment?",
              a: "We use industry-standard encryption to ensure your payment information is secure.",
            },
          ].map((faq, index) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger
                  className={cn(
                    theme === "light"
                      ? "text-emerald-900"
                      : "text-gray-100 dark:text-gray-100"
                  )}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    theme === "light"
                      ? "text-gray-600"
                      : "text-gray-300 dark:text-gray-300"
                  )}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </section>

      {/* Newsletter Signup with Animation */}
      <section
        className={cn(
          "py-16 px-6",
          theme === "light"
            ? "bg-gradient-to-r from-emerald-600 to-teal-600"
            : "bg-gradient-to-r from-emerald-700 to-teal-700 dark:bg-gradient-to-r dark:from-emerald-700 dark:to-teal-700"
        )}
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated with Exclusive Offers
          </h2>
          <p className="text-xl text-white mb-8">
            Subscribe to our newsletter for the latest deals and travel tips.
          </p>
          <div className="flex max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="rounded-r-none border-none bg-white text-black dark:bg-gray-800 dark:text-gray-100"
            />
            <Button className="rounded-l-none bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800">
              <Mail className="mr-2 h-4 w-4" /> Subscribe
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className={cn(
          "py-12 px-6",
          theme === "light" ? "bg-emerald-800" : "bg-gray-900 dark:bg-gray-900"
        )}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img
              src="/assets/logo.png"
              alt="Book Ethiopia Logo"
              className="h-12 mb-4"
            />
            <p className="text-sm text-white mb-4">
              Your premier platform for booking hotels across Ethiopia.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-white hover:text-emerald-200">
                Facebook
              </Link>
              <Link to="#" className="text-white hover:text-emerald-200">
                Twitter
              </Link>
              <Link to="#" className="text-white hover:text-emerald-200">
                Instagram
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-white hover:text-emerald-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white hover:text-emerald-200">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white hover:text-emerald-200">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white hover:text-emerald-200">
                  Deals
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white hover:text-emerald-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-white hover:text-emerald-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white hover:text-emerald-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white hover:text-emerald-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-white hover:text-emerald-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h3>
            <p className="text-sm text-white mb-2">
              Email: info@bookethiopia.com
            </p>
            <p className="text-sm text-white mb-2">Phone: +251 11 123 4567</p>
            <p className="text-sm text-white">
              Address: Bole Road, Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
        <Separator
          className={cn(
            "my-8",
            theme === "light"
              ? "bg-emerald-700"
              : "bg-gray-700 dark:bg-gray-700"
          )}
        />
        <p className="text-center text-sm text-white">
          &copy; 2025 Book Ethiopia. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
