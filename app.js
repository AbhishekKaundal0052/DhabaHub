let title = document.getElementById('title');
let footer = document.querySelector('footer');
let home = document.getElementById('home')
let random = document.getElementById("random")
let result = document.getElementById('search-results')
let close1 = document.getElementById('close');
let recipe = document.getElementById('recipe')

home.addEventListener('click', function () {
    document.getElementById('descr').style.display = "block";
    title.style.display = "none";
    result.style.display = "none";
    recipe.style.display = "none";
    body.style.backdropFilter = "blur(0px)"
    descr.style.filter = "blur(0px)";
    close1.style.display = "none";

})

function showResult(input) { // to show the searched results
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
            <img src ="${many.strMealThumb}" class="grid" id="${many.idMeal} alt"error">
            <br>
            <br>
            <p class= "names1"> ${many.strMeal}</p>
            </div>`
                result.innerHTML = rest;
    // function getRecipe(meal) {
    //                 fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772')
    //                     .then()}
    //         })
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
)}


let names1 = document.getElementsByClassName('names1')
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('names1')) {
        recipe.style.display = "flex";
        result.style.filter = "blur(4px)";
        title.style.filter = "blur(4px)";
        body.style.backdropFilter = "blur(4px)";
        recipe.style.top = "30%";
        close1.style.display = "flex";
        close1.style.top = "27%"
    }
});

let names = document.querySelector('.name');
document.getElementById('sbutton').addEventListener('click', function () {
    var input = document.querySelector('#result').value;
    if (input.trim() === "") {
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

let body = document.querySelector('body')
let descr = document.querySelector('#descr');
let indGrid = document.getElementById('indGrid')
let instr = document.getElementById('instr')

random.addEventListener('click', function () {
    recipe.style.display = "flex";
    descr.style.filter = "blur(4px)";
    body.style.backdropFilter = "blur(4px)";
    close1.style.display = "flex";
    // body.style.overflow = "hidden";

});

function getData() { // random meal on page
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res) => {
            return res.json();
        })
        .then((real) => {
            const meal = real.meals[0];
            
                random.innerHTML += `
                <img src="${meal.strMealThumb}" id="randomImg" class="img" alt="error">
                <br><br>
                <p class="name">${meal.strMeal}</p>
            `;

                for (let i = 1; i <= 20; i++) {
                    if (`${meal['strIngredient' + i]}` === "" || `${meal['strIngredient' + i]}` === null) {
                        break
                    }
                    else {
                        indGrid.innerHTML += `<ul><li>${meal['strIngredient' + i]}</li></ul>`;
                    }
                    instr.innerHTML = `<h2>INSTRUCTIONS:</h2>
            <br>
            ${meal.strInstructions}`;
                }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}
getData();

close1.addEventListener('click', function () {
    // document.getElementById('descr').style.display = "block";
    recipe.style.display = "none";
    body.style.backdropFilter = "blur(0px)"
    descr.style.filter = "blur(0px)";
    close1.style.display = "none";
    result.style.filter = "blur(0px)";
    title.style.filter = "blur(0px)";
    body.style.overflow = "auto";
})


