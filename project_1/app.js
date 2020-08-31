$(() => {

  //VARIABLES
  const dropSettings = {
  	'async': true,
  	'crossDomain': true,
  	'url': "https://cors-anywhere.herokuapp.com/https://the-cocktail-db.p.rapidapi.com/list.php?c=list",
  	'method': "GET",
  	'headers': {
  		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
  		"x-rapidapi-key": "34f0d1bff2msh860868113bd74bdp1823d1jsn916576f5d4b6"
  	}
  }

  //ajax to populate the dropdown categories
  $.ajax(dropSettings).done(function (response) {
  	// console.log(response);
    // console.log(response.drinks[0].strCategory);

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
    // console.log(size);

    //populate the dropdown menu
    for(i=0; i<size; i++){
      const catStr = $('<option>').attr('value', response.drinks[i].strCategory).text(response.drinks[i].strCategory)
      catStr.attr('id', i)
      const $categories = $('select[class="categories"]').append(catStr)
    }


    //when the form is submitted
    $('form').on('submit', (event) => {
      event.preventDefault()

      //store the value the user selects
      const $selCat = $('.categories').children('option:selected').attr('value')
      const $selID = $('.categories').children('option:selected').attr('id')
      const updatedSelCat = $selCat.split(' ').join('_')
      console.log($selCat);
      console.log(updatedSelCat);
      // console.log($selID);
      //I discovered this information through: https://stackoverflow.com/questions/8743975/jquery-how-to-select-dropdown-item-based-on-value


      //display the results using the selected value
      const settings = {
      	"async": true,
      	"crossDomain": true,
      	"url": "https://the-cocktail-db.p.rapidapi.com/filter.php?c="+updatedSelCat,
      	"method": "GET",
      	"headers": {
      		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      		"x-rapidapi-key": "34f0d1bff2msh860868113bd74bdp1823d1jsn916576f5d4b6"
      	}
      }

      $.ajax(settings).done(function (response) {
      	console.log(response);
        const objectSize = (obj) => {
          let size = 0, key;
          for (key in obj){
            if(obj.hasOwnProperty(key)) size++
          }
          return size
        }

        let size = objectSize(response.drinks)
        // console.log(size);

        //populate the results div
        for(i=0; i<size; i++){
          const result = $('<div class="result">')
          const imageLink = response.drinks[i].strDrinkThumb
          const name = response.drinks[i].strDrink
          console.log(imageLink);

          const image = $('<img>').attr('src', imageLink)

          //append the image to the div
          result.append(image)
          //append the name of the drink
          result.append(name)

          //append the result to the display
          $('.display-results').append(result)
        }

      })

    })
    event.trigger('reset')
  });



})
