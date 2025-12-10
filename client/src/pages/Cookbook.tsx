import { useStore } from "@/lib/store";
import RecipeCard from "@/components/RecipeCard";
import { BookHeart } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import AddRecipeDialog from "@/components/AddRecipeDialog";

export default function Cookbook() {
  const { savedRecipes } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <h1 className="font-heading font-bold text-2xl text-foreground leading-tight">
            My Cookbook
          </h1>
          <p className="text-sm text-muted-foreground">
            {savedRecipes.length} saved recipes
          </p>
        </div>
        
        <div className="shrink-0">
          <AddRecipeDialog />
        </div>
      </div>

      {savedRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-card rounded-[1.5rem] border border-dashed border-border/60">
          <div className="bg-secondary/50 p-3 rounded-full mb-4">
            <BookHeart className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">No recipes yet</h2>
          <p className="text-sm text-muted-foreground max-w-[200px] mb-6 leading-relaxed">
            Save recipes you love or add your own creations.
          </p>
          <Link href="/recipes">
            <Button className="rounded-full px-6 h-10 text-sm shadow-sm">
              Find Recipes
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {savedRecipes.map((recipe) => (
            <div key={recipe.id} className="w-full">
              <RecipeCard recipe={recipe} variant="compact" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
