console.log("JavaScript file loaded.");
document.addEventListener("DOMContentLoaded", function () {
    var addmodal = document.getElementById("myModal");
    var addButton = document.getElementById("btnAdd");

    addButton.addEventListener("click", function () {
      addmodal.style.display = "block";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target == addmodal) {
        addmodal.style.display = "none";
      }
    });

  
    // AJAX for editing
    document.querySelectorAll(".edit-button").forEach(function (editButton) {
      editButton.addEventListener("click", function () {
        var flowerId = editButton.getAttribute("data-flower-id");
        var editmodal = document.getElementById("editModal" + flowerId);
  
        // Log information for debugging
        console.log("Clicked Edit Button for Flower ID: " + flowerId);
        console.log("Edit Modal Element: ", editmodal);
  
        // Check if the editmodal element exists
        if (editmodal) {
          // Fetch flower data using AJAX
          fetch("/get_flower_data/" + flowerId + "/")
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              // Populate modal form fields with flower data
              document.getElementById("editFlowerName").value = data.flower_name;
              document.getElementById("editScientificName").value = data.scientific_name;
              document.getElementById("editSeason").value = data.season;
              document.getElementById("editHabitat").value = data.habitat;
              document.getElementById("editDescription").value = data.description;
  
              // Show the edit modal
              editmodal.style.display = "block";

              window.addEventListener("click", function(event){
                if (event.target == editmodal){
                  editmodal.style.display = "none";
                }

              })
            })
            .catch(function (error) {
              console.error("Error:", error);
            });
        } else {
          console.error("Edit modal not found for flower ID: " + flowerId);
        }
      });
    });
  });
  
//for delete
//for delete
document.querySelectorAll(".delete-button").forEach(function (deleteButton) {
    deleteButton.addEventListener("click", function () {
        console.error("Delete button clicked");
        // Declare flowerId within this function's scope
        var flowerId = deleteButton.getAttribute("data-flower-id");
        console.log("Delete button clicked for Flower ID: " + flowerId);
        // Confirm the deletion with the user (optional)
        var confirmDelete = confirm("Are you sure you want to delete this flower?");

        if (confirmDelete) {
            // Send an AJAX request to delete the flower
            $.ajax({
                url: "/delete_flower/" + flowerId + "/", // Use the correct URL path
                method: "POST", // Use POST or DELETE method
                data: {},
                headers: {
                    "X-CSRFToken": getCookie("csrftoken") // Include CSRF token from cookies
                },
                success: function (data) {
                    // Handle success (remove the row from the table)
                    deleteButton.closest("tr").remove();
                },
                error: function (error) {
                    // Handle error
                    console.error("Error:", error);
                }
            });
        }
    });
});