
$(document).on("click", ".action", function (event) {
    event.preventDefault();
    var NewGiphy = $(this).attr("data-name");

    console.log(NewGiphy);

    // Call Giphy Apis 
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=T2auqmy8rdiVpaBq9jvIxP0c6yzn5ydN&q=" + NewGiphy + "&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

});

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

displayButtons()

// Function to clear page and add new Giphy 

// Function to remove Giphy 

// Function to Stop animation when click on the picture 


