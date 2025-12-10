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

  const filteredRecipes = sortedRecipes.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = difficultyFilter === "all" || r.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-4xl text-foreground mb-1 md:mb-2">
            Suggested Recipes
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Based on your {pantry.length} pantry items
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search recipes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11 md:h-12 rounded-xl bg-card border-border/50 text-sm md:text-base"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className={cn(
                  "rounded-xl h-11 w-11 md:h-12 md:w-12 shrink-0 transition-colors", 
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pb-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="mx-auto w-full max-w-[95%] sm:max-w-none">
            <RecipeCard recipe={recipe} />
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
