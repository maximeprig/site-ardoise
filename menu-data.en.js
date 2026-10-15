/* ==========================================================================
   LA CARTE — VERSION ANGLAISE (menu-data.en.js)
   --------------------------------------------------------------------------
   Ce fichier est le jumeau anglais de menu-data.js, chargé uniquement par
   index-en.html. Même structure, mêmes règles — voir menu-data.js pour le
   détail des champs (name/desc/price/tag/note).

   ⚠️ RÈGLE IMPORTANTE : à chaque modification de la carte dans menu-data.js
   (nouveau plat, prix changé, suggestion ajoutée/retirée…), reportez le même
   changement ici, traduit en anglais. Les deux fichiers doivent toujours
   rester synchronisés (mêmes plats, mêmes prix, même nombre d'entrées).

   Les prix restent en euros (le symbole € est ajouté automatiquement, comme
   en français) : ne pas convertir en livres sterling.
   ========================================================================== */

window.CARTE = [
  {
    id: 'suggestions',
    title: 'Specials',
    note: 'These dishes aren’t always on the menu — the selection changes regularly.',
    groups: [
      {
        title: '',
        items: [
          { name: 'Name of the special', desc: 'Short description of the special.', price: '00' },
          { name: 'Name of the special', desc: 'Short description of the special.', price: '00' },
          { name: 'Name of the special', desc: 'Short description of the special.', price: '00' }
        ]
      }
    ]
  },
  {
    id: 'boissons',
    title: 'Drinks',
    groups: [
      {
        title: 'Soft drinks & water',
        items: [
          { name: 'Still / sparkling water', desc: '50 cl bottle', price: '00' },
          { name: 'Soft drinks', desc: 'Subject to availability', price: '00' },
          { name: 'Fruit juice', desc: 'Orange, apple, pineapple…', price: '00' }
        ]
      },
      {
        title: 'Beers & ciders',
        items: [
          { name: 'Normandy cider', desc: 'Dry or sweet, traditional cider bowl', price: '00' },
          { name: 'Draught beer', desc: 'Half-pint / pint', price: '00' }
        ]
      },
      {
        title: 'Wines',
        items: [
          { name: 'White wine', desc: 'By the glass or bottle', price: '00' },
          { name: 'Rosé wine', desc: 'By the glass or bottle', price: '00' },
          { name: 'Red wine', desc: 'By the glass or bottle', price: '00' }
        ]
      },
      {
        title: 'Hot drinks',
        items: [
          { name: 'Coffee, tea, herbal tea', desc: '', price: '00' }
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
          { name: 'Name of the starter', desc: 'Short description of the starter, main ingredients.', price: '00' },
          { name: 'Name of the starter', desc: 'Short description of the starter, main ingredients.', price: '00' },
          { name: 'Name of the starter', desc: 'Short description of the starter, main ingredients.', price: '00' },
          { name: 'Name of the starter', desc: 'Short description of the starter, main ingredients.', price: '00' }
        ]
      }
    ]
  },
  {
    id: 'plats',
    title: 'Mains',
    groups: [
      {
        title: '',
        items: [
          { name: 'Name of the dish', desc: 'Short description of the dish, side.', price: '00' },
          { name: 'Name of the dish', desc: 'Short description of the dish, side.', price: '00' },
          { name: 'Name of the dish', desc: 'Short description of the dish, side.', price: '00' },
          { name: 'Name of the dish', desc: 'Short description of the dish, side.', price: '00' },
          { name: 'Name of the dish', desc: 'Short description of the dish, side.', price: '00' }
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
          { name: 'Name of the dessert', desc: 'Short description of the dessert.', price: '00' },
          { name: 'Name of the dessert', desc: 'Short description of the dessert.', price: '00' },
          { name: 'Name of the dessert', desc: 'Short description of the dessert.', price: '00' },
          { name: 'Name of the dessert', desc: 'Short description of the dessert.', price: '00' }
        ]
      }
    ]
  }
];
