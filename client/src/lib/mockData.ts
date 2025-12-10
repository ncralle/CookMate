import { Recipe } from './types';
import pastaImg from '@assets/stock_images/tomato_basil_pasta_e85a390f.jpg';
import stirFryImg from '@assets/stock_images/vegetable_stir_fry_6d0c31cf.jpg';
import toastImg from '@assets/stock_images/avocado_toast_with_e_9e60481d.jpg';
import chiliImg from '@assets/stock_images/hearty_bean_chili_83ce1bc4.jpg';
import potatoesImg from '@assets/stock_images/roasted_potatoes_efa3fcce.jpg';
import spinachPastaImg from '@assets/stock_images/creamy_spinach_pasta_f18cca8a.jpg';
import lemonChickenImg from '@assets/stock_images/lemon_garlic_chicken_fc5a0707.jpg';
import riceBowlImg from '@assets/stock_images/rice_bowl_with_veget_e14feb74.jpg';
import tunaSaladImg from '@assets/stock_images/tuna_salad_c8c896e6.jpg';
import tomatoPastaImg from '@assets/stock_images/tomato_pasta_0c4eeb9f.jpg';
import parfaitImg from '@assets/stock_images/yogurt_parfait_with__4bc66f04.jpg';

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
  },
  {
    id: '10',
    title: 'Creamy Spinach Pasta',
    description: 'A comforting, creamy pasta perfect for busy nights.',
    image: spinachPastaImg,
    prepTime: 20,
    difficulty: 'Easy',
    ingredients: ['Pasta', 'Spinach', 'Cream', 'Garlic'],
    instructions: [
      'Boil pasta according to package instructions.',
      'In a separate pan, sauté minced garlic and spinach until wilted.',
      'Add cream and simmer for 2-3 minutes until slightly thickened.',
      'Combine sauce with drained pasta and serve.'
    ]
  },
  {
    id: '11',
    title: 'Lemon Garlic Chicken',
    description: 'Bright, flavorful chicken made with pantry staples.',
    image: lemonChickenImg,
    prepTime: 30,
    difficulty: 'Easy',
    ingredients: ['Chicken', 'Lemon', 'Garlic', 'Salt', 'Pepper'],
    instructions: [
      'Season chicken breasts generously with salt and pepper.',
      'Heat oil in a pan over medium-high heat.',
      'Pan-sear chicken for 6-7 minutes per side until golden and cooked through.',
      'Add minced garlic and cook for 1 minute.',
      'Finish with fresh lemon juice and serve.'
    ]
  },
  {
    id: '12',
    title: 'Rice Bowl with Veggies',
    description: 'A customizable bowl using whatever you have.',
    image: riceBowlImg,
    prepTime: 15,
    difficulty: 'Easy',
    ingredients: ['Rice', 'Carrot', 'Onion', 'Soy Sauce'],
    instructions: [
      'Cook rice according to package instructions.',
      'Dice carrots and onions.',
      'Stir-fry veggies in a hot pan until tender.',
      'Serve veggies over rice and drizzle with soy sauce.'
    ]
  },
  {
    id: '13',
    title: 'Quick Tuna Salad',
    description: 'Protein-packed lunch with only a few ingredients.',
    image: tunaSaladImg,
    prepTime: 5,
    difficulty: 'Easy',
    ingredients: ['Tuna', 'Mayo', 'Lemon', 'Salt'],
    instructions: [
      'Drain tuna and place in a bowl.',
      'Mix with mayonnaise and a squeeze of lemon juice.',
      'Season with salt to taste.',
      'Serve on bread, crackers, or over greens.'
    ]
  },
  {
    id: '14',
    title: 'One-Pot Tomato Pasta',
    description: 'Everything cooks together for max flavor and minimal dishes.',
    image: tomatoPastaImg,
    prepTime: 18,
    difficulty: 'Easy',
    ingredients: ['Pasta', 'Tomatoes', 'Garlic', 'Olive Oil'],
    instructions: [
      'Add pasta, diced tomatoes, minced garlic, and olive oil to a large pot.',
      'Add enough water to just cover the ingredients.',
      'Bring to a boil and cook until pasta is al dente and water has reduced to a sauce.',
      'Stir well and serve hot.'
    ]
  },
  {
    id: '15',
    title: 'Greek Yogurt Parfait',
    description: 'A simple breakfast with fruit and crunch.',
    image: parfaitImg,
    prepTime: 3,
    difficulty: 'Easy',
    ingredients: ['Yogurt', 'Fruit', 'Honey', 'Granola'],
    instructions: [
      'Add a layer of yogurt to a glass or bowl.',
      'Add a layer of fresh or frozen fruit.',
      'Top with granola and a drizzle of honey.',
      'Repeat layers if desired and serve immediately.'
    ]
  }
];
