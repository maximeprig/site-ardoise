/* ==========================================================================
   LA CARTE — c'est ici que vous modifiez les plats et les prix.
   --------------------------------------------------------------------------
   • Chaque partie (Menus, Entrées, Plats, Desserts, Boissons, Vins) contient des "groups".
   • Chaque group a un titre (ou '' pour ne rien afficher) et une liste "items".
   • Un item : { name: 'Nom', desc: 'Description', price: '12,50', tag: 'Nouveau' }
       - desc   : facultatif (\n pour passer à la ligne)
       - price  : le symbole € est ajouté automatiquement (mettre '' pour masquer)
       - tag    : facultatif (petite étiquette : "Nouveau", "Végétarien", "20 cl"…)
       - prices : facultatif, À LA PLACE de price quand un plat existe en plusieurs formats :
                  prices: [['25 cl', '3,80'], ['50 cl', '7,50']]
   • Une partie peut avoir un SOUS-MENU (c'est le cas de Plats, Desserts et Boissons) : mettre
     subnav: true  dans la partie. Chaque group devient alors une section du sous-menu (sous l'onglet
     sur ordinateur, en pastilles sur téléphone) et on n'affiche qu'une section à la fois.
     "label" (facultatif, sur le group) donne son nom court dans le sous-menu ; sinon c'est son titre.
     Sans subnav, tous les groups de la partie s'affichent d'un bloc (Menus, Entrées, Vins).
   • Une partie peut avoir une "note" : une phrase affichée au-dessus de la liste.
   • "Suggestions" = les plats qui ne sont pas toujours à la carte. Une partie SANS aucun
     plat n'affiche pas d'onglet : quand il n'y a pas de suggestion, videz simplement sa
     liste "items" (elle réapparaîtra dès que vous y remettrez un plat).
   • Pour changer l'ordre des parties, déplacez simplement les blocs (la première s'ouvre par défaut).

   Carte saisie le 19/10/2026 d'après la carte papier du restaurant. Prix en euros,
   nets, taxes et service compris.

   ⚠️ RÈGLE IMPORTANTE : la version anglaise est dans menu-data.en.js. À chaque modification
   ici (plat ajouté, prix changé…), reportez le même changement dans l'autre fichier :
   mêmes plats, mêmes prix, même ordre.
   ========================================================================== */

window.CARTE = [
  {
    id: 'suggestions',
    title: 'Suggestions',
    note: 'Ces plats ne sont pas toujours à la carte : la sélection change.',
    groups: [
      {
        title: '',
        // Liste vide = pas d'onglet. Exemple : { name: 'Nom du plat', desc: 'Description courte.', price: '18,00' }
        items: []
      }
    ]
  },
  {
    id: 'menus',
    title: 'Menus',
    note: 'L’ardoise du jour est servie uniquement le midi, sans changement possible.',
    groups: [
      {
        title: 'L’ardoise du jour',
        items: [
          { name: 'Formule complète', desc: 'Entrée, plat et dessert du jour', price: '16,50' },
          { name: 'Entrée + plat ou plat + dessert', desc: 'Entrée et plat, ou plat et dessert du jour', price: '14,50' },
          { name: 'Plat seul', desc: 'Le plat du jour', price: '11,00' }
        ]
      },
      {
        title: 'Nos menus',
        items: [
          { name: 'Menu Saint-Jacques', desc: 'Saumon fumé et ses toasts, ou assiette de fruits de mer\nPoêlée de Saint-Jacques sauce crustacé, ou Saint-Jacques en persillade\nAssiette gourmande', price: '28,50' },
          { name: 'Menu enfant', desc: 'Nuggets ou burger / frites\nBoule de glace ou mousse au chocolat', price: '9,90' }
        ]
      }
    ]
  },
  {
    id: 'entrees',
    title: 'Entrées',
    groups: [
      {
        title: '',
        items: [
          { name: 'Œufs mayonnaise', price: '5,00' },
          { name: 'Terrine du chef', price: '7,50' },
          { name: 'Avocat crevettes', price: '9,50' },
          { name: 'Saumon fumé', price: '13,50' },
          { name: 'Soupe de poissons', price: '9,00' },
          { name: 'Harengs pommes à l’huile', price: '7,50' },
          { name: 'Foie gras de canard', price: '15,50' },
          { name: 'Assiette de moules', price: '8,00' }
        ]
      }
    ]
  },
  {
    id: 'plats',
    title: 'Plats',
    subnav: true,
    groups: [
      {
        label: 'Brasserie',
        title: 'Brasserie · servie avec des frites',
        items: [
          { name: 'Entrecôte grillée', price: '22,50' },
          { name: 'Magret de canard', price: '22,00' },
          { name: 'Souris d’agneau braisée', price: '20,00' },
          { name: 'Parmentier de canard', price: '15,50' },
          { name: 'Andouillette AAAAA', price: '17,50' },
          { name: 'Escalope normande', price: '15,00' },
          { name: 'Tartare de bœuf', price: '16,50' }
        ]
      },
      {
        label: 'Burgers',
        title: 'Burgers · buns maison, servis avec frites et salade',
        items: [
          { name: 'Cheese burger', price: '14,50' },
          { name: 'Chicken burger', price: '14,50' },
          { name: 'Fish burger', price: '14,50' },
          { name: 'Burger végétarien', price: '14,50' }
        ]
      },
      {
        title: 'Snacking',
        items: [
          { name: 'Fish and chips', price: '16,50' },
          { name: 'Croque monsieur, frites', price: '10,00' },
          { name: 'Croque madame, frites', price: '11,00' },
          { name: 'Steak haché', price: '11,50' },
          { name: 'Salade terre et mer', price: '18,50' },
          { name: 'Salade César', price: '14,50' },
          { name: 'Omelette complète', price: '11,00' },
          { name: 'Assiette de frites ou salade verte', price: '3,50' }
        ]
      },
      {
        title: 'Côté mer',
        items: [
          { name: 'Bulots mayonnaise', price: '12,00' },
          { name: '9 crevettes mayonnaise', price: '15,00' },
          { name: '6 huîtres', price: '12,00' },
          { name: 'Assiette de fruits de mer', price: '19,50' },
          { name: 'Choucroute de la mer', price: '23,00' },
          { name: 'Plancha de poissons et crustacés', desc: 'Sauce mojo', price: '26,00' },
          { name: 'Bar entier rôti', price: '22,00' },
          { name: 'Poulpe grillé', price: '20,00' },
          { name: 'Pêche du moment', price: '22,00' },
          { name: 'Aile de raie normande', price: '16,50' },
          { name: 'Gambas grillées', price: '22,00' },
          { name: 'Poêlée de Saint-Jacques', price: '19,00' },
          { name: 'Saint-Jacques en persillade', price: '19,00' },
          { name: 'Moules marinière', price: '13,50' },
          { name: 'Moules crème', price: '15,00' },
          { name: 'Moules normandes', price: '15,00' },
          { name: 'Moules homardine', price: '15,00' }
        ]
      }
    ]
  },
  {
    id: 'desserts',
    title: 'Desserts',
    subnav: true,
    groups: [
      {
        title: 'Les desserts',
        items: [
          { name: 'Assiette de fromages', price: '6,50' },
          { name: 'Banana split', price: '8,50' },
          { name: 'Crème brûlée', price: '6,50' },
          { name: 'Île flottante', price: '6,00' },
          { name: 'Tiramisu', price: '7,50' },
          { name: 'Dessert du jour', price: '5,00' },
          { name: 'Mi-cuit au chocolat, boule vanille', price: '7,50' },
          { name: 'Nougat glacé aux fruits confits', price: '7,00' },
          { name: 'Mousse au chocolat', price: '7,50' },
          { name: 'Salade de fruits frais', price: '6,50' },
          { name: 'Café gourmand', price: '8,50' }
        ]
      },
      {
        title: 'Coupes glacées',
        items: [
          { name: 'Dame blanche', desc: '2 boules vanille, sauce chocolat et chantilly', price: '6,50' },
          { name: 'Iceberg', desc: '2 boules menthe chocolat, Get 27', price: '7,50' },
          { name: 'Dubaï', desc: '1 boule pistache, 1 boule chocolat et chantilly', price: '7,50' },
          { name: 'Café, chocolat ou caramel liégeois', price: '6,50' },
          { name: 'Colonel', desc: '2 boules citron, vodka', price: '7,50' },
          { name: 'Antillaise', desc: 'Coco, passion, vanille', price: '7,00' },
          { name: 'Montélimar', desc: '1 boule vanille, 1 boule nougat et chantilly', price: '6,50' },
          { name: 'La Normande', desc: '2 boules pomme, calvados', price: '7,50' },
          { name: 'Fruits rouges', desc: 'Fraise, cassis, framboise et chantilly', price: '7,00' }
        ]
      },
      {
        title: 'Glaces',
        items: [
          { name: 'Glace, 1 boule', desc: 'Parfums : vanille, chocolat, fraise, café, coco, caramel, citron, pomme, framboise, passion, pistache, nougat, cassis, menthe chocolat', price: '2,50' },
          { name: 'Glace, 2 boules', price: '3,70' },
          { name: 'Glace, 3 boules', price: '4,70' },
          { name: 'Supplément chantilly', price: '1,50' }
        ]
      }
    ]
  },
  {
    id: 'boissons',
    title: 'Boissons',
    subnav: true,
    groups: [
      {
        title: 'Apéritifs',
        items: [
          { name: 'Pommeau de Normandie', tag: '5 cl', price: '4,00' },
          { name: 'Spritz', tag: '20 cl', price: '9,00' },
          { name: 'Mojito', tag: '20 cl', price: '9,00' },
          { name: 'San Francisco', tag: '20 cl', price: '9,00' },
          { name: 'Kir vin blanc ou pétillant', tag: '10 cl', price: '3,50' },
          { name: 'Anis', tag: '2 cl', price: '3,00' },
          { name: 'Vins cuits', tag: '5 cl', price: '4,00' },
          { name: 'Americano', tag: '8 cl', price: '8,00' },
          { name: 'Whisky', tag: '4 cl', price: '5,50' },
          { name: 'Jack Daniel’s', tag: '4 cl', price: '8,00' },
          { name: 'Virgin mojito', tag: '20 cl', price: '5,50' },
          { name: 'Cocktail sans alcool', tag: '20 cl', price: '4,00' }
        ]
      },
      {
        title: 'Bières et cidre',
        items: [
          { name: 'Heineken', tag: 'Pression', prices: [['25 cl', '3,80'], ['50 cl', '7,50']] },
          { name: 'Ciney', tag: 'Pression', prices: [['25 cl', '4,80'], ['50 cl', '9,60']] },
          { name: 'Abbaye de Leffe', tag: '33 cl', price: '5,50' },
          { name: 'Pelforth brune', tag: '33 cl', price: '5,50' },
          { name: 'Desperados', tag: '33 cl', price: '5,50' },
          { name: 'Bière sans alcool', tag: '25 cl', price: '5,50' },
          { name: 'Chouffe', tag: '33 cl', price: '5,50' },
          { name: 'Rince Cochon fruits rouges', tag: '33 cl', price: '5,50' },
          { name: 'Bière blanche', tag: '33 cl', price: '5,50' },
          { name: 'Cidre normand', tag: '33 cl', price: '5,50' }
        ]
      },
      {
        title: 'Boissons fraîches',
        items: [
          { name: 'Soda', tag: '33 cl', price: '4,00' },
          { name: 'Jus de fruits', tag: '25 cl', price: '4,00' },
          { name: 'Perrier', tag: '33 cl', price: '4,00' },
          { name: 'San Pellegrino', tag: '100 cl', price: '4,10' },
          { name: 'San Pellegrino', tag: '50 cl', price: '3,10' },
          { name: 'Vittel', tag: '100 cl', price: '4,10' },
          { name: 'Vittel', tag: '50 cl', price: '3,10' },
          { name: 'Diabolo', tag: '25 cl', price: '3,00' },
          { name: 'Limonade', tag: '25 cl', price: '2,80' },
          { name: 'Sirop à l’eau', tag: '25 cl', price: '2,00' }
        ]
      },
      {
        title: 'Boissons chaudes',
        items: [
          { name: 'Café', price: '2,00' },
          { name: 'Café allongé', price: '2,20' },
          { name: 'Café crème', price: '3,00' },
          { name: 'Grand crème', price: '4,50' },
          { name: 'Double café', price: '3,80' },
          { name: 'Décaféiné', price: '2,00' },
          { name: 'Thé', price: '3,50' },
          { name: 'Chocolat', price: '4,00' },
          { name: 'Infusion', price: '3,50' }
        ]
      },
      {
        title: 'Digestifs',
        items: [
          { name: 'Rhum Zacapa 23 ans', tag: '4 cl', price: '6,80' },
          { name: 'Rhum Botran 15 ans', tag: '4 cl', price: '6,80' },
          { name: 'Rhum Havana 7 ans', tag: '4 cl', price: '6,80' },
          { name: 'Rhum Diplomatico', tag: '4 cl', price: '6,80' },
          { name: 'Calvados 15 ans', tag: '4 cl', price: '6,80' },
          { name: 'Get 27 / 31', tag: '4 cl', price: '6,80' },
          { name: 'Alcools blancs', tag: '4 cl', price: '6,80' }
        ]
      }
    ]
  },
  {
    id: 'vins',
    title: 'Vins',
    groups: [
      {
        title: 'Vin au pichet',
        items: [
          { name: 'Muscadet AOC', prices: [['25 cl', '5,50'], ['50 cl', '11,00']] },
          { name: 'Bourgogne aligoté AOC', prices: [['25 cl', '7,50'], ['50 cl', '14,50']] },
          { name: 'Rosé AOP', prices: [['25 cl', '5,50'], ['50 cl', '11,00']] },
          { name: 'Rosé de Provence', prices: [['25 cl', '7,50'], ['50 cl', '14,50']] },
          { name: 'Bordeaux AOC', prices: [['25 cl', '5,50'], ['50 cl', '11,00']] },
          { name: 'Côtes de Bourg AOC', prices: [['25 cl', '7,50'], ['50 cl', '14,50']] }
        ]
      },
      {
        title: 'Vins rouges',
        items: [
          { name: 'Saint-Nicolas AOC', prices: [['75 cl', '28'], ['37,5 cl', '18']] },
          { name: 'Lussac Saint-Émilion AOC', prices: [['75 cl', '35']] },
          { name: 'Côtes du Rhône AOC', prices: [['75 cl', '25'], ['37,5 cl', '15']] }
        ]
      },
      {
        title: 'Vins blancs',
        items: [
          { name: 'Mâcon-Villages AOC', prices: [['75 cl', '28']] },
          { name: 'Riesling AOC', prices: [['75 cl', '28'], ['37,5 cl', '18']] },
          { name: 'Sancerre AOC', prices: [['75 cl', '35']] }
        ]
      },
      {
        title: 'Vins rosés',
        items: [
          { name: 'Rosé de Loire AOC', prices: [['75 cl', '25'], ['37,5 cl', '18']] },
          { name: 'Tavel AOC', prices: [['75 cl', '28']] }
        ]
      },
      {
        title: 'Cidre et champagne',
        items: [
          { name: 'Cidre de Normandie', prices: [['75 cl', '14']] },
          { name: 'Champagne AOC', prices: [['75 cl', '40']] }
        ]
      }
    ]
  }
];
