const catalogue = [{"slug": "boys-chains", "group": "Boys", "name": "Chains", "description": "Rope, box & slim link styles", "styles": ["Rope chains", "Box chains", "Slim link chains"]}, {"slug": "boys-pendants", "group": "Boys", "name": "Pendants", "description": "Faith, form & a touch of sparkle", "styles": ["Religious motifs", "Geometric CZ cuts"]}, {"slug": "boys-bracelets", "group": "Boys", "name": "Kadas & Bracelets", "description": "Bold details. Everyday character.", "styles": ["Heavy bands", "Link styles"]}, {"slug": "boys-rings", "group": "Boys", "name": "Rings", "description": "Statement pieces with presence", "styles": ["Broad statement rings", "CZ grids"]}, {"slug": "boys-earrings", "group": "Boys", "name": "Studs & Hoops", "description": "Small details, distinctive style", "styles": ["Single-stone micro CZ studs", "Hoops"]}, {"slug": "girls-necklaces", "group": "Girls", "name": "Necklaces", "description": "Tradition, beautifully reimagined", "styles": ["Chokers", "Long harams", "Temple sets"]}, {"slug": "girls-pendants", "group": "Girls", "name": "Pendant Sets", "description": "A little sparkle for every day", "styles": ["Daily wear short chains", "CZ charms"]}, {"slug": "girls-mangalsutras", "group": "Girls", "name": "Mangalsutras", "description": "Meaningful details. Timeless beauty.", "styles": ["Black bead chains", "CZ main pieces"]}, {"slug": "girls-bangles", "group": "Girls", "name": "Bangles & Bracelets", "description": "Made for a beautiful finishing touch", "styles": ["Stone-studded sets", "Mesh charms"]}, {"slug": "girls-earrings", "group": "Girls", "name": "Earrings", "description": "From everyday to celebration", "styles": ["Jhumkas", "Hanging drops", "Daily studs"]}, {"slug": "girls-rings", "group": "Girls", "name": "Rings", "description": "Delicate details, lovely sparkle", "styles": ["Adjustable floral styles", "Solitaire styles"]}];

const dialog = document.getElementById('collection-dialog');
let lastTrigger = null;
document.querySelectorAll('.filter').forEach(button => {
 button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach(item => {
   const active = item === button;
   item.classList.toggle('active', active);
   item.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.product').forEach(card => {
   card.hidden = filter !== 'all' && card.dataset.group !== filter;
  });
  document.querySelector('.filter-status').textContent = filter === 'all' ? 'Showing all collections' : 'Showing collections for ' + filter;
 });
});
document.querySelectorAll('[data-product]').forEach(button => {
 button.addEventListener('click', () => {
  const item = catalogue.find(product => product.slug === button.dataset.product);
  if (!item) return;
  lastTrigger = button;
  document.getElementById('dialog-title').textContent = item.name;
  document.getElementById('dialog-group').textContent = 'FOR ' + item.group.toUpperCase() + ' · ROLD GOLD & CZ';
  document.getElementById('dialog-description').textContent = item.description;
  const image = document.getElementById('dialog-image');
  image.src = './images/catalogue/' + item.slug + '.webp';
  image.alt = 'Illustrative ' + item.group.toLowerCase() + ' ' + item.name.toLowerCase();
  const list = document.getElementById('dialog-styles');
  list.replaceChildren(...item.styles.map(style => {
   const li = document.createElement('li'); li.textContent = style; return li;
  }));
  document.querySelector('.dialog-enquire').href = 'https://wa.me/919032399091?text=' + encodeURIComponent('Hello SB Jewellers, I would like to enquire about ' + item.group.toLowerCase() + ' ' + item.name.toLowerCase() + ' and your retail / wholesale prices.');
  dialog.showModal();
  document.body.classList.add('modal-open');
 });
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
 if (event.target !== dialog) return;
 const rect = dialog.getBoundingClientRect();
 if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
 document.body.classList.remove('modal-open');
 if (lastTrigger) lastTrigger.focus();
});
