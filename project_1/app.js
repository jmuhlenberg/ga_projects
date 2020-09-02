//////////////////////////////////////////////////////////////////////////////////
/////////////                      PROJECT 1                         /////////////
//////////////////////////////////////////////////////////////////////////////////
//                            BY: JOHN MUHLENBERG                               //
//////////////////////////////////////////////////////////////////////////////////

//dropdown menu load
const dropSettings = {
  'async': true,
  'crossDomain': true,
  'url': "https://the-cocktail-db.p.rapidapi.com/list.php?c=list",
  'method': "GET",
  'headers': {
    "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    "x-rapidapi-key": "34f0d1bff2msh860868113bd74bdp1823d1jsn916576f5d4b6"
  }
}

const randomSettings = {
  "async": true,
  "crossDomain": true,
  "url": "https://the-cocktail-db.p.rapidapi.com/random.php",
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    "x-rapidapi-key": "6a1c8a34d3mshc45cb2ac78da84ap141335jsn7b451c0a5249"
  }
}

$(() => {

  //ajax to populate the dropdown categories
  $.ajax(dropSettings).done(function (response) {

    //function to get the size of the object
    const objectSize = (obj) => {
      let size = 0, key;
      for (key in obj){
        if(obj.hasOwnProperty(key)) size++
      }
      return size
    }
    //found the template for this funciton in the answer found here: https://tutorialrepublic.com/faq/how-to-get-the-value-of-selected-option-in-a-select-box-using-jquery.php

    //storing the size of the object
    let size = objectSize(response.drinks)

    //populate the dropdown menu
    for(i=0; i<size; i++){
      const catStr = $('<option>').attr('value', response.drinks[i].strCategory).text(response.drinks[i].strCategory)
      catStr.attr('id', i)
      const $categories = $('select[class="categories"]').append(catStr)
    }


    //when the form is submitted
    $('form').on('submit', (event) => {
      event.preventDefault()
      //ensure the display is empty
      $('.display-results').empty()

      //store the value the user selects
      const $selCat = $('.categories').children('option:selected').attr('value')
      const $selID = $('.categories').children('option:selected').attr('id')
      const updatedSelCat = $selCat.split(' ').join('_')
      //I discovered this information through: https://stackoverflow.com/questions/8743975/jquery-how-to-select-dropdown-item-based-on-value

      const selSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://the-cocktail-db.p.rapidapi.com/filter.php?c="+updatedSelCat,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key": "34f0d1bff2msh860868113bd74bdp1823d1jsn916576f5d4b6"
        }
      }

      $.ajax(selSettings).done(function (response) {
        const objectSize = (obj) => {
          let size = 0, key;
          for (key in obj){
            if(obj.hasOwnProperty(key)) size++
          }
          return size
        }

        let size = objectSize(response.drinks)

        //populate the results div
        for(i=0; i<size; i++){
          const result = $('<div class="result">')
          const imageLink = response.drinks[i].strDrinkThumb
          const name = response.drinks[i].strDrink
          const id = response.drinks[i].idDrink
          const image = $('<img>').attr('src', imageLink)

          //add the id value to the div
          result.attr('id', id)
          //append the image to the div
          result.append(image)
          //append the name of the drink
          result.append(name)

          //append the result to the display
          $('.display-results').append(result)
        }


        //when the result is clicked, open modal with the id
        $('.result').on('click', (event) => {

          //get the id
          const resultID = $(event.currentTarget).attr('id')

          const resSettings = {
            "async": true,
            "crossDomain": true,
            "url": "https://the-cocktail-db.p.rapidapi.com/lookup.php?i="+resultID,
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
              "x-rapidapi-key": "6a1c8a34d3mshc45cb2ac78da84ap141335jsn7b451c0a5249"
           }
          }

          $.ajax(resSettings).done(function (response) {

            //grab image link & create image
            const $imageLink = response.drinks[0].strDrinkThumb
            const $image = $('<img>').attr('src', $imageLink)

            //grab name & create
            const $nameStr = response.drinks[0].strDrink
            const $name = $(`<h2>${$nameStr}</h2>`)

            //grab ingredients
            const ingredients = []
            ingredients.push(response.drinks[0].strIngredient1)
            ingredients.push(response.drinks[0].strIngredient2)
            ingredients.push(response.drinks[0].strIngredient3)
            ingredients.push(response.drinks[0].strIngredient4)
            ingredients.push(response.drinks[0].strIngredient5)
            ingredients.push(response.drinks[0].strIngredient6)
            ingredients.push(response.drinks[0].strIngredient7)
            ingredients.push(response.drinks[0].strIngredient8)
            ingredients.push(response.drinks[0].strIngredient9)
            ingredients.push(response.drinks[0].strIngredient10)
            ingredients.push(response.drinks[0].strIngredient11)
            ingredients.push(response.drinks[0].strIngredient12)
            ingredients.push(response.drinks[0].strIngredient13)
            ingredients.push(response.drinks[0].strIngredient14)
            ingredients.push(response.drinks[0].strIngredient15)

            //filtering out all the 'null' values
            const filteredIng = ingredients.filter((element) => {
              return element !=null
            })

            //get the measurements
            const measurements = []
            measurements.push(response.drinks[0].strMeasure1)
            measurements.push(response.drinks[0].strMeasure2)
            measurements.push(response.drinks[0].strMeasure3)
            measurements.push(response.drinks[0].strMeasure4)
            measurements.push(response.drinks[0].strMeasure5)
            measurements.push(response.drinks[0].strMeasure6)
            measurements.push(response.drinks[0].strMeasure7)
            measurements.push(response.drinks[0].strMeasure8)
            measurements.push(response.drinks[0].strMeasure9)
            measurements.push(response.drinks[0].strMeasure10)
            measurements.push(response.drinks[0].strMeasure11)
            measurements.push(response.drinks[0].strMeasure12)
            measurements.push(response.drinks[0].strMeasure13)
            measurements.push(response.drinks[0].strMeasure14)
            measurements.push(response.drinks[0].strMeasure15)

            //filtering out all the 'null' values
            const filteredMeas = measurements.filter((element) => {
              return element !=null
            })

            //create a ul, create li's for each item in the array, append li's to the ul
            const $measurementsList = $('<ul>')
            for(i=0; i<filteredMeas.length; i++){
              const $listMeasIng = $('<li>').append(filteredMeas[i]).append(filteredIng[i])
              $measurementsList.append($listMeasIng)
            }

            //grab instructions
            const $instStr = response.drinks[0].strInstructions
            const $instructions = $(`<p>${$instStr}</p>`)

            const clickedRecipe = $('.result-ingredients')
            .append($image)
            .append($name)
            .append($measurementsList)
            .append($instructions)

            $('.results-modal').toggle()
          })

          $('#close').on('click',() => {
            $('.results-modal').hide()
            $('.result-ingredients').empty()
          })
        })
      })

    })
  })



  $('.surprise').on('click', () => {

    $('.display-results').empty()

    $.ajax(randomSettings).done(function (response) {

      //populate the results div
      const result = $('<div class="result random">')
      const imageLink = response.drinks[0].strDrinkThumb
      const name = response.drinks[0].strDrink
      const id = response.drinks[0].idDrink
      const image = $('<img>').attr('src', imageLink)

      //add the id value to the div
      result.attr('id', id)
      //append the image to the div
      result.append(image)
      //append the name of the drink
      result.append(name)

      //append the result to the display
      $('.display-results').append(result)

      $('.result').on('click', (event) => {

        //get the id
        const resultID = $(event.currentTarget).attr('id')

        const resSettings = {
          "async": true,
          "crossDomain": true,
          "url": "https://the-cocktail-db.p.rapidapi.com/lookup.php?i="+resultID,
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
            "x-rapidapi-key": "6a1c8a34d3mshc45cb2ac78da84ap141335jsn7b451c0a5249"
         }
        }

        $.ajax(resSettings).done(function (response) {

          //grab image link & create image
          const $imageLink = response.drinks[0].strDrinkThumb
          const $image = $('<img>').attr('src', $imageLink)

          //grab name & create
          const $nameStr = response.drinks[0].strDrink
          const $name = $(`<h2>${$nameStr}</h2>`)

          //grab ingredients
          const ingredients = []
          ingredients.push(response.drinks[0].strIngredient1)
          ingredients.push(response.drinks[0].strIngredient2)
          ingredients.push(response.drinks[0].strIngredient3)
          ingredients.push(response.drinks[0].strIngredient4)
          ingredients.push(response.drinks[0].strIngredient5)
          ingredients.push(response.drinks[0].strIngredient6)
          ingredients.push(response.drinks[0].strIngredient7)
          ingredients.push(response.drinks[0].strIngredient8)
          ingredients.push(response.drinks[0].strIngredient9)
          ingredients.push(response.drinks[0].strIngredient10)
          ingredients.push(response.drinks[0].strIngredient11)
          ingredients.push(response.drinks[0].strIngredient12)
          ingredients.push(response.drinks[0].strIngredient13)
          ingredients.push(response.drinks[0].strIngredient14)
          ingredients.push(response.drinks[0].strIngredient15)

          //filtering out all the 'null' values
          const filteredIng = ingredients.filter((element) => {
            return element !=null
          })

          //get the measurements
          const measurements = []
          measurements.push(response.drinks[0].strMeasure1)
          measurements.push(response.drinks[0].strMeasure2)
          measurements.push(response.drinks[0].strMeasure3)
          measurements.push(response.drinks[0].strMeasure4)
          measurements.push(response.drinks[0].strMeasure5)
          measurements.push(response.drinks[0].strMeasure6)
          measurements.push(response.drinks[0].strMeasure7)
          measurements.push(response.drinks[0].strMeasure8)
          measurements.push(response.drinks[0].strMeasure9)
          measurements.push(response.drinks[0].strMeasure10)
          measurements.push(response.drinks[0].strMeasure11)
          measurements.push(response.drinks[0].strMeasure12)
          measurements.push(response.drinks[0].strMeasure13)
          measurements.push(response.drinks[0].strMeasure14)
          measurements.push(response.drinks[0].strMeasure15)

          //filtering out all the 'null' values
          const filteredMeas = measurements.filter((element) => {
            return element !=null
          })

          //create a ul, create li's for each item in the array, append li's to the ul
          const $measurementsList = $('<ul>')
          for(i=0; i<filteredMeas.length; i++){
            const $listMeasIng = $('<li>').append(filteredMeas[i]).append(filteredIng[i])
            $measurementsList.append($listMeasIng)
          }

          //grab instructions
          const $instStr = response.drinks[0].strInstructions
          const $instructions = $(`<p>${$instStr}</p>`)

          const clickedRecipe = $('.result-ingredients')
          .append($image)
          .append($name)
          .append($measurementsList)
          .append($instructions)

          $('.results-modal').toggle()

        })

        $('#close').on('click',() => {
          $('.results-modal').hide()
          $('.result-ingredients').empty()
        })
      })
    })
  })
})
