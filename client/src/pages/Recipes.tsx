import { useState, useMemo } from "react";
import { useStore } from "@/lib/store";
import { mockRecipes } from "@/lib/mockData";
import RecipeCard from "@/components/RecipeCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Recipes() {
  const { pantry } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  
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

  const filteredRecipes = sortedRecipes.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
            Suggested Recipes
          </h1>
          <p className="text-muted-foreground">
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
              className="pl-9 rounded-xl bg-card border-border/50"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl shrink-0">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      
      {filteredRecipes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No recipes found. Try adding more ingredients to your pantry!</p>
        </div>
      )}
    </div>
  );
}
