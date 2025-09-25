import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function WelcomePage() {
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useGSAP(() => {
    if (container.current) {
      gsap.from(container.current, {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 to-black flex flex-col items-center justify-center gap-12">
      <div className="min-h-screen flex flex-col items-center justify-center gap-12">
        <div className=" text-white text-7xl font-bold ">
          Welcome To Book Ethiopia
        </div>

        <Button
          variant="outline"
          className="p-6 cursor-pointer text-xl"
          onClick={() => navigate("/home")}
        >
          Book Now
        </Button>
      </div>

      <div
        ref={container}
        className="text-white text-center max-w-2xl text-5xl px-4"
      >
        Explore a world of knowledge and adventure with Book Ethiopia - Your
        gateway to endless reading possibilities!
      </div>
    </div>
  );
}

export default WelcomePage;
