import { useStore } from "@/lib/store";
import RecipeCard from "@/components/RecipeCard";
import { BookHeart } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import AddRecipeDialog from "@/components/AddRecipeDialog";

export default function Cookbook() {
  const { savedRecipes } = useStore();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
            <BookHeart className="h-8 w-8" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              My Cookbook
            </h1>
            <p className="text-muted-foreground">
              {savedRecipes.length} saved recipes
            </p>
          </div>
        </div>
        
        <AddRecipeDialog />
      </div>

      {savedRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card rounded-[2rem] border border-dashed border-border">
          <BookHeart className="h-16 w-16 text-muted-foreground/30 mb-6" />
          <h2 className="text-xl font-bold text-foreground mb-2">No recipes saved yet</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            When you find a recipe you love, click the heart icon to save it here for later.
          </p>
          <Link href="/recipes">
            <Button size="lg" className="rounded-full">
              Find Recipes
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
