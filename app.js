

$(document).on("click", ".action", function (event) {
    event.preventDefault(); // everytime if you have a form with type submit 
     var NewGiphy = $(this).attr("data-name");
    console.log(NewGiphy);
    showGiphys(NewGiphy)
});

// Call Show Giphy 
function showGiphys(NewGiphy) {
    $(".Giphs-View").empty();
        // var NewGiphy = $(this).attr("data-name"); //this retunrs the value of the first match element 
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=T2auqmy8rdiVpaBq9jvIxP0c6yzn5ydN&q=" + NewGiphy + "&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        var results = response.data;
        console.log(results);
  

        for (var i = 0; i < results.length; i++) {

            // Se solicita mostrar el rating de las imagen. Se crea un nuevo <div>, se agrega el attribute con el link especifico de acuerdo a la data, se inserta con el .append en el html, y tambien se muestra .prepend en el espacio determinado que se quiere mostrar. 
            Rate = $("<div>")
            giphyrate = $("<div>");
            giphyrate.addClass("rate")
            giphyrate.attr("rating", results[i].rating);
            var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
            Rate.append(giphyrate);
            Rate.append(p);
            console.log(giphyrate);


            var giphyImage = $("<img heigh= '250px' width='250px'>");
            var giphyDiv = $("<div>");
            var gif = results[i].images.original.url
            var gifImg = results[i].images.original_still.url
            
            // add class to  all images
            giphyImage.addClass("gif");
            // add attributes requested 
            giphyImage.attr("src", gifImg);
            giphyImage.attr("data-still", gifImg);
            giphyImage.attr("data-animate", gif);
            giphyImage.attr("today", "tomorrow");
            giphyImage.attr("class", "gif");

            //append inserts a content at the end of a selected element 
            giphyDiv.append(giphyImage);
            // giphyDiv.append('<br><a href="' + results[i].images.original.url);
            giphyDiv.append('<br>');
           
            
            $(".Giphs-View").prepend(Rate); 
            $(".Giphs-View").prepend(giphyDiv); //.prepend insert content specified by parameter

        }
        $(".Giphs-View").prepend($("<p>*Click on image to see animation*</p>"));
    });
    }

var topics = ["shoes", "dogs", "people", "bags", "happy", "italian", "classes", "coding", "sumer", "spring"]

// Function that creates initial buttons from the topics array
function displayButtons() {
    $(".Current-Giphs").empty();

    for (var i = 0; i < topics.length; i++) {
        var btns = $("<button>");
        btns.addClass("action");
        btns.addClass("btn btn-primary");
        btns.attr("data-name", topics[i]);
        btns.text(topics[i]);
        $(".Current-Giphs").append(btns);
        console.log(i);
    }
}

// Function to clear page and add new Giphy 
function addNewGiphyButton() {
    $("#addGiphy").on("click", function () {
        var action = $("#action-input").val().trim();
        topics.push(action);
        displayButtons();
        return false;
    })
}

// Function to remove Giphy 
function removeGiphy() {
    $("#removeGif").on("click", function () {
        topics.pop();
        displayButtons();
        return false;
    });
}
// LISTEN FOR GIF CLICK: Se crea un attribute momentaneo para intercambiar el source when click. El attribute puede tener cualquier nombre con cualquier valor.
$(document).on("click",".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var x = $(this).attr("today");
    // var x = "tomorrow" -- it is the same than line 106
    if (x === "tomorrow") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("today", "yesterday");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("today", "tomorrow");
    }
});


displayButtons();
addNewGiphyButton();
removeGiphy();
