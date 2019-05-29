

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
            var giphyImage = $("<img>");
            var giphyDiv = $("<div>");
            
            // add class to  all images
            giphyImage.addClass("gif");
            // add attributes requested 
            giphyImage.attr("src", results[i].images.fixed_height_small.url);
            giphyImage.attr("data-original", results[i].images.original.url);
            giphyImage.attr("data-animate", results[i].images.fixed_height.url);

            //append inserts a content at the end of a selected element 
            giphyDiv.append(giphyImage);
            giphyDiv.append('<br><a href="' + results[i].images.original.url);
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

displayButtons();
addNewGiphyButton();
removeGiphy();

// Function to Stop animation when click on the picture 
