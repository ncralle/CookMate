import { Recipe } from "@/lib/types";
import { Link } from "wouter";
import { Clock, ChefHat, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

interface RecipeCardProps {
  recipe: Recipe;
  variant?: "default" | "compact";
}

export default function RecipeCard({ recipe, variant = "default" }: RecipeCardProps) {
  const { pantry } = useStore();
  
  // Simple matching logic
  const pantryNames = pantry.map(p => p.name.toLowerCase());
  const matchedIngredients = recipe.ingredients.filter(ing => 
    pantryNames.some(pName => ing.toLowerCase().includes(pName) || pName.includes(ing.toLowerCase()))
  );
  
  const matchCount = matchedIngredients.length;
  const totalCount = recipe.ingredients.length;
  const matchPercentage = Math.round((matchCount / totalCount) * 100);

  if (variant === "compact") {
    return (
      <Link href={`/recipe/${recipe.id}`}>
        <a className="block group h-full">
          <article className="flex bg-card rounded-[1.25rem] border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 p-2 gap-3 h-28 overflow-hidden">
            <div className="relative aspect-square h-full rounded-xl overflow-hidden shrink-0">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            
            <div className="flex flex-col flex-1 py-1 pr-1 min-w-0">
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-heading font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {recipe.title}
                </h3>
                <div className={cn(
                  "px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide shrink-0",
                  recipe.difficulty === 'Easy' ? "bg-green-100 text-green-700" :
                  recipe.difficulty === 'Medium' ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                )}>
                  {recipe.difficulty}
                </div>
              </div>
              
              <p className="text-muted-foreground text-[10px] line-clamp-2 mb-auto leading-relaxed">
                {recipe.description}
              </p>
              
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span className="text-[10px] font-medium">{recipe.prepTime}m</span>
                </div>
                
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold",
                  matchPercentage > 70 ? "text-primary" : "text-muted-foreground"
                )}>
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    matchPercentage > 70 ? "bg-primary" : "bg-muted-foreground"
                  )} />
                  {matchCount}/{totalCount}
                </div>
              </div>
            </div>
          </article>
        </a>
      </Link>
    );
  }

  return (
    <Link href={`/recipe/${recipe.id}`}>
      <a className="block group h-full">
        <article className="flex flex-col h-full overflow-hidden bg-card rounded-[1.5rem] border border-border/40 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            
            <div className="absolute top-3 right-3">
               <div className={cn(
                "px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm backdrop-blur-md border border-white/10 uppercase tracking-wide",
                recipe.difficulty === 'Easy' ? "bg-green-500/90 text-white" :
                recipe.difficulty === 'Medium' ? "bg-yellow-500/90 text-white" :
                "bg-red-500/90 text-white"
              )}>
                {recipe.difficulty}
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <div className="bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-foreground">{recipe.prepTime} min</span>
              </div>
              
              <div className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm",
                matchPercentage > 70 ? "bg-primary text-primary-foreground" : 
                matchPercentage > 40 ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
              )}>
                {matchCount}/{totalCount} items
              </div>
            </div>
          </div>
          
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-heading font-bold text-base leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
              {recipe.title}
            </h3>
            <p className="text-muted-foreground text-xs line-clamp-2 mb-3 flex-1">
              {recipe.description}
            </p>
            
            <div className="flex items-center justify-end mt-auto pt-3 border-t border-border/40">
              <span className="text-xs font-semibold text-primary flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
                View Recipe <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
}
