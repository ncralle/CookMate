import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings, Eye, Type, MousePointerClick, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function SettingsDialog() {
  const [fontSize, setFontSize] = useState([100]);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply font size scaling (mock implementation for prototype)
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize[0] / 100 * 16}px`;
  }, [fontSize]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[350px] rounded-[2rem] gap-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-heading">
            <Settings className="h-5 w-5 text-primary" />
            App Settings
          </DialogTitle>
          <DialogDescription>
            Customize your viewing experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appearance Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Eye className="h-3.5 w-3.5" /> Appearance
            </h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-base font-medium">Dark Mode</Label>
              <div className="flex items-center gap-2">
                <Sun className="h-3.5 w-3.5 text-muted-foreground" />
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="text-base font-medium">High Contrast</Label>
              <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
            </div>
          </div>

          <div className="h-px bg-border/50" />

          {/* Accessibility Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Type className="h-3.5 w-3.5" /> Typography
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-base font-medium">Text Size</Label>
                <span className="text-sm text-muted-foreground font-mono">{fontSize}%</span>
              </div>
              <Slider 
                value={fontSize} 
                onValueChange={setFontSize} 
                min={75} 
                max={150} 
                step={5} 
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground px-1">
                <span>A</span>
                <span className="text-sm">A</span>
                <span className="text-base">A</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-border/50" />

          {/* Interaction Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <MousePointerClick className="h-3.5 w-3.5" /> Interaction
            </h4>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="text-base font-medium">Reduced Motion</Label>
              <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
