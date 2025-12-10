import { useState } from "react";
import { useStore } from "@/lib/store";
import { Recipe } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddRecipeDialog() {
  const { addCustomRecipe } = useStore();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    steps: "",
    difficulty: "Easy",
    time: "",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Transform inputs into Recipe object
    const newRecipe: Recipe = {
      id: `custom-${Date.now()}`,
      title: formData.name,
      description: formData.description,
      image: formData.image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1000", // Default placeholder
      prepTime: parseInt(formData.time) || 0, // Extract number or default to 0
      difficulty: formData.difficulty as "Easy" | "Medium" | "Hard",
      ingredients: formData.ingredients.split('\n').filter(line => line.trim() !== ""),
      instructions: formData.steps.split('\n').filter(line => line.trim() !== ""),
    };

    addCustomRecipe(newRecipe);
    
    toast({
      title: "Recipe Saved!",
      description: `${newRecipe.title} has been added to your cookbook.`,
    });

    setOpen(false);
    setFormData({
      name: "",
      description: "",
      ingredients: "",
      steps: "",
      difficulty: "Easy",
      time: "",
      image: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          <Plus className="h-4 w-4" /> Add Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-y-auto rounded-[2rem] p-0 gap-0">
        <div className="px-6 pt-6 pb-4 border-b border-border/40 bg-muted/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading">Add Custom Recipe</DialogTitle>
            <DialogDescription>
              Create a new recipe to save to your cookbook.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Recipe Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Grandma's Apple Pie"
                className="rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary/20 transition-all"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Description</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Short summary of the dish..."
                className="rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary/20 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="difficulty" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Difficulty</Label>
                <Select 
                  value={formData.difficulty} 
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger className="rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary/20 transition-all">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Time (min)</Label>
                <Input
                  id="time"
                  type="number"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="e.g. 30"
                  className="rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ingredients" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Ingredients</Label>
              <Textarea
                id="ingredients"
                required
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                placeholder="One ingredient per line..."
                className="min-h-[100px] rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary/20 transition-all"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="steps" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Instructions</Label>
              <Textarea
                id="steps"
                required
                value={formData.steps}
                onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                placeholder="One step per line..."
                className="min-h-[100px] rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary/20 transition-all"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Image URL (Optional)</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="pl-9 rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary/20 transition-all"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-2">
            <Button type="submit" size="lg" className="w-full rounded-full font-bold shadow-lg shadow-primary/20">Save to Cookbook</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
