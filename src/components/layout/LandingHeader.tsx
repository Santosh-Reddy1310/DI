import { Home, Info, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export function LandingHeader() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Details", url: "/#details", icon: Info },
    { name: "Contact", url: "/#contact", icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container flex h-20 items-center justify-center">
        <NavBar items={navItems} />
      </div>
    </header>
  );
}
