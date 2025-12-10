import { useState } from "react";
import { useStore } from "@/lib/store";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function IngredientInput() {
  const [value, setValue] = useState("");
  const addIngredient = useStore((state) => state.addIngredient);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      addIngredient(value.trim());
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md items-center">
      <div className="relative flex-1 group">
        <Input
          type="text"
          placeholder="Add an ingredient (e.g. Eggs)..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-12 rounded-full border-border bg-card/50 shadow-sm focus-visible:ring-primary/20 text-base pl-5 transition-all focus:bg-card"
        />
      </div>
      <Button 
        type="submit" 
        disabled={!value.trim()}
        size="icon"
        className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shrink-0"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add</span>
      </Button>
    </form>
  );
}
