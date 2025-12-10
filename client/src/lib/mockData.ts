import { Recipe } from './types';
import pastaImg from '@assets/stock_images/tomato_basil_pasta_e85a390f.jpg';
import stirFryImg from '@assets/stock_images/vegetable_stir_fry_6d0c31cf.jpg';
import toastImg from '@assets/stock_images/avocado_toast_with_e_9e60481d.jpg';
import chiliImg from '@assets/stock_images/hearty_bean_chili_83ce1bc4.jpg';
import potatoesImg from '@assets/stock_images/roasted_potatoes_efa3fcce.jpg';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Easy Tomato Basil Pasta',
    description: 'A classic 15-minute meal using simple pantry staples.',
    image: pastaImg,
    prepTime: 15,
    difficulty: 'Easy',
    ingredients: ['Pasta', 'Tomato Sauce', 'Basil', 'Olive Oil', 'Garlic'],
    instructions: [
      'Boil a pot of salted water and cook pasta according to package instructions.',
      'In a separate pan, heat olive oil and sauté minced garlic until fragrant.',
      'Pour in tomato sauce and simmer for 5 minutes.',
      'Drain pasta and toss with the sauce.',
      'Top with fresh basil and serve.'
    ]
  },
  {
    id: '2',
    title: 'Vegetable Stir-Fry',
    description: 'Use up whatever veggies you have in this quick stir-fry.',
    image: stirFryImg,
    prepTime: 20,
    difficulty: 'Easy',
    ingredients: ['Rice', 'Carrots', 'Broccoli', 'Soy Sauce', 'Ginger', 'Eggs'],
    instructions: [
      'Cook rice according to package instructions.',
      'Chop vegetables into bite-sized pieces.',
      'Heat oil in a wok or large pan over high heat.',
      'Add vegetables and stir-fry for 5-7 minutes until tender-crisp.',
      'Push veggies to the side, scramble eggs in the empty space, then mix.',
      'Stir in soy sauce and ginger. Serve over rice.'
    ]
  },
  {
    id: '3',
    title: 'Avocado Toast with Egg',
    description: 'A nutritious and filling breakfast or lunch.',
    image: toastImg,
    prepTime: 10,
    difficulty: 'Easy',
    ingredients: ['Bread', 'Avocado', 'Eggs', 'Salt', 'Pepper', 'Chili Flakes'],
    instructions: [
      'Toast the bread to your liking.',
      'Mash avocado with salt and pepper.',
      'Fry or poach an egg.',
      'Spread avocado on toast, top with egg, and sprinkle with chili flakes.'
    ]
  },
  {
    id: '4',
    title: 'Hearty Bean Chili',
    description: 'A warm comfort food perfect for cold nights.',
    image: chiliImg,
    prepTime: 45,
    difficulty: 'Medium',
    ingredients: ['Beans', 'Tomato Paste', 'Onion', 'Chili Powder', 'Cumin', 'Vegetable Broth'],
    instructions: [
      'Sauté chopped onions in a large pot until soft.',
      'Add spices and tomato paste, cook for 1 minute.',
      'Add beans and broth. Bring to a boil, then simmer for 30 minutes.',
      'Serve hot, optionally topped with cheese or sour cream.'
    ]
  },
  {
    id: '5',
    title: 'Garlic Butter Roasted Potatoes',
    description: 'Crispy on the outside, fluffy on the inside.',
    image: potatoesImg,
    prepTime: 40,
    difficulty: 'Easy',
    ingredients: ['Potatoes', 'Butter', 'Garlic', 'Parsley', 'Salt'],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Cut potatoes into cubes.',
      'Toss potatoes with melted butter, minced garlic, and salt.',
      'Roast for 30-35 minutes until golden brown, flipping halfway.',
      'Garnish with fresh parsley.'
    ]
  }
];
