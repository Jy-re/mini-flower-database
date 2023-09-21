document.addEventListener("DOMContentLoaded", function () {
    var addmodal = document.getElementById("myModal");
    var addButton = document.getElementById("btnAdd");
    var cancelButton = document.getElementById("cancelButton");
    var flowerForm = document.getElementById("flowerForm");
  
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
  