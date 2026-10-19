/* ==========================================================================
   LA CARTE — VERSION ANGLAISE (menu-data.en.js)
   --------------------------------------------------------------------------
   Ce fichier est le jumeau anglais de menu-data.js, chargé uniquement par
   index-en.html. Même structure, mêmes règles — voir menu-data.js pour le
   détail des champs (name/desc/price/prices/tag/note).

   ⚠️ RÈGLE IMPORTANTE : à chaque modification de la carte dans menu-data.js
   (nouveau plat, prix changé, suggestion ajoutée/retirée…), reportez le même
   changement ici, traduit en anglais. Les deux fichiers doivent toujours
   rester synchronisés (mêmes plats, mêmes prix, même ordre, même nombre d'entrées).

   Les prix restent en euros, avec le point décimal anglais (16.50) : le symbole €
   est ajouté automatiquement devant le montant (€16.50). Ne pas convertir en livres.

   Les noms sont traduits sans inventer de recette : quand le plat est connu sous
   son nom français (marinière, persillade, croque…), on le garde et on ajoute au
   besoin une courte explication dans "desc".
   ========================================================================== */

window.CARTE = [
  {
    id: 'suggestions',
    title: 'Specials',
    note: 'These dishes aren’t always on the menu — the selection changes regularly.',
    groups: [
      {
        title: '',
        // Empty list = no tab. Example: { name: 'Name of the dish', desc: 'Short description.', price: '18.00' }
        items: []
      }
    ]
  },
  {
    id: 'menus',
    title: 'Set menus',
    note: 'L’ardoise du jour is served at lunchtime only, with no substitutions.',
    groups: [
      {
        title: 'L’ardoise du jour · today’s specials',
        items: [
          { name: 'Complete set menu', desc: 'Starter, main course and dessert of the day', price: '16.50' },
          { name: 'Starter + main, or main + dessert', desc: 'Starter and main course, or main course and dessert of the day', price: '14.50' },
          { name: 'Main course only', desc: 'Main course of the day', price: '11.00' }
        ]
      },
      {
        title: 'Our set menus',
        items: [
          { name: 'Saint-Jacques scallop menu', desc: 'Smoked salmon with toast, or seafood platter\nPan-fried scallops in shellfish sauce, or scallops en persillade\nAssiette gourmande (dessert platter)', price: '28.50' },
          { name: 'Children’s menu', desc: 'Nuggets or burger and chips\nScoop of ice cream or chocolate mousse', price: '9.90' }
        ]
      }
    ]
  },
  {
    id: 'entrees',
    title: 'Starters',
    groups: [
      {
        title: '',
        items: [
          { name: 'Eggs with mayonnaise', price: '5.00' },
          { name: 'Chef’s terrine', price: '7.50' },
          { name: 'Avocado and prawns', price: '9.50' },
          { name: 'Smoked salmon', price: '13.50' },
          { name: 'Fish soup', price: '9.00' },
          { name: 'Herring with potatoes in oil', price: '7.50' },
          { name: 'Duck foie gras', price: '15.50' },
          { name: 'Plate of mussels', price: '8.00' }
        ]
      }
    ]
  },
  {
    id: 'plats',
    title: 'Mains',
    groups: [
      {
        title: 'Brasserie · served with chips',
        items: [
          { name: 'Grilled entrecôte', desc: 'Rib steak', price: '22.50' },
          { name: 'Duck breast', price: '22.00' },
          { name: 'Braised lamb shank', price: '20.00' },
          { name: 'Duck parmentier', desc: 'Duck and mashed potato', price: '15.50' },
          { name: 'Andouillette AAAAA', desc: 'Tripe sausage', price: '17.50' },
          { name: 'Normandy-style escalope', price: '15.00' },
          { name: 'Beef tartare', price: '16.50' }
        ]
      },
      {
        title: 'Burgers · homemade buns, served with chips and salad',
        items: [
          { name: 'Cheese burger', price: '14.50' },
          { name: 'Chicken burger', price: '14.50' },
          { name: 'Fish burger', price: '14.50' },
          { name: 'Vegetarian burger', price: '14.50' }
        ]
      },
      {
        title: 'Light bites',
        items: [
          { name: 'Fish and chips', price: '16.50' },
          { name: 'Croque-monsieur with chips', desc: 'Toasted ham and cheese sandwich', price: '10.00' },
          { name: 'Croque-madame with chips', desc: 'Croque-monsieur topped with a fried egg', price: '11.00' },
          { name: 'Minced beef steak', price: '11.50' },
          { name: 'Land and sea salad', price: '18.50' },
          { name: 'Caesar salad', price: '14.50' },
          { name: 'Omelette complète', price: '11.00' },
          { name: 'Plate of chips or green salad', price: '3.50' }
        ]
      },
      {
        title: 'From the sea · shellfish',
        items: [
          { name: 'Whelks with mayonnaise', price: '12.00' },
          { name: '9 prawns with mayonnaise', price: '15.00' },
          { name: '6 oysters', price: '12.00' },
          { name: 'Seafood platter', price: '19.50' }
        ]
      },
      {
        title: 'From the sea · main dishes',
        items: [
          { name: 'Seafood choucroute', desc: 'Sauerkraut with fish and shellfish', price: '23.00' },
          { name: 'Fish and shellfish plancha', desc: 'Mojo sauce', price: '26.00' },
          { name: 'Whole roasted sea bass', price: '22.00' },
          { name: 'Grilled octopus', price: '20.00' },
          { name: 'Catch of the day', price: '22.00' },
          { name: 'Normandy-style skate wing', price: '16.50' },
          { name: 'Grilled gambas', desc: 'King prawns', price: '22.00' },
          { name: 'Pan-fried scallops', price: '19.00' },
          { name: 'Scallops en persillade', desc: 'With parsley and garlic', price: '19.00' },
          { name: 'Mussels marinière', desc: 'In white wine', price: '13.50' },
          { name: 'Mussels in cream sauce', price: '15.00' },
          { name: 'Normandy-style mussels', price: '15.00' },
          { name: 'Mussels homardine', desc: 'Lobster-style sauce', price: '15.00' }
        ]
      }
    ]
  },
  {
    id: 'desserts',
    title: 'Desserts',
    groups: [
      {
        title: 'Desserts',
        items: [
          { name: 'Cheese plate', price: '6.50' },
          { name: 'Banana split', price: '8.50' },
          { name: 'Crème brûlée', price: '6.50' },
          { name: 'Île flottante', desc: 'Meringue floating on custard', price: '6.00' },
          { name: 'Tiramisu', price: '7.50' },
          { name: 'Dessert of the day', price: '5.00' },
          { name: 'Chocolate mi-cuit with vanilla ice cream', desc: 'Warm chocolate cake with a soft centre', price: '7.50' },
          { name: 'Iced nougat with candied fruit', price: '7.00' },
          { name: 'Chocolate mousse', price: '7.50' },
          { name: 'Fresh fruit salad', price: '6.50' },
          { name: 'Café gourmand', desc: 'Coffee with a selection of mini desserts', price: '8.50' }
        ]
      },
      {
        title: 'Ice cream sundaes',
        items: [
          { name: 'Dame blanche', desc: '2 scoops vanilla, chocolate sauce and whipped cream', price: '6.50' },
          { name: 'Iceberg', desc: '2 scoops chocolate mint, Get 27 mint liqueur', price: '7.50' },
          { name: 'Dubai', desc: '1 scoop pistachio, 1 scoop chocolate and whipped cream', price: '7.50' },
          { name: 'Coffee, chocolate or caramel liégeois', price: '6.50' },
          { name: 'Colonel', desc: '2 scoops lemon, vodka', price: '7.50' },
          { name: 'Antillaise', desc: 'Coconut, passion fruit, vanilla', price: '7.00' },
          { name: 'Montélimar', desc: '1 scoop vanilla, 1 scoop nougat and whipped cream', price: '6.50' },
          { name: 'La Normande', desc: '2 scoops apple, calvados', price: '7.50' },
          { name: 'Red fruits', desc: 'Strawberry, blackcurrant, raspberry and whipped cream', price: '7.00' }
        ]
      },
      {
        title: 'Ice cream',
        items: [
          { name: 'Ice cream, 1 scoop', desc: 'Flavours: vanilla, chocolate, strawberry, coffee, coconut, caramel, lemon, apple, raspberry, passion fruit, pistachio, nougat, blackcurrant, chocolate mint', price: '2.50' },
          { name: 'Ice cream, 2 scoops', price: '3.70' },
          { name: 'Ice cream, 3 scoops', price: '4.70' },
          { name: 'Extra whipped cream', price: '1.50' }
        ]
      }
    ]
  },
  {
    id: 'boissons',
    title: 'Drinks',
    groups: [
      {
        title: 'Aperitifs',
        items: [
          { name: 'Pommeau de Normandie', desc: 'Apple juice and calvados aperitif', tag: '5 cl', price: '4.00' },
          { name: 'Spritz', tag: '20 cl', price: '9.00' },
          { name: 'Mojito', tag: '20 cl', price: '9.00' },
          { name: 'San Francisco', tag: '20 cl', price: '9.00' },
          { name: 'Kir, white wine or sparkling', tag: '10 cl', price: '3.50' },
          { name: 'Pastis (anise)', tag: '2 cl', price: '3.00' },
          { name: 'Fortified wines', tag: '5 cl', price: '4.00' },
          { name: 'Americano', tag: '8 cl', price: '8.00' },
          { name: 'Whisky', tag: '4 cl', price: '5.50' },
          { name: 'Jack Daniel’s', tag: '4 cl', price: '8.00' },
          { name: 'Virgin mojito', tag: '20 cl', price: '5.50' },
          { name: 'Non-alcoholic cocktail', tag: '20 cl', price: '4.00' }
        ]
      },
      {
        title: 'Draught beer',
        items: [
          { name: 'Heineken', prices: [['25 cl', '3.80'], ['50 cl', '7.50']] },
          { name: 'Ciney', prices: [['25 cl', '4.80'], ['50 cl', '9.60']] }
        ]
      },
      {
        title: 'Bottled beer and cider',
        items: [
          { name: 'Abbaye de Leffe', tag: '33 cl', price: '5.50' },
          { name: 'Pelforth Brune', tag: '33 cl', price: '5.50' },
          { name: 'Desperados', tag: '33 cl', price: '5.50' },
          { name: 'Alcohol-free beer', tag: '25 cl', price: '5.50' },
          { name: 'Chouffe', tag: '33 cl', price: '5.50' },
          { name: 'Rince Cochon red fruits', tag: '33 cl', price: '5.50' },
          { name: 'White beer', tag: '33 cl', price: '5.50' },
          { name: 'Normandy cider', tag: '33 cl', price: '5.50' }
        ]
      },
      {
        title: 'Soft drinks and water',
        items: [
          { name: 'Soda', tag: '33 cl', price: '4.00' },
          { name: 'Fruit juice', tag: '25 cl', price: '4.00' },
          { name: 'Perrier', tag: '33 cl', price: '4.00' },
          { name: 'San Pellegrino', tag: '100 cl', price: '4.10' },
          { name: 'San Pellegrino', tag: '50 cl', price: '3.10' },
          { name: 'Vittel', tag: '100 cl', price: '4.10' },
          { name: 'Vittel', tag: '50 cl', price: '3.10' },
          { name: 'Diabolo', desc: 'Lemonade with syrup', tag: '25 cl', price: '3.00' },
          { name: 'Lemonade', tag: '25 cl', price: '2.80' },
          { name: 'Syrup with water', tag: '25 cl', price: '2.00' }
        ]
      },
      {
        title: 'Hot drinks',
        items: [
          { name: 'Coffee', desc: 'Espresso', price: '2.00' },
          { name: 'Long coffee', desc: 'Café allongé', price: '2.20' },
          { name: 'Café crème', desc: 'White coffee', price: '3.00' },
          { name: 'Grand crème', desc: 'Large white coffee', price: '4.50' },
          { name: 'Double espresso', price: '3.80' },
          { name: 'Decaffeinated coffee', price: '2.00' },
          { name: 'Tea', price: '3.50' },
          { name: 'Hot chocolate', price: '4.00' },
          { name: 'Herbal tea', price: '3.50' }
        ]
      },
      {
        title: 'Digestifs',
        items: [
          { name: 'Rum Zacapa 23 years', tag: '4 cl', price: '6.80' },
          { name: 'Rum Botran 15 years', tag: '4 cl', price: '6.80' },
          { name: 'Rum Havana 7 years', tag: '4 cl', price: '6.80' },
          { name: 'Rum Diplomatico', tag: '4 cl', price: '6.80' },
          { name: 'Calvados 15 years', tag: '4 cl', price: '6.80' },
          { name: 'Get 27 / 31', desc: 'Mint liqueurs', tag: '4 cl', price: '6.80' },
          { name: 'White spirits', desc: 'Eaux-de-vie', tag: '4 cl', price: '6.80' }
        ]
      }
    ]
  },
  {
    id: 'vins',
    title: 'Wines',
    groups: [
      {
        title: 'Wine by the jug',
        items: [
          { name: 'Muscadet AOC', prices: [['25 cl', '5.50'], ['50 cl', '11.00']] },
          { name: 'Bourgogne aligoté AOC', prices: [['25 cl', '7.50'], ['50 cl', '14.50']] },
          { name: 'Rosé AOP', prices: [['25 cl', '5.50'], ['50 cl', '11.00']] },
          { name: 'Rosé de Provence', prices: [['25 cl', '7.50'], ['50 cl', '14.50']] },
          { name: 'Bordeaux AOC', prices: [['25 cl', '5.50'], ['50 cl', '11.00']] },
          { name: 'Côtes de Bourg AOC', prices: [['25 cl', '7.50'], ['50 cl', '14.50']] }
        ]
      },
      {
        title: 'Red wines',
        items: [
          { name: 'Saint-Nicolas AOC', prices: [['75 cl', '28'], ['37.5 cl', '18']] },
          { name: 'Lussac Saint-Émilion AOC', prices: [['75 cl', '35']] },
          { name: 'Côtes du Rhône AOC', prices: [['75 cl', '25'], ['37.5 cl', '15']] }
        ]
      },
      {
        title: 'White wines',
        items: [
          { name: 'Mâcon-Villages AOC', prices: [['75 cl', '28']] },
          { name: 'Riesling AOC', prices: [['75 cl', '28'], ['37.5 cl', '18']] },
          { name: 'Sancerre AOC', prices: [['75 cl', '35']] }
        ]
      },
      {
        title: 'Rosé wines',
        items: [
          { name: 'Rosé de Loire AOC', prices: [['75 cl', '25'], ['37.5 cl', '18']] },
          { name: 'Tavel AOC', prices: [['75 cl', '28']] }
        ]
      },
      {
        title: 'Cider and champagne',
        items: [
          { name: 'Normandy cider', prices: [['75 cl', '14']] },
          { name: 'Champagne AOC', prices: [['75 cl', '40']] }
        ]
      }
    ]
  }
];
