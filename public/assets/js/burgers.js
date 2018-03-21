//need to add create and update burger options
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-devour").on("click", function(event) {
    event.preventDefault();

    var id = $(this).data("id");
    // var newDevour = $(this).data("newdevour");

    // var newDevourState = {
    //   devoured: newDevour
    // };

    // Send the PUT request which updates the database with change in devour
    $.ajax("/api/burgers/" + id, {
      method: "PUT",
      data: {
        devoured: true
      }
    }).then(
      function() {
        console.log("changed devour to true");
        
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
//takes user create burger and adds it to the database with a default devoured state of 0 or false
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    //create a new burger with the default of not devoured
    var newBurger = {
      burger_name: $("#bu").val().trim(),
      devoured: 0
    };

    // Send the POST request for the new burger
    $.ajax("/api/burgers", {
      method: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      method: "DELETE",
    }).then( 
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // This function grabs todos from the database and updates the view
  // function getBurgers() {
  //   $.get("/api/burgers", function(data) {
  //     burgers = data;
  //     // Reload the page to get the updated list
  //     location.reload();
  //   });
  // }
});

//testing to see if code is being registered
// function listening() {
//   console.log("javascript burgers.js is listening");
// };

// listening();

