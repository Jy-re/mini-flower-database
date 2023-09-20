// Wrap all your JavaScript code in a DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    // Move the code inside this event listener
    var modal = document.getElementById("myModal");
    var addButton = document.getElementById("btnAdd");
    var flowerForm = document.getElementById("flowerForm");
  
    addButton.addEventListener("click", function () {
      modal.style.display = "block";
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

    // Add an event listener for each "Edit" button
    document.querySelectorAll('.edit-button').forEach(function(editButton) {
        editButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModalId = this.getAttribute('data-target');
            const editModal = document.querySelector(targetModalId);
            editModal.style.display = 'block';
        });
    });

    // Add an event listener for the edit modal's cancel button (similar to add modal)
    const editCancelButton = document.getElementById("editCancelButton");
    editCancelButton.addEventListener("click", function () {
        const editModals = document.querySelectorAll('.modal');
        editModals.forEach(function(editModal) {
            editModal.style.display = "none";
        });
    });

    // Add an event listener for clicking outside the edit modal (similar to add modal)
    window.addEventListener("click", function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});
