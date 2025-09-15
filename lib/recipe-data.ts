export interface Recipe {
  id: string
  name: string
  description: string
  image: string
  cookTime: string
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  ingredients: string[]
  instructions: string[]
  tips?: string[]
  nutritionInfo?: {
    calories: number
    protein: string
    carbs: string
    fat: string
  }
}

export const riceRecipes: Recipe[] = [
  {
    id: 'vegetable-mushroom-pulao',
    name: 'Vegetable Mushroom Pulao',
    description: 'A fragrant and flavorful rice dish with mixed vegetables and fresh mushrooms, perfect for a wholesome meal.',
    image: 'https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/vegetable-mushroom-pulao',
    cookTime: '30 mins',
    servings: 4,
    difficulty: 'Medium',
    category: 'Main Course',
    ingredients: [
      '2 cups Basmati rice',
      '200g mixed mushrooms, sliced',
      '1 large onion, sliced',
      '1 cup mixed vegetables (carrots, beans, peas)',
      '3-4 green cardamom pods',
      '2 bay leaves',
      '1 cinnamon stick',
      '4 cloves',
      '2 tbsp ghee or oil',
      '1 tsp cumin seeds',
      '1 tsp ginger-garlic paste',
      '2 green chilies, slit',
      '1/2 tsp turmeric powder',
      '1 tsp garam masala',
      'Salt to taste',
      '3 cups water or vegetable stock',
      'Fresh coriander leaves for garnish'
    ],
    instructions: [
      'Wash and soak basmati rice for 30 minutes, then drain.',
      'Heat ghee in a heavy-bottomed pot. Add whole spices (cardamom, bay leaves, cinnamon, cloves) and cumin seeds.',
      'Add sliced onions and sauté until golden brown.',
      'Add ginger-garlic paste and green chilies. Cook for 1 minute.',
      'Add mushrooms and cook until they release water and become tender.',
      'Add mixed vegetables, turmeric, and salt. Cook for 3-4 minutes.',
      'Add the soaked rice and gently mix. Add garam masala.',
      'Pour hot water or stock. The liquid should be 1 inch above the rice level.',
      'Bring to a boil, then reduce heat to low, cover and cook for 18-20 minutes.',
      'Let it rest for 5 minutes before opening. Gently mix and garnish with coriander.',
      'Serve hot with raita and pickle.'
    ],
    tips: [
      'Use aged basmati rice for best results',
      'Don\'t stir too much while cooking to avoid breaking rice grains',
      'You can add cashews and raisins for extra richness'
    ],
    nutritionInfo: {
      calories: 320,
      protein: '8g',
      carbs: '58g',
      fat: '6g'
    }
  },
  {
    id: 'rajma-chawal',
    name: 'Rajma Chawal',
    description: 'Classic North Indian comfort food - kidney beans curry served with steamed basmati rice.',
    image: 'https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/rajma-chawal',
    cookTime: '45 mins',
    servings: 4,
    difficulty: 'Medium',
    category: 'Main Course',
    ingredients: [
      '2 cups Basmati rice',
      '1 cup dried kidney beans (rajma), soaked overnight',
      '2 large onions, finely chopped',
      '3 tomatoes, pureed',
      '1 tbsp ginger-garlic paste',
      '2 green chilies, chopped',
      '1 tsp cumin seeds',
      '1 tsp coriander powder',
      '1/2 tsp turmeric powder',
      '1 tsp red chili powder',
      '1 tsp garam masala',
      '3 tbsp oil or ghee',
      'Salt to taste',
      'Fresh coriander for garnish',
      '1 bay leaf'
    ],
    instructions: [
      'Pressure cook soaked rajma with salt and bay leaf for 4-5 whistles until tender.',
      'Cook basmati rice separately with whole spices until fluffy. Keep warm.',
      'Heat oil in a pan. Add cumin seeds and let them splutter.',
      'Add chopped onions and cook until golden brown.',
      'Add ginger-garlic paste and green chilies. Cook for 2 minutes.',
      'Add tomato puree and cook until oil separates.',
      'Add all dry spices and cook for 1 minute.',
      'Add cooked rajma with its liquid. Simmer for 15-20 minutes.',
      'Mash some beans to thicken the gravy. Adjust consistency with water.',
      'Garnish with fresh coriander and serve hot with rice.',
      'Accompany with pickle, papad, and onion rings.'
    ],
    tips: [
      'Soak rajma overnight for better cooking',
      'Add a pinch of baking soda while pressure cooking for softer beans',
      'The gravy should be thick but not dry'
    ],
    nutritionInfo: {
      calories: 380,
      protein: '14g',
      carbs: '65g',
      fat: '8g'
    }
  },
  {
    id: 'rice-kheer',
    name: 'Rice Kheer',
    description: 'Creamy and aromatic rice pudding made with milk, sugar, and cardamom - a perfect Indian dessert.',
    image: 'https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/rice-kheer',
    cookTime: '40 mins',
    servings: 6,
    difficulty: 'Easy',
    category: 'Dessert',
    ingredients: [
      '1/2 cup Basmati rice',
      '1 liter full-fat milk',
      '1/2 cup sugar (adjust to taste)',
      '4-5 green cardamom pods, crushed',
      '10-12 almonds, chopped',
      '10-12 pistachios, chopped',
      '2 tbsp raisins',
      '1 tbsp ghee',
      '1/4 tsp cardamom powder',
      'A pinch of saffron soaked in 2 tbsp warm milk',
      '1/2 tsp rose water (optional)'
    ],
    instructions: [
      'Wash and soak rice for 30 minutes. Drain and set aside.',
      'Heat ghee in a heavy-bottomed pan. Add soaked rice and roast for 2-3 minutes.',
      'Add milk and bring to a boil. Reduce heat and simmer.',
      'Cook stirring occasionally until rice is completely soft and milk reduces to half.',
      'Add sugar and crushed cardamom. Mix well and cook for 5 more minutes.',
      'Add half of the chopped nuts and raisins. Cook for 2 minutes.',
      'Add saffron milk and cardamom powder. Mix gently.',
      'Add rose water if using. Cook for another 2 minutes.',
      'Garnish with remaining nuts and serve warm or chilled.',
      'The kheer will thicken as it cools, so adjust consistency accordingly.'
    ],
    tips: [
      'Use full-fat milk for creamy texture',
      'Stir occasionally to prevent sticking',
      'Can be stored in refrigerator for 2-3 days'
    ],
    nutritionInfo: {
      calories: 280,
      protein: '8g',
      carbs: '45g',
      fat: '8g'
    }
  },
  {
    id: 'poha',
    name: 'Poha',
    description: 'Light and nutritious flattened rice breakfast dish with onions, potatoes, and aromatic spices.',
    image: 'https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/poha',
    cookTime: '15 mins',
    servings: 3,
    difficulty: 'Easy',
    category: 'Breakfast',
    ingredients: [
      '2 cups thick poha (flattened rice)',
      '2 medium potatoes, diced small',
      '1 large onion, chopped',
      '2 green chilies, chopped',
      '1 tsp ginger, minced',
      '8-10 curry leaves',
      '1/2 tsp mustard seeds',
      '1/2 tsp cumin seeds',
      '1/4 tsp turmeric powder',
      '1/2 tsp red chili powder',
      '2 tbsp oil',
      'Salt to taste',
      '2 tbsp roasted peanuts',
      'Fresh coriander leaves',
      'Lemon juice from 1 lemon',
      '1 tbsp sugar (optional)'
    ],
    instructions: [
      'Rinse poha in a colander under cold water until soft. Drain well and set aside.',
      'Heat oil in a large pan. Add mustard seeds and let them splutter.',
      'Add cumin seeds, curry leaves, and green chilies.',
      'Add diced potatoes and cook until golden and crispy.',
      'Add chopped onions and ginger. Cook until onions are translucent.',
      'Add turmeric and red chili powder. Mix well.',
      'Add the drained poha gently. Mix carefully without mashing.',
      'Add salt, sugar, and roasted peanuts. Mix gently.',
      'Cook for 2-3 minutes until heated through.',
      'Add lemon juice and fresh coriander. Mix and serve immediately.',
      'Garnish with more coriander and serve with hot tea.'
    ],
    tips: [
      'Don\'t over-rinse poha or it will become mushy',
      'Add vegetables like carrots and beans for variation',
      'Serve immediately for best texture'
    ],
    nutritionInfo: {
      calories: 220,
      protein: '4g',
      carbs: '35g',
      fat: '8g'
    }
  },
//   {
//     id: 'moong-khichdi',
//     name: 'Moong Khichdi',
//     description: 'Wholesome and comforting one-pot meal made with rice and yellow lentils, perfect for easy digestion.',
//     image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&h=400&fit=crop&q=80&fm=webp',
//     cookTime: '25 mins',
//     servings: 4,
//     difficulty: 'Easy',
//     category: 'Main Course',
//     ingredients: [
//       '1 cup Basmati rice',
//       '1/2 cup yellow moong dal (split)',
//       '1 tbsp ghee',
//       '1 tsp cumin seeds',
//       '1 inch ginger, minced',
//       '2 green chilies, slit',
//       '1/4 tsp turmeric powder',
//       '1/4 tsp asafoetida (hing)',
//       'Salt to taste',
//       '4-5 cups water',
//       '1 tbsp ghee for tempering',
//       'Fresh coriander leaves',
//       'Black pepper powder to taste'
//     ],
//     instructions: [
//       'Wash rice and moong dal together until water runs clear. Soak for 15 minutes.',
//       'Heat ghee in a pressure cooker. Add cumin seeds and let them splutter.',
//       'Add ginger, green chilies, and asafoetida. Sauté for 30 seconds.',
//       'Add turmeric powder and the soaked rice-dal mixture.',
//       'Add salt and water. The consistency should be like thick soup.',
//       'Pressure cook for 3 whistles. Let pressure release naturally.',
//       'Mash lightly with the back of a spoon for desired consistency.',
//       'Heat ghee in a small pan for tempering. Add cumin seeds.',
//       'Pour the tempering over khichdi and mix gently.',
//       'Garnish with coriander and black pepper.',
//       'Serve hot with yogurt, pickle, or ghee.'
//     ],
//     tips: [
//       'Adjust water quantity for desired consistency',
//       'Can add vegetables like carrots and peas',
//       'Perfect comfort food when feeling unwell'
//     ],
//     nutritionInfo: {
//       calories: 260,
//       protein: '12g',
//       carbs: '48g',
//       fat: '6g'
//     }
//   },
  {
    id: 'vegetable-biryani',
    name: 'Vegetable Biryani',
    description: 'Aromatic and flavorful layered rice dish with mixed vegetables, herbs, and traditional biryani spices.',
    image: 'https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/vegetable-biryani',
    cookTime: '60 mins',
    servings: 6,
    difficulty: 'Hard',
    category: 'Main Course',
    ingredients: [
      '3 cups Basmati rice',
      '2 cups mixed vegetables (cauliflower, carrots, beans, peas)',
      '2 large onions, thinly sliced',
      '1 cup yogurt, whisked',
      '1/2 cup mint leaves',
      '1/2 cup coriander leaves',
      '1 tbsp ginger-garlic paste',
      '4 green chilies, slit',
      '1 tsp red chili powder',
      '1/2 tsp turmeric powder',
      '1 tsp garam masala',
      '4 tbsp ghee + oil for frying',
      'Whole spices: 4 cardamom, 2 bay leaves, 1 cinnamon stick, 4 cloves',
      '1/4 cup cashews and raisins',
      'Saffron soaked in 1/4 cup warm milk',
      'Salt to taste'
    ],
    instructions: [
      'Soak basmati rice for 30 minutes. Boil with whole spices and salt until 70% cooked.',
      'Deep fry sliced onions until golden brown. Reserve half for garnish.',
      'Marinate vegetables with yogurt, ginger-garlic paste, and spices for 30 minutes.',
      'Cook marinated vegetables until tender. Add fried onions and half the herbs.',
      'In a heavy-bottomed pot, layer the vegetable curry at the bottom.',
      'Layer the partially cooked rice over vegetables.',
      'Sprinkle remaining fried onions, herbs, cashews, raisins, and saffron milk.',
      'Dot with ghee and cover with aluminum foil, then the lid.',
      'Cook on high heat for 3-4 minutes, then reduce to lowest heat for 45 minutes.',
      'Let it rest for 10 minutes before opening.',
      'Gently mix and serve with raita, boiled eggs, and shorba.'
    ],
    tips: [
      'Use aged basmati rice for best results',
      'Don\'t fully cook rice in the first step',
      'The dum cooking process is crucial for authentic flavor'
    ],
    nutritionInfo: {
      calories: 420,
      protein: '10g',
      carbs: '72g',
      fat: '12g'
    }
  },
  {
    id: 'south-indian-basmati-rice',
    name: 'South Indian Basmati Rice',
    description: 'Fragrant basmati rice tempered with curry leaves, mustard seeds, and South Indian spices.',
    image: 'https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/south-indian-basmati-rice',
    cookTime: '20 mins',
    servings: 4,
    difficulty: 'Easy',
    category: 'Main Course',
    ingredients: [
      '2 cups Basmati rice',
      '3 tbsp coconut oil or ghee',
      '1 tsp mustard seeds',
      '1 tsp cumin seeds',
      '2 dry red chilies',
      '15-20 curry leaves',
      '1 inch ginger, minced',
      '2 green chilies, slit',
      '1/4 tsp turmeric powder',
      '1/4 tsp asafoetida (hing)',
      '1/4 cup cashews',
      '2 tbsp grated coconut (optional)',
      'Salt to taste',
      '3.5 cups water',
      'Fresh coriander leaves'
    ],
    instructions: [
      'Wash basmati rice until water runs clear. Soak for 15 minutes and drain.',
      'Heat coconut oil in a heavy-bottomed pot.',
      'Add mustard seeds and cumin seeds. Let them splutter.',
      'Add dry red chilies, curry leaves, and cashews. Fry until cashews are golden.',
      'Add ginger, green chilies, and asafoetida. Sauté for 30 seconds.',
      'Add turmeric powder and the soaked rice. Mix gently for 2 minutes.',
      'Add salt and hot water. Bring to a boil.',
      'Reduce heat to low, cover and cook for 15-18 minutes.',
      'Let it rest for 5 minutes. Fluff with a fork.',
      'Garnish with grated coconut and coriander leaves.',
      'Serve with sambar, rasam, or any South Indian curry.'
    ],
    tips: [
      'Fresh curry leaves make a big difference in flavor',
      'Don\'t skip the tempering step for authentic taste',
      'Perfect accompaniment to South Indian gravies'
    ],
    nutritionInfo: {
      calories: 290,
      protein: '6g',
      carbs: '52g',
      fat: '8g'
    }
  }
]