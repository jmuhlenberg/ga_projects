# Project #1: the mixologist

### Link: https://jmuhlenberg.github.io/ga_projects/project_1/

## Project Details & Instructions:

  For this project, we were required to use AJAX to make a request to an external data source and insert some of the data retrieved into the DOM, implement responsive design, and have one or more complex user interface modules.

  With the knowledge I've learned thus far, I developed a website using the RapidAPI 'The Cocktail DB.' I implemented JavaScript/jQuery/AJAX, HTML, and CSS to create a website that takes the user's input from a drop-down menu of categories from the database. Then, it will populate the web page with the selected results. There is a hidden 'random' button that will appear once the user hovers over it and will display one random drink.

  From there, the user can click one of the results and a modal will appear with a detailed list of ingredients and recipe. The 'x' button in the top right will close the modal and send the user back to the previous results screen allowing another result selection or select another category/random drink and populate those results.


## The Challenges:

  My first big challenge was figuring out how to use, store, and select information from a drop-down style menu. For this, I turned to StackOverflow (sited in my JS code). The next hurdle in this challenged was that I was receiving an object from the external database. I had to determine the size of this object and found useful information through Tutorial Republic. After this, I was able to collect the option from the drop-down and display the results.

  The next challenge was when a result was clicked to display further details. For this I used the id value and passed it through another search. Storing the data from the measurements and ingredients was tricky because I could not think of a way to loop through the information since each key had a numerical value at the end of it, so I stored all possible 15 into an array then cleaned up the array to push to the display.

  The last challenge was setting up the random button, however, this was fairly simple after completing the other parts of the project. It required less logic because it was only storing one result. To display the details of the result, the best was I could think of completing this task was to copy and paste the code from earlier (very likely could be cleaned up later).


## Areas of Improvement:

  I believe that one big area of improvement would be to remove the RapidAPI DB url and settings and set it outside of the jQuery on load function.

  Another area of improvement would be to remove the other 'copy & paste' type variables and code. Like for the measurements and ingredients and the results-on-click modal display.
