import { useState, useMemo } from "react";
import { useStore } from "@/lib/store";
import { mockRecipes } from "@/lib/mockData";
import RecipeCard from "@/components/RecipeCard";
import { Search, SlidersHorizontal, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Recipes() {
  const { pantry } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  
  // Sort recipes by match score
  const sortedRecipes = useMemo(() => {
    return [...mockRecipes].map(recipe => {
      const pantryNames = pantry.map(p => p.name.toLowerCase());
      const matchCount = recipe.ingredients.filter(ing => 
        pantryNames.some(pName => ing.toLowerCase().includes(pName) || pName.includes(ing.toLowerCase()))
      ).length;
      return { ...recipe, matchCount };
    }).sort((a, b) => b.matchCount - a.matchCount);
  }, [pantry]);

  const categories = [
    { id: "all", label: "All Recipes", emoji: "🍽️" },
    { id: "breakfast", label: "Breakfast", emoji: "🍳" },
    { id: "lunch", label: "Lunch", emoji: "🥗" },
    { id: "dinner", label: "Dinner", emoji: "🥘" },
    { id: "dessert", label: "Dessert", emoji: "🍰" },
    { id: "vegetarian", label: "Vegetarian", emoji: "🥬" },
  ];
  
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredRecipes = sortedRecipes.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = difficultyFilter === "all" || r.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    
    // Mock category matching (random for demo purposes if not strictly defined in type)
    // In a real app, recipe would have a 'category' field
    const matchesCategory = activeCategory === "all" || 
      (activeCategory === "vegetarian" && r.ingredients.some(i => i.toLowerCase().includes("vegetable"))) ||
      r.title.toLowerCase().includes(activeCategory) || 
      true; // Fallback to show all for demo since we don't have categories in data model yet

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground mb-1">
            Suggested Recipes
          </h1>
          <p className="text-sm text-muted-foreground">
            Based on your {pantry.length} pantry items
          </p>
        </div>
        
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-card border border-border/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search recipes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11 rounded-xl bg-card border-border/50 text-sm"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={cn(
                  "rounded-xl h-11 w-11 shrink-0 transition-colors", 
                  difficultyFilter !== "all" && "bg-primary/10 text-primary border-primary/20"
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <DropdownMenuRadioItem value="all">All Difficulties</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="easy">Easy</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="hard">Hard</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="w-full">
            <RecipeCard recipe={recipe} variant="compact" />
          </div>
        ))}
      </div>
      
      {filteredRecipes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No recipes found. Try adding more ingredients to your pantry or adjusting filters!</p>
        </div>
      )}
    </div>
  );
}
