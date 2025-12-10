import { useStore } from "@/lib/store";
import { X, Egg, Carrot, Beef, Wheat, Milk, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const getRandomIcon = (name: string) => {
  const icons = [Carrot, Beef, Wheat, Milk, Leaf, Egg];
  // Simple hash to get a consistent icon for the same name
  const index = name.length % icons.length;
  return icons[index];
};

const getRandomColor = (name: string) => {
  const colors = [
    "bg-orange-100 text-orange-700 border-orange-200",
    "bg-green-100 text-green-700 border-green-200",
    "bg-yellow-100 text-yellow-800 border-yellow-200",
    "bg-red-100 text-red-700 border-red-200",
    "bg-stone-100 text-stone-700 border-stone-200",
    "bg-amber-100 text-amber-800 border-amber-200",
  ];
  const index = name.length % colors.length;
  return colors[index];
};

export default function PantryList() {
  const { pantry, removeIngredient } = useStore();

  if (pantry.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-border/60 rounded-3xl bg-card/30 mt-8">
        <div className="bg-secondary p-4 rounded-full mb-4 animate-bounce duration-[3000ms]">
          <Egg className="h-8 w-8 text-secondary-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">Your pantry is empty</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Add ingredients above to start finding recipes you can cook today.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          In Your Pantry ({pantry.length})
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence>
          {pantry.map((item) => {
            const Icon = getRandomIcon(item.name);
            const colorClass = getRandomColor(item.name);
            
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className={`group relative flex flex-col items-center justify-center p-4 rounded-[1.25rem] border shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${colorClass}`}
              >
                <div className="mb-2 p-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-heading font-bold text-sm text-center line-clamp-1 w-full">
                  {item.name}
                </span>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredient(item.id)}
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-white/50 hover:bg-white text-current opacity-0 group-hover:opacity-100 transition-all scale-90 hover:scale-100"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {item.name}</span>
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
