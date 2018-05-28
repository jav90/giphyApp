//https://api.giphy.com/v1/gifs/search?api_key=yP2LajMsCgjqFCgJq6lFyBueM9zvjOAt&q=charmander&limit=10&offset=0&rating=PG&lang=en

content_array = ["soccer","football","basketball","tennis","lacrosse","triathlon"];

//Build the query URL and returns a string with it
function buildQueryURL(search_term) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?";
    var api_key = "yP2LajMsCgjqFCgJq6lFyBueM9zvjOAt";
    var q = search_term;
    var limit = 12;
    var offset = 0;
    var rating = "PG";
    console.log("https://api.giphy.com/v1/gifs/search?api_key=yP2LajMsCgjqFCgJq6lFyBueM9zvjOAt&q="+q+"&limit=12&offset=0&rating=PG&lang=en");
    
    return ("https://api.giphy.com/v1/gifs/search?api_key=yP2LajMsCgjqFCgJq6lFyBueM9zvjOAt&q="+q+"&limit=12&offset=0&rating=PG-13&lang=en");
}

//Updates the button section
function buttonUpdate(){
    $('.gif_buttons').empty();
    for(let i=0;i<content_array.length;i++){
        let new_button = $('<button>');
        new_button.addClass('giphy');
        new_button.addClass('button');
        new_button.text(content_array[i]);
        $('.gif_buttons').append(new_button);
    }
}

//clears gifs and buttons
function clear(){
    $('.gif_buttons').empty();
    $('.gif_images').empty();
}

//Updates the gif section
function updatePage(giphy_data){
    console.log(giphy_data);
    data = giphy_data.data;
    console.log(data[0]);
    
    for(let i=0;i<12;i++){
        let new_gif = $('<img>');
        new_gif.addClass('gif');
        new_gif.addClass('button');
        new_gif.attr('data-still',data[i].images.original_still.url);
        new_gif.attr('data-animate',data[i].images.original.url);
        new_gif.attr('data-state',"still");
        new_gif.attr('src',data[i].images.original_still.url);
        console.log(new_gif.attr('src'));
        
        $('.gif_images').append(new_gif);
    }
    
}




$(document).ready(function(){
    buttonUpdate();

    // .on("click") function associated with the Search Button
    $(document).on("click", ".giphy", function(event) {
        console.log(event.target);
        
        event.preventDefault();
        $('.gif_images').empty();
        let search_term;
        if($(event.target).hasClass('submit')){
            search_term = $('.search_bar').val().trim();
            content_array.push(search_term);
            buttonUpdate();
            console.log("search bar");
        } else {
            search_term = event.target.textContent.trim();
        }
        search_term.replace(" ", "-");
        console.log(search_term);
        
        // Build the query URL for the ajax request to the NYT API
        var queryURL = buildQueryURL(search_term);
    
        // Make the AJAX request to the API - GETs the JSON data at the queryURL.
        // The data then gets passed as an argument to the updatePage function
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(updatePage);
    });

    $(document).on("click",".gif", function(event){
        console.log(event.target);
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});

