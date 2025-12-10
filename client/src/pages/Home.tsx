import { Link } from "wouter";
import { ArrowRight, ChefHat } from "lucide-react";
import IngredientInput from "@/components/IngredientInput";
import PantryList from "@/components/PantryList";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/fresh_ingredients_flat_lay.png";

export default function Home() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] bg-stone-900 text-white shadow-xl mx-0">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Fresh ingredients" 
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 px-5 py-8 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-medium tracking-wide uppercase text-white/90">Reduce Waste, Cook Better</span>
          </div>
          
          <h1 className="font-heading font-extrabold text-3xl leading-tight mb-4 tracking-tight pr-2">
            Turn your pantry into <span className="text-primary-foreground">dinner.</span>
          </h1>
          
          <p className="text-base text-white/80 mb-6 leading-relaxed pr-2">
            Don't know what to cook? Tell us what ingredients you have, and we'll find delicious recipes you can make right now.
          </p>
          
          <Link href="/recipes">
            <Button size="lg" className="rounded-full px-6 h-12 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto">
              Find Recipes <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Pantry Section */}
      <section className="max-w-3xl mx-auto px-0">
        <div className="text-center mb-6">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">What's in your kitchen?</h2>
          <p className="text-sm text-muted-foreground">Add ingredients you have on hand to get personalized suggestions.</p>
        </div>
        
        <div className="bg-card rounded-[1.5rem] p-5 shadow-sm border border-border/50">
          <div className="flex flex-col items-center">
            <IngredientInput />
            <div className="w-full">
              <PantryList />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
           <Link href="/recipes">
            <Button variant="outline" className="rounded-full border-2 h-12 px-6 font-semibold hover:bg-secondary/50 hover:border-secondary-foreground/20">
              <ChefHat className="mr-2 h-4 w-4" />
              See what I can cook
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
