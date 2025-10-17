"use client";

import { AudioPlayerProvider } from "@/components/songs/AudioPlayerProvider";
import { TooltipProvider } from "../ui/tooltip";
import Footer from "./Footer";
import Navigation from "./Navigation";

const AppShell = ({ children }) => {
  return (
    <TooltipProvider>
      <AudioPlayerProvider>
        <Navigation />
        {children}
        <Footer />
      </AudioPlayerProvider>
    </TooltipProvider>
  );
};
export default AppShell;
