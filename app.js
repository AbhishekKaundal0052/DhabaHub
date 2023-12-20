let title = document.getElementById('title');
let footer = document.querySelector('footer');
let home = document.getElementById('home')
let random = document.getElementById("random")
let result = document.getElementById('search-results')
let dishNames = document.querySelectorAll('.name');
let recipe = document.getElementById('recipe')

home.addEventListener('click', function () {
    document.getElementById('descr').style.display = "block";
    title.style.display = "none";
    result.style.display = "none";
})

document.getElementById('sbutton').addEventListener('click', function () {
    let input = document.querySelector('#result').value;
    if (input.trim()==="") {
        alert("Please enter a dish.");
    }
    else {
        document.getElementById('descr').style.display = "none";
        title.style.display = "block"; 
        footer.style.marginTop = "20vh";
        result.style.display = "grid";
        title.innerText = `searched results for ${input}...`;
        console.log(input);
        showResult(input);
    }
});

function showResult(input) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`)
        .then((s) => {
            console.log(s);
            return s.json()
        })
        .then((search) => {
            console.log(search);
            const meals = search.meals;
            var rest = '';
            meals.forEach((many) => {
             rest += `
            <div class="element">
            <img src ="${many.strMealThumb}" id="grid" alt"error">
            <br>
            <br>
            <p class= "name"> ${many.strMeal}</p>
            </div>`
            result.innerHTML = rest;
            })
        })
        .catch((error) => {
            title.innerText = "No matching results found..."
            result.innerHTML = "";
             footer.style.marginTop = "43.6vh";
            if (error) {
               
            }
            console.log(error);
        })
}
var id = 0;
function getData() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((real) => {
            console.log(real);
            const meal = real.meals;
            meal.forEach((food) => {
                 id = food.idMeal;
                random.innerHTML += `
            <img src ="${food.strMealThumb}" id="randomImg" class="img" alt"error">
            <br>
            <br>
            <p class= "name"> ${food.strMeal}</p>
            `
            })

        })
}
getData()

let indGrid = document.getElementById('indGrid')
random.addEventListener('click', function () {
    recipe.style.display = "block";
    // document.getElementById('descr').style.display = "none";
    // footer.style.marginTop = "20vh";

    showIndgredients()
});
console.log(id);
function showIndgredients(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`)
    .then((reci)=>{
        return reci.json()
    })
    .then((ingredient)=>{
        console.log(ingredient);  
        // let ingredients = ingredient.meals;
        // ingredients.forEach((e)=>{
        // //     var plate = '';
        // //     for()
        // })

    })
}