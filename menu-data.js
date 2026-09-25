/* ==========================================================================
   LA CARTE — c'est ici que vous modifiez les plats et les prix.
   --------------------------------------------------------------------------
   • Chaque partie (Boissons, Entrées, Plats, Desserts) contient des "groups".
   • Chaque group a un titre (ou '' pour ne rien afficher) et une liste "items".
   • Un item : { name: 'Nom', desc: 'Description', price: '12', tag: 'Nouveau' }
       - desc  : facultatif
       - price : le symbole € est ajouté automatiquement (mettre '' pour masquer)
       - tag   : facultatif (petite étiquette : "Nouveau", "Végétarien"…)
   • Une partie peut avoir une "note" : une phrase affichée au-dessus de la liste.
   • "Suggestions" = les plats qui ne sont pas toujours à la carte. Une partie SANS aucun
     plat n'affiche pas d'onglet : quand il n'y a pas de suggestion, videz simplement sa
     liste "items" (elle réapparaîtra dès que vous y remettrez un plat).
   • Pour changer l'ordre des parties, déplacez simplement les blocs (la première s'ouvre par défaut).

   ⚠️ Les plats ci-dessous sont des EXEMPLES avec des prix à "00" :
      remplacez-les par vos vrais plats et prix.
   ========================================================================== */

window.CARTE = [
  {
    id: 'suggestions',
    title: 'Suggestions',
    note: 'Ces plats ne sont pas toujours à la carte : la sélection change.',
    groups: [
      {
        title: '',
        items: [
          { name: 'Nom de la suggestion', desc: 'Description courte de la suggestion.', price: '00' },
          { name: 'Nom de la suggestion', desc: 'Description courte de la suggestion.', price: '00' },
          { name: 'Nom de la suggestion', desc: 'Description courte de la suggestion.', price: '00' }
        ]
      }
    ]
  },
  {
    id: 'boissons',
    title: 'Boissons',
    groups: [
      {
        title: 'Softs & eaux',
        items: [
          { name: 'Eau plate / gazeuse', desc: 'Bouteille 50 cl', price: '00' },
          { name: 'Sodas', desc: 'Selon disponibilité', price: '00' },
          { name: 'Jus de fruits', desc: 'Orange, pomme, ananas…', price: '00' }
        ]
      },
      {
        title: 'Bières & cidres',
        items: [
          { name: 'Cidre de Normandie', desc: 'Brut ou doux, bolée', price: '00' },
          { name: 'Bière pression', desc: 'Demi / pinte', price: '00' }
        ]
      },
      {
        title: 'Vins',
        items: [
          { name: 'Vin blanc', desc: 'Au verre ou en bouteille', price: '00' },
          { name: 'Vin rosé', desc: 'Au verre ou en bouteille', price: '00' },
          { name: 'Vin rouge', desc: 'Au verre ou en bouteille', price: '00' }
        ]
      },
      {
        title: 'Chaud',
        items: [
          { name: 'Café, thé, infusion', desc: '', price: '00' }
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
          { name: 'Nom de l’entrée', desc: 'Description courte de l’entrée, ingrédients principaux.', price: '00' },
          { name: 'Nom de l’entrée', desc: 'Description courte de l’entrée, ingrédients principaux.', price: '00' },
          { name: 'Nom de l’entrée', desc: 'Description courte de l’entrée, ingrédients principaux.', price: '00' },
          { name: 'Nom de l’entrée', desc: 'Description courte de l’entrée, ingrédients principaux.', price: '00' }
        ]
      }
    ]
  },
  {
    id: 'plats',
    title: 'Plats',
    groups: [
      {
        title: '',
        items: [
          { name: 'Nom du plat', desc: 'Description courte du plat, accompagnement.', price: '00' },
          { name: 'Nom du plat', desc: 'Description courte du plat, accompagnement.', price: '00' },
          { name: 'Nom du plat', desc: 'Description courte du plat, accompagnement.', price: '00' },
          { name: 'Nom du plat', desc: 'Description courte du plat, accompagnement.', price: '00' },
          { name: 'Nom du plat', desc: 'Description courte du plat, accompagnement.', price: '00' }
        ]
      }
    ]
  },
  {
    id: 'desserts',
    title: 'Desserts',
    groups: [
      {
        title: '',
        items: [
          { name: 'Nom du dessert', desc: 'Description courte du dessert.', price: '00' },
          { name: 'Nom du dessert', desc: 'Description courte du dessert.', price: '00' },
          { name: 'Nom du dessert', desc: 'Description courte du dessert.', price: '00' },
          { name: 'Nom du dessert', desc: 'Description courte du dessert.', price: '00' }
        ]
      }
    ]
  }
];
