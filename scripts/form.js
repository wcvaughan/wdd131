document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  document.getElementById('currentyear').textContent = currentYear;

  const lastModifiedDate = document.lastModified;
  document.getElementById('lastModified').textContent = `Last modified: ${lastModifiedDate}`;

  const productSelect = document.getElementById('product');
  console.log('Product select element: ', productSelect);


  const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
  ];

  products.forEach(product => {
    console.log('Adding product:', product);
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });

  const button = document.getElementById('postreview');

  const handleClick = () => {

    let visitCount = localStorage.getItem('visitCount');

    if (visitCount === null) {
      visitCount = 0;
    } else {
      visitCount = parseInt(visitCount);
    }
    visitCount += 1;

    localStorage.setItem('visitCount', visitCount);
  }

  button.addEventListener('click', handleClick);

});


