import { Link, useLocation } from "wouter";
import { ChefHat, BookHeart, Home, Search, Battery, Wifi, Signal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Pantry", icon: Home },
    { href: "/recipes", label: "Recipes", icon: Search },
    { href: "/cookbook", label: "Cookbook", icon: BookHeart },
  ];

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 md:flex md:items-center md:justify-center md:p-8 font-sans selection:bg-primary/20">
      
      {/* Phone Frame Container */}
      <div className="relative w-full h-[100dvh] md:w-[400px] md:h-[850px] bg-background md:rounded-[3.5rem] md:shadow-2xl md:border-[12px] md:border-stone-900 overflow-hidden flex flex-col ring-1 ring-black/5 dark:ring-white/10">
        
        {/* Notch / Status Bar (Desktop Simulation Only) */}
        <div className="hidden md:flex h-12 bg-background items-center justify-between px-7 shrink-0 z-50 select-none">
           <span className="text-[13px] font-semibold w-12 text-center">9:41</span>
           <div className="h-7 w-32 bg-stone-900 rounded-b-2xl absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"></div>
           <div className="flex gap-1.5 w-12 justify-end">
             <Signal className="h-3.5 w-3.5" />
             <Wifi className="h-3.5 w-3.5" />
             <Battery className="h-3.5 w-3.5" />
           </div>
        </div>

        {/* App Content */}
        <div className="flex-1 overflow-y-auto flex flex-col relative scrollbar-hide">
            {/* Header / Nav */}
            <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/40">
                <div className="px-5 h-16 flex items-center justify-between">
                  <Link href="/">
                    <a className="flex items-center gap-2 group">
                        <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <ChefHat className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight text-foreground">
                            CookMate
                        </span>
                    </a>
                  </Link>

                  {/* Desktop-like nav links (hidden in phone view usually, but requested in PRD) */}
                  {/* Since we are in phone mode, we'll keep the top clean and rely on bottom nav, 
                      but maybe add a small profile or settings icon if needed later. 
                      For now, just the logo looks cleanest. */}
                </div>
            </header>

            <main className="flex-1 px-5 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
                {children}
            </main>
        </div>

        {/* Bottom Tab Bar - Mobile Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 border-t border-border/50 bg-background/90 backdrop-blur-xl px-6 pb-8 pt-3 flex justify-between items-center z-50">
            {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                    <Link key={item.href} href={item.href}>
                        <a className={cn(
                        "flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 w-20 active:scale-95 group",
                        isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}>
                            <div className="relative">
                                <item.icon 
                                    className={cn(
                                        "h-6 w-6 transition-all duration-300", 
                                        isActive && "fill-current opacity-20 scale-110",
                                        !isActive && "group-hover:scale-110"
                                    )} 
                                    strokeWidth={isActive ? 2.5 : 2} 
                                />
                                {isActive && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />}
                            </div>
                            <span className={cn("text-[10px] font-medium transition-colors", isActive ? "text-primary font-bold" : "")}>
                                {item.label}
                            </span>
                        </a>
                    </Link>
                );
            })}
        </nav>
        
        {/* Home Indicator (Desktop Simulation Only) */}
        <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-foreground/10 rounded-full z-[60] pointer-events-none" />

      </div>
    </div>
  );
}
