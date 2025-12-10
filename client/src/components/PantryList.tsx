import { useStore } from "@/lib/store";
import { X, Egg } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export default function PantryList() {
  const { pantry, removeIngredient } = useStore();

  if (pantry.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-border/60 rounded-3xl bg-card/30 mt-8">
        <div className="bg-secondary p-4 rounded-full mb-4">
          <Egg className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">Your pantry is empty</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Add ingredients above to start finding recipes you can cook today.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 pl-1">
        In Your Pantry ({pantry.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {pantry.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-2 pl-4 pr-2 py-2 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
            >
              <span className="font-medium text-foreground">{item.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeIngredient(item.id)}
                className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors -mr-1"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {item.name}</span>
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
