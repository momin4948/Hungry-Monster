function searchMeal() {
    const searchFood = document.getElementById('food');
    document.getElementById('resultParent').innerHTML = '';
    document.getElementById('detailsInfo').innerHTML = '';
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchFood.value;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayMenu(data);
            Ingredient(data);
        })
        .catch(error => alert('Please insert a valid name'));
}


function displayMenu(data) {
    data.meals.forEach(food => {
        const newItem = document.createElement('div');
        newItem.classList.add('col-3', 'card', 'foodCard', 'm-2', 'p-0', 'mt-4', 'rounded-5');
        newItem.style.width = '400px';
        newItem.innerHTML = `
        <a href="#"  style="text-decoration: none; color: black;">
        <img src="${food.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body text-center ">
        <h3 class="card-text">${food.strMeal}</h3>
   </div>
   </a>`;
        document.getElementById('resultParent').appendChild(newItem);

    });
}


function Ingredient(data) {
    const addEvent = document.getElementById('resultParent');
    addEvent.addEventListener('click', function () {
        document.getElementById('detailsInfo').innerHTML = '';
        let i = 1
        const foodName = event.target.parentNode.innerText;
        data.meals.forEach(element => {
            if (element.strMeal === foodName) {
                const newItem = document.createElement('div');
                newItem.classList.add('col-6', 'card', 'foodCard', 'm-2', 'p-0', 'mt-4',);
                newItem.style.width = '400px';
                newItem.innerHTML = `
                        <img src=${element.strMealThumb} >
                        <div class="card-body">
                        <h3 class="card-text">${element.strMeal}</h3>
                        <ul id="ingredients">
                        </ul>
                        </div>`;
                document.getElementById('detailsInfo').appendChild(newItem);
                while (i != 10) {
                    let ingredient = 'strIngredient' + (i++);
                    if (element[ingredient] == '')
                        continue;
                    const newItem = document.createElement('li');
                    newItem.innerText = element[ingredient];
                    document.getElementById('ingredients').appendChild(newItem);
                }
            }
        });
    })
}