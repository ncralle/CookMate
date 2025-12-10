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
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Add an ingredient (e.g., Eggs, Rice)..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-10 h-12 rounded-2xl border-border bg-card shadow-sm focus-visible:ring-primary/20 text-base"
        />
      </div>
      <Button 
        type="submit" 
        disabled={!value.trim()}
        className="h-12 w-12 rounded-2xl p-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add</span>
      </Button>
    </form>
  );
}
