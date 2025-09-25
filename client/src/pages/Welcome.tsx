import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const textAndImage = [
  {
    id: 1,
    text: "Discover amazing Ethiopian hotels and resorts.",
    imageUrl: "/assets/Hotel.jpg",
  },
  {
    id: 2,
    text: "Explore top-rated restaurants and cafes.",
    imageUrl: "/assets/jupitor.jpg",
  },
  {
    id: 3,
    text: "Find exciting activities and tours.",
    imageUrl: "/assets/sheraton.jpg",
  },
  {
    id: 4,
    text: "Experience the best Ethiopian hotel with us.",
    imageUrl: "/assets/skylight.jpg",
  },
  {
    id: 5,
    text: "Book your perfect stay in Ethiopia today!",
    imageUrl: "/assets/base.jpg",
  },
];

function WelcomePage() {
  const container = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    if (!container.current) return;

    // No animation for header (static as requested)
    // Background Gradient Animation
    gsap.to(".bg-gradient", {
      background: "linear-gradient(135deg, #7f1d1d, #000000, #4c1d95)",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Parallax Items Animation
    const items: NodeListOf<HTMLElement> =
      container.current.querySelectorAll(".parallax-item");

    items.forEach((item: HTMLElement, index: number) => {
      const text = item.querySelector(".parallax-text");

      // Background Parallax Effect
      gsap.to(item, {
        backgroundPositionY: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: item,
          scroller: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text Animation
      gsap.fromTo(
        text,
        { xPercent: index % 2 === 0 ? -100 : 100, opacity: 0, scale: 0.9 },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            scroller: container.current,
            start: "top 90%",
            end: "center 40%",
            scrub: 0.8,
          },
        }
      );
    });

    // Dot Navigation Animation
    const dots: NodeListOf<HTMLElement> =
      container.current.querySelectorAll(".nav-dot");
    dots.forEach((dot: HTMLElement, index: number) => {
      ScrollTrigger.create({
        trigger: items[index],
        scroller: container.current,
        start: "top center",
        end: "bottom center",
        onEnter: () =>
          gsap.to(dot, {
            scale: 1.5,
            backgroundColor: "#ffffff",
            duration: 0.3,
          }),
        onLeave: () =>
          gsap.to(dot, {
            scale: 1,
            backgroundColor: "#ffffff66",
            duration: 0.3,
          }),
        onEnterBack: () =>
          gsap.to(dot, {
            scale: 1.5,
            backgroundColor: "#ffffff",
            duration: 0.3,
          }),
        onLeaveBack: () =>
          gsap.to(dot, {
            scale: 1,
            backgroundColor: "#ffffff66",
            duration: 0.3,
          }),
      });
    });
  }, []);

  return (
    <>
      <style>
        {`
          /* Hide container scrollbar */
          .scroll-container {
            scrollbar-width: none; /* Firefox */
            scroll-behavior: smooth; /* Smooth scrolling */
          }
          .scroll-container::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge */
          }
          /* Gradient background */
         .bg-gradient {
  background: linear-gradient(135deg, #7f1d1d, #fbbf24); /* Burgundy to Gold */
}

          /* Parallax item styling */
          .parallax-item {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            padding: 2rem;
            background-size: cover;
            background-position: center 0%;
            background-attachment: scroll;
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5); /* Subtle shadow for depth */
            border-radius: 12px; /* Rounded corners */
            transition: transform 0.3s ease; /* Smooth scale on hover */
          }
          .parallax-item:hover {
            transform: scale(1.02); /* Slight zoom on hover */
          }
          /* Overlay for better text contrast */
          .parallax-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4); /* Dark overlay for contrast */
            z-index: 1;
          }
          /* Text styling with enhanced design */
          .parallax-text {
            position: relative;
            z-index: 2;
            background: rgba(0, 0, 0, 0.7); /* Slightly darker for readability */
            padding: 1.5rem 3rem;
            border-radius: 12px;
            backdrop-filter: blur(8px); /* Enhanced blur effect */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Subtle shadow */
            font-size: 2.5rem; /* Larger text */
            font-weight: 700; /* Bolder text */
            color: #ffffff;
            text-transform: uppercase; /* Uppercase for emphasis */
            letter-spacing: 1px; /* Spacing for elegance */
            border: 2px solid rgba(255, 255, 255, 0.2); /* Subtle border */
            transition: all 0.3s ease; /* Smooth transition for hover */
          }
          .parallax-text:hover {
            background: rgba(0, 0, 0, 0.85); /* Darker on hover */
            transform: translateY(-5px); /* Lift effect on hover */
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4); /* Stronger shadow on hover */
          }
          /* Dot navigation */
          .nav-dots {
            position: fixed;
            right: 1.5rem;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            z-index: 10;
          }
          .nav-dot {
            width: 12px;
            height: 12px;
            background-color: #ffffff66;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Subtle glow */
          }
          .nav-dot:hover {
            background-color: #ffffff;
            scale: 1.7; /* Slightly larger hover effect */
          }
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .parallax-item {
              flex-direction: column;
              min-height: 60vh;
              padding: 1.5rem;
            }
            .parallax-text {
              font-size: 1.8rem;
              padding: 1rem 2rem;
            }
            .nav-dots {
              right: 1rem;
              gap: 0.5rem;
            }
            .nav-dot {
              width: 10px;
              height: 10px;
            }
          }
        `}
      </style>
      <div className="bg-gradient min-h-screen flex flex-col items-center gap-12 ">
        {/* Header Section (Static) */}
        <div
          ref={headerRef}
          className="min-h-screen flex flex-col items-center justify-center gap-12"
        >
          <div className="text-white text-7xl font-bold text-center">
            Welcome To Book Ethiopia
          </div>
          <Button
            variant="outline"
            className="p-6 cursor-pointer text-xl border-white  hover:bg-white hover:text-black"
            onClick={() => navigate("/home")}
          >
            Book Now
          </Button>
        </div>

        {/* Scrollable Container with Parallax Items */}
        <div
          ref={container}
          className="scroll-container text-white text-center max-w-6xl w-full px-4 h-screen overflow-y-auto relative"
        >
          {textAndImage.map((item) => (
            <div
              key={item.id}
              className={`parallax-item flex items-center justify-center gap-8 ${
                item.id % 2 === 1 ? "flex-row" : "flex-row-reverse"
              }`}
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            >
              <p className="parallax-text text-2xl font-semibold flex-1 text-white">
                {item.text}
              </p>
            </div>
          ))}
          {/* Dot Navigation */}
          <div className="nav-dots">
            {textAndImage.map((item) => (
              <div key={item.id} className="nav-dot" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
