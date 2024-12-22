import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <h1 className="text-6xl font-extrabold mb-6 text-white text-center">
        Hello world!
      </h1>
      <p className="text-2xl mb-8 text-white text-center max-w-lg bg-gray-100 bg-opacity-20 shadow-sm py-2 rounded-full">
        Try out the anonymous messaging app
      </p>
      <div className="flex space-x-4">
        <Button
          asChild
          variant={"secondary"}
          className=" text-purple-500 "
          size={"lg"}
        >
          <Link to="/login">Login</Link>
        </Button>
        <Button
          asChild
          variant={"secondary"}
          className=" text-pink-500 "
          size={"lg"}
        >
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
