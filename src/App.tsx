import { Outlet } from "react-router-dom";
import LoadingScreen from "./components/ui/LoadingScreen";

function App() {
  return (
    <>
      <LoadingScreen />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>
      <Outlet />
    </>
  );
}

export default App;
