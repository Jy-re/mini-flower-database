document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("myModal");
    var addButton = document.getElementById("btnAdd");
    var cancelButton = document.getElementById("cancelButton");
    var flowerForm = document.getElementById("flowerForm");
  
    addButton.addEventListener("click", function () {
      modal.style.display = "block";
    });
  
    cancelButton.addEventListener("click", function () {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  
    flowerForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Retrieve form data
      var formData = new FormData(flowerForm);
  
      // Add the CSRF token to the form data
      formData.append('csrfmiddlewaretoken', '{{ csrf_token }}');
  
      // Use fetch to send form data to the server
      fetch("/addmodal/", {
        method: "POST",
        body: formData,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Handle the response from the server if needed
          modal.style.display = "none"; // Close the modal after submission
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    });
  });
  