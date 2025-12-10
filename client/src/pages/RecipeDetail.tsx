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
  const recipe = mockRecipes.find((r) => r.id === id);
  
  const { toggleSaveRecipe, isSaved, pantry } = useStore();
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
    <div className="max-w-4xl mx-auto pb-20">
      <Link href="/recipes">
        <a className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Recipes
        </a>
      </Link>

      <div className="bg-card rounded-[2.5rem] overflow-hidden shadow-sm border border-border/50">
        <div className="relative h-64 md:h-96 w-full">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3 border border-white/10">
                  {recipe.difficulty} • {recipe.prepTime} min
                </span>
                <h1 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
                  {recipe.title}
                </h1>
              </div>
              
              <Button 
                onClick={() => toggleSaveRecipe(recipe)}
                className={cn(
                  "rounded-full h-12 px-6 transition-all duration-300",
                  saved 
                    ? "bg-red-500 hover:bg-red-600 text-white border-none" 
                    : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30"
                )}
              >
                <Heart className={cn("mr-2 h-5 w-5", saved && "fill-current")} />
                {saved ? "Saved to Cookbook" : "Save Recipe"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 p-8 md:p-10">
          {/* Ingredients Column */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-2">
              <span className="bg-secondary p-2 rounded-xl text-secondary-foreground">
                <ChefHat className="h-5 w-5" />
              </span>
              Ingredients
            </h2>
            
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => {
                const hasItem = checkIngredientMatch(ingredient);
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl transition-colors",
                      hasItem ? "bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30" : "bg-muted/30 border border-transparent"
                    )}
                  >
                    <div className={cn(
                      "h-2 w-2 rounded-full shrink-0",
                      hasItem ? "bg-green-500" : "bg-muted-foreground/30"
                    )} />
                    <span className={cn("text-sm font-medium", hasItem ? "text-green-900 dark:text-green-100" : "text-muted-foreground")}>
                      {ingredient}
                    </span>
                    {hasItem && <span className="ml-auto text-[10px] font-bold text-green-600 uppercase tracking-wide bg-green-100 px-2 py-0.5 rounded-full">Have</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions Column */}
          <div>
            <h2 className="font-heading font-bold text-2xl mb-6 flex items-center gap-2">
              <span className="bg-primary/10 p-2 rounded-xl text-primary">
                <Clock className="h-5 w-5" />
              </span>
              Instructions
            </h2>
            
            <div className="space-y-6">
              {recipe.instructions.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                return (
                  <div 
                    key={index} 
                    onClick={() => toggleStep(index)}
                    className={cn(
                      "flex gap-4 group cursor-pointer",
                      isCompleted ? "opacity-50" : "opacity-100"
                    )}
                  >
                    <div className="shrink-0 mt-0.5">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                        isCompleted 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : "border-muted-foreground/30 text-muted-foreground group-hover:border-primary group-hover:text-primary"
                      )}>
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <span className="font-bold text-sm">{index + 1}</span>}
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className={cn(
                        "text-lg leading-relaxed transition-all duration-300",
                        isCompleted ? "line-through text-muted-foreground" : "text-foreground"
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
    </div>
  );
}
