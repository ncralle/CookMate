import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { mockRecipes } from "@/lib/mockData";
import { useStore } from "@/lib/store";
import { Clock, ChefHat, Heart, ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export default function RecipeDetail() {
  const [, params] = useRoute("/recipe/:id");
  const id = params?.id;
  
  const { toggleSaveRecipe, isSaved, pantry, savedRecipes } = useStore();
  
  // Find recipe in mock data OR saved custom recipes
  const recipe = mockRecipes.find((r) => r.id === id) || savedRecipes.find((r) => r.id === id);
  
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!recipe) return <div className="p-8 text-center">Recipe not found</div>;

  const saved = isSaved(recipe.id);
  
  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Check ingredient matches
  const pantryNames = pantry.map(p => p.name.toLowerCase());
  const checkIngredientMatch = (ingredient: string) => {
    return pantryNames.some(pName => ingredient.toLowerCase().includes(pName) || pName.includes(ingredient.toLowerCase()));
  };

  return (
    <div className="w-full pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Image Card */}
      <div className="relative h-[40vh] w-full rounded-[2rem] overflow-hidden shadow-lg mb-6 group">
        <Link href="/recipes">
          <a className="absolute top-4 left-4 z-20 bg-background/20 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-background/40 transition-colors border border-white/20">
            <ArrowLeft className="h-5 w-5" />
          </a>
        </Link>
        
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border border-white/20 backdrop-blur-md",
              recipe.difficulty === 'Easy' ? "bg-green-500/80" : 
              recipe.difficulty === 'Medium' ? "bg-yellow-500/80" : "bg-red-500/80"
            )}>
              {recipe.difficulty}
            </span>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/20 backdrop-blur-md border border-white/20">
              <Clock className="h-3 w-3" /> {recipe.prepTime} min
            </span>
          </div>
          
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl leading-tight mb-2 text-shadow-sm">
            {recipe.title}
          </h1>

          <p className="text-sm font-medium text-white/90 line-clamp-2 mb-4 leading-relaxed max-w-[90%] drop-shadow-sm">
            {recipe.description}
          </p>
          
          <Button 
            onClick={() => toggleSaveRecipe(recipe)}
            size="sm"
            className={cn(
              "rounded-full h-10 px-5 font-bold text-xs shadow-lg backdrop-blur-md border transition-all duration-300 active:scale-95",
              saved 
                ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90" 
                : "bg-white/20 text-white border-white/40 hover:bg-white/30"
            )}
          >
            <Heart className={cn("mr-1.5 h-4 w-4", saved && "fill-current")} />
            {saved ? "Saved" : "Save Recipe"}
          </Button>
        </div>
      </div>

      <div className="space-y-8 px-1">
        {/* Ingredients Section */}
        <div className="bg-card rounded-[2rem] p-6 border border-border/50 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-xl flex items-center gap-2">
              <span className="bg-secondary/50 p-1.5 rounded-lg text-secondary-foreground">
                <ChefHat className="h-5 w-5" />
              </span>
              Ingredients
            </h2>
            <span className="text-xs font-medium text-muted-foreground bg-secondary/30 px-2 py-1 rounded-full">
              {recipe.ingredients.length} items
            </span>
          </div>
          
          <div className="grid gap-2.5">
            {recipe.ingredients.map((ingredient, index) => {
              const hasItem = checkIngredientMatch(ingredient);
              return (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all border",
                    hasItem 
                      ? "bg-green-50/80 border-green-100 dark:bg-green-900/20 dark:border-green-900/30" 
                      : "bg-muted/20 border-transparent"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center h-5 w-5 rounded-full shrink-0 border",
                    hasItem 
                      ? "bg-green-500 border-green-600 text-white" 
                      : "bg-muted border-muted-foreground/30 text-transparent"
                  )}>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className={cn(
                    "text-sm font-medium leading-tight", 
                    hasItem ? "text-green-900 dark:text-green-100" : "text-foreground"
                  )}>
                    {ingredient}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions Section */}
        <div>
          <h2 className="font-heading font-bold text-xl mb-4 flex items-center gap-2 px-2">
            <span className="bg-primary/10 p-1.5 rounded-lg text-primary">
              <Clock className="h-5 w-5" />
            </span>
            Instructions
          </h2>
          
          <div className="space-y-4">
            {recipe.instructions.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              return (
                <div 
                  key={index} 
                  onClick={() => toggleStep(index)}
                  className={cn(
                    "flex gap-4 p-4 rounded-[1.5rem] cursor-pointer transition-all border border-transparent hover:border-border/60 hover:shadow-sm active:scale-[0.99]",
                    isCompleted ? "bg-muted/30" : "bg-card border-border/30 shadow-sm"
                  )}
                >
                  <div className="shrink-0">
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-all duration-300 shadow-sm",
                      isCompleted 
                        ? "bg-primary text-primary-foreground scale-110" 
                        : "bg-secondary text-secondary-foreground"
                    )}>
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                    </div>
                  </div>
                  <div className="pt-0.5">
                    <p className={cn(
                      "text-sm sm:text-base leading-relaxed transition-all duration-300",
                      isCompleted ? "text-muted-foreground line-through decoration-primary/30" : "text-foreground"
                    )}>
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
