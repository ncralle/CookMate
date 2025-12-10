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
import { Plus } from "lucide-react";
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
        <Button className="rounded-full gap-2">
          <Plus className="h-4 w-4" /> Add New Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Custom Recipe</DialogTitle>
          <DialogDescription>
            Create a new recipe to save to your cookbook.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Recipe Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Grandma's Apple Pie"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short summary of the dish..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select 
                value={formData.difficulty} 
                onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger>
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
              <Label htmlFor="time">Time (min)</Label>
              <Input
                id="time"
                type="number"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g. 30"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ingredients">Ingredients (one per line)</Label>
            <Textarea
              id="ingredients"
              required
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              placeholder="2 cups flour&#10;1 tsp salt&#10;..."
              className="min-h-[100px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="steps">Steps (one per line)</Label>
            <Textarea
              id="steps"
              required
              value={formData.steps}
              onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
              placeholder="1. Mix dry ingredients&#10;2. Add water&#10;..."
              className="min-h-[100px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save Recipe</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
