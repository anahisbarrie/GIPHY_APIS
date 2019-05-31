

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

            Rate = $("<div>")
            giphyrate = $("<div>");
            giphyrate.addClass("rate")
            giphyrate.attr("rating", results[i].images.rating);
            var p = $("<p>").text("Rating: " + results[i].images.rating);
            Rate.append(giphyrate);

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
            giphyImage.attr("data-state", "still");
            giphyImage.attr("class", "gif");



            //append inserts a content at the end of a selected element 
            giphyDiv.append(giphyImage);
            // giphyDiv.append('<br><a href="' + results[i].images.original.url);
            giphyDiv.append('<br>');
           
            $(".Giphs-View").prepend(giphyDiv); //.prepend insert content specified by parameter

        }
        $(".Giphs-View").prepend($("<p>Testing</p>"));
    });
    }

var topics = ["shoes", "dogs", "people", "bags", "happy", "italian"]

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

// Function to Stop animation when click on the picture 

// LISTEN FOR GIF CLICK TO MAKE MOVE (OR STILL)
$(document).on("click",".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// // add class to  all images
// giphyImage.addClass("gif");
// // add attributes requested 
// giphyImage.attr("src", gif);
// giphyImage.attr("data-animate", gif);
// giphyImage.attr("data-image", gifImg);
    // *
    // * gif
    // * img
    // *
    // * src -> gif
    // *
    // * img src=gif data-img="img" data-gif="gif"
    // *
    // * onClick -> src=?
    // * 
    // * if src == data-img
    // *  src = data-gif
    // * else
    // *  src = data-img
    // */

        // var src = $(this).attr('src')
        // console.log(src)



displayButtons();
addNewGiphyButton();
removeGiphy();
