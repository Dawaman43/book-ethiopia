import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 to-black flex flex-col items-center justify-center gap-12">
      <div className=" text-white text-7xl font-bold ">
        Welcome To Book Ethiopia
      </div>

      <Button
        variant="outline"
        className="p-6 cursor-pointer text-xl"
        onClick={() => navigate("/home")}
      >
        Explore
      </Button>
    </div>
  );
}

export default WelcomePage;
