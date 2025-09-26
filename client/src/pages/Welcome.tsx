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
    icon: "🏨",
  },
  {
    id: 2,
    text: "Explore top-rated restaurants and cafes.",
    imageUrl: "/assets/jupitor.jpg",
    icon: "🍴",
  },
  {
    id: 3,
    text: "Find exciting activities and tours.",
    imageUrl: "/assets/sheraton.jpg",
    icon: "🗺️",
  },
  {
    id: 4,
    text: "Experience the best Ethiopian hotel with us.",
    imageUrl: "/assets/skylight.jpg",
    icon: "⭐",
  },
  {
    id: 5,
    text: "Book your perfect stay in Ethiopia today!",
    imageUrl: "/assets/base.jpg",
    icon: "📅",
  },
];

function WelcomePage() {
  const container = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useGSAP(() => {
    if (!container.current) return;

    // Header Animation
    const tl = gsap.timeline();
    tl.fromTo(
      headerRef.current.querySelectorAll("h1 span, .book-now-btn"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      }
    );

    // Background Animation
    gsap.to(".bg-gradient", {
      background: "linear-gradient(135deg, #1a1a1a, #333333, #1a1a1a)",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Parallax Items Animation
    const items = container.current.querySelectorAll(".parallax-item");

    items.forEach((item, index) => {
      const text = item.querySelector(".parallax-text");
      const icon = item.querySelector(".parallax-icon");

      // Smooth Parallax Effect
      gsap.to(item, {
        backgroundPositionY: "150%",
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          scroller: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text and Icon Animation
      gsap.fromTo(
        [text, icon],
        { xPercent: index % 2 === 0 ? -150 : 150, opacity: 0, scale: 0.8 },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            scroller: container.current,
            start: "top 80%",
            end: "center 30%",
            scrub: 0.5,
          },
        }
      );

      // Optimized Hover Effect
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(item, {
          rotateX: y / 60,
          rotateY: -x / 60,
          boxShadow: "0 0 30px rgba(245, 158, 11, 0.2)",
          duration: 0.4,
          ease: "power2.out",
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          rotateX: 0,
          rotateY: 0,
          boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.7)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      // Particle Burst
      ScrollTrigger.create({
        trigger: item,
        scroller: container.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          for (let i = 0; i < 10; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            item.appendChild(particle);
            gsap.to(particle, {
              x: gsap.utils.random(-50, 50),
              y: gsap.utils.random(-50, 50),
              opacity: 0,
              scale: gsap.utils.random(0.5, 1),
              duration: 1,
              ease: "power2.out",
              onComplete: () => particle.remove(),
            });
          }
        },
      });
    });

    // Dot Navigation Animation with Click Functionality
    const dots = container.current.querySelectorAll(".nav-dot");
    dots.forEach((dot, index) => {
      ScrollTrigger.create({
        trigger: items[index],
        scroller: container.current,
        start: "top center",
        end: "bottom center",
        onEnter: () =>
          gsap.to(dot, {
            scale: 2,
            backgroundColor: "#f59e0b",
            boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
            duration: 0.4,
          }),
        onLeave: () =>
          gsap.to(dot, {
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "none",
            duration: 0.4,
          }),
        onEnterBack: () =>
          gsap.to(dot, {
            scale: 2,
            backgroundColor: "#f59e0b",
            boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
            duration: 0.4,
          }),
        onLeaveBack: () =>
          gsap.to(dot, {
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "none",
            duration: 0.4,
          }),
      });

      // Click to Scroll
      dot.addEventListener("click", () => {
        const target = items[index];
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }, []);

  return (
    <>
      <style>
        {`
          /* Custom Font Import */
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@300;400;700&display=swap');

          /* Hide scrollbars globally */
          html, body {
            margin: 0;
            padding: 0;
            scrollbar-width: none;
            -ms-overflow-style: none;
            overflow-x: hidden;
          }
          html::-webkit-scrollbar, body::-webkit-scrollbar {
            display: none;
          }

          /* Scroll container */
          .scroll-container {
            scrollbar-width: none;
            -ms-overflow-style: none;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            width: 100%;
            max-width: 100%;
            height: calc(100vh - 100px); /* Adjusted for seamless integration */
            position: relative;
            z-index: 2;
          }
          .scroll-container::-webkit-scrollbar {
            display: none;
          }

          /* Grayscale background */
          .bg-gradient {
            background: linear-gradient(135deg, #1a1a1a, #333333);
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
          .bg-gradient::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 200%;
            background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"%3E%3Cfilter id="bb"%3E%3CfeGaussianBlur in="SourceGraphic" stdDeviation="20" /%3E%3C/filter%3E%3Ccircle cx="400" cy="400" r="300" fill="rgba(255,255,255,0.05)" filter="url(%23bb)" /%3E%3C/svg%3E');
            opacity: 0.15;
            animation: particleFloat 20s infinite linear;
          }
          @keyframes particleFloat {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100%); }
          }

          /* Particle */
          .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #ffffff;
            opacity: 0.8;
            pointer-events: none;
          }

          /* Header Styling */
          .header-section {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 3rem;
            padding: 2rem;
            position: relative;
            z-index: 5;
            width: 100%;
          }
          .header-section h1 {
            font-family: 'Playfair Display', serif;
            font-size: 6rem;
            font-weight: 700;
            color: #f59e0b; /* Gold for hero */
            text-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
            letter-spacing: 3px;
            line-height: 1.05;
            animation: textGlow 2.5s infinite ease-in-out;
          }
          @keyframes textGlow {
            0%, 100% { filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.2)); }
            50% { filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.4)); }
          }

          /* Parallax item styling */
          .parallax-item {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3rem;
            padding: 3rem;
            background-size: cover;
            background-position: center 0%;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Softer shadow */
            border-radius: 30px; /* Smoother edges */
            transform-style: preserve-3d;
            perspective: 800px;
            filter: grayscale(100%);
            margin: 1rem 0; /* Seamless spacing */
            will-change: transform, filter;
          }
          .parallax-item:hover {
            transform: scale(1.03);
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
            filter: grayscale(50%);
          }

          /* Glassmorphism Overlay */
          .parallax-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
            backdrop-filter: blur(5px);
            z-index: 1;
            transition: opacity 0.4s ease;
          }
          .parallax-item:hover::before {
            opacity: 0.85;
          }

          /* Text and Icon styling */
          .parallax-text {
            position: relative;
            z-index: 2;
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem 4rem;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-family: 'Roboto', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            text-align: center;
            transition: all 0.3s ease;
            will-change: transform;
          }
          .parallax-text:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-8px);
            border-color: #f59e0b;
          }
          .parallax-icon {
            font-size: 4rem;
            color: #ffffff;
            opacity: 0.8;
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .parallax-item:hover .parallax-icon {
            transform: scale(1.1);
            color: #f59e0b;
          }

          /* Book Now Button */
          .book-now-btn {
            padding: 1.5rem 4rem;
            font-size: 1.8rem;
            font-weight: 700;
            font-family: 'Roboto', sans-serif;
            color: #000000;
            background: #f59e0b;
            border: none;
            border-radius: 50px;
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
            will-change: transform, background;
          }
          .book-now-btn:hover {
            background: #ffffff;
            color: #f59e0b;
            transform: translateY(-6px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
          }
          .book-now-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
          }
          .book-now-btn:hover::after {
            width: 300px;
            height: 300px;
          }

          /* Dot navigation */
          .nav-dots {
            position: fixed;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            z-index: 10;
          }
          .nav-dot {
            width: 14px;
            height: 14px;
            background-color: rgba(255, 255, 255, 0.25);
            border-radius: 50%;
            cursor: pointer;
            position: relative;
            transition: all 0.4s ease;
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
          }
          .nav-dot:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: #ffffff;
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            font-size: 0.8rem;
            white-space: nowrap;
            opacity: 1;
            transition: opacity 0.3s ease;
          }
          .nav-dot::after {
            opacity: 0;
          }

          /* Responsive adjustments */
          @media (max-width: 1024px) {
            .header-section h1 {
              font-size: 5rem;
            }
            .parallax-item {
              flex-direction: column;
              min-height: 75vh;
              padding: 2.5rem;
            }
            .parallax-text {
              font-size: 2.5rem;
              padding: 1.5rem 3rem;
            }
            .book-now-btn {
              padding: 1.2rem 3rem;
              font-size: 1.6rem;
            }
          }
          @media (max-width: 768px) {
            .header-section h1 {
              font-size: 3.5rem;
            }
            .parallax-item {
              min-height: 65vh;
              padding: 2rem;
            }
            .parallax-text {
              font-size: 2rem;
              padding: 1.2rem 2.5rem;
            }
            .nav-dots {
              right: 1.5rem;
              gap: 0.8rem;
            }
            .nav-dot {
              width: 12px;
              height: 12px;
            }
            .book-now-btn {
              padding: 1rem 2.5rem;
              font-size: 1.4rem;
            }
            .parallax-icon {
              font-size: 3.5rem;
            }
          }
          @media (max-width: 480px) {
            .header-section h1 {
              font-size: 2.8rem;
            }
            .parallax-text {
              font-size: 1.6rem;
              padding: 1rem 2rem;
            }
            .book-now-btn {
              padding: 0.8rem 2rem;
              font-size: 1.2rem;
            }
            .nav-dot::after {
              font-size: 0.7rem;
              padding: 0.3rem 0.6rem;
            }
            .parallax-icon {
              font-size: 3rem;
            }
          }
        `}
      </style>
      <div className="bg-gradient min-h-screen flex flex-col items-center gap-8">
        {/* Header Section */}
        <div ref={headerRef} className="header-section">
          <h1>
            <span>W</span>
            <span>e</span>
            <span>l</span>
            <span>c</span>
            <span>o</span>
            <span>m</span>
            <span>e</span> <span>T</span>
            <span>o</span> <span>B</span>
            <span>o</span>
            <span>o</span>
            <span>k</span> <span>E</span>
            <span>t</span>
            <span>h</span>
            <span>i</span>
            <span>o</span>
            <span>p</span>
            <span>i</span>
            <span>a</span>
          </h1>
          <Button className="book-now-btn" onClick={() => navigate("/home")}>
            Book Now
          </Button>
        </div>

        {/* Scrollable Container with Parallax Items */}
        <div
          ref={container}
          className="scroll-container text-white text-center max-w-7xl w-full px-4"
        >
          {textAndImage.map((item) => (
            <div
              key={item.id}
              className={`parallax-item flex items-center justify-center gap-8 ${
                item.id % 2 === 1 ? "flex-row" : "flex-row-reverse"
              }`}
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            >
              <span className="parallax-icon">{item.icon}</span>
              <p className="parallax-text">{item.text}</p>
            </div>
          ))}
          {/* Dot Navigation */}
          <div className="nav-dots">
            {textAndImage.map((item) => (
              <div key={item.id} className="nav-dot" data-tooltip={item.text} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
