import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <UserProvider>
        <Toaster />
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
