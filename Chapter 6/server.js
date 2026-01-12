import express from "express";

// Initialize an express app and store in variable 'app'
const app = express();

// MIDDLEWARE
// Set static folder
app.use(express.static("public"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle GET request for profile edit
app.get("/user/:id/edit", (req, res) => {
  // send an HTML form for editing
  res.send(`
      <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input 
          type="text" 
          class="form-control" 
          id="name" 
          name="name" 
          value="Greg Lim">
        </div>

        <div class="mb-3">
          <label for="bio" class="form-label">Bio</label>
          <textarea type="text" class="form-control" id="bio" name="bio">Coding is my hobby! 
          Watch this space!
          </textarea>
        </div>

        <button type="submit" class="btn btn-primary">
        Save Changes
        </button>

        <button type="submit" hx-get="/index.html"
        class="btn btn-secondary">
        Cancel
        </button>
      </form>
`);

  // Handle PUT request for editing
  app.put("/user/:id", (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;
    // Send the updated profile back
    res.send(`
        <div class="card" style="width: 18rem;"
          hx-target="this"
          hx-swap="outerHTML">

          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">
            ${bio}
            </p>

            <button href="#" class="btn btn-primary"
            hx-get="/user/1/edit">
            Click To Edit
            </button>
          </div>
    </div>
`);
  });

});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});


// CHATGPT SUMMARY

// This Express server lets a user view and edit a profile card using HTMX — without 
// refreshing the whole page.

// 🟦 1. Basic Setup

// The server uses Express to handle requests.

// It serves static files from the public folder.

// It can read form data and JSON sent from the webpage.

// ✏️ 2. When someone clicks “Edit” on the profile card…

// HTMX sends a GET request to:

// /user/1/edit


// The server responds with an HTML form containing:

// A name input (pre-filled with "Greg Lim")

// A bio text area

// A Save Changes button

// A Cancel button

// The form uses HTMX to:

// Send an hx-put request to /user/1 when saved

// Replace itself with the updated profile

// 💾 3. When the “Save Changes” button is clicked…

// HTMX sends a PUT request to:

// /user/1


// The server receives the updated:

// name

// bio

// Then it sends back a new profile card containing the updated information.

// HTMX replaces the edit form with this updated card automatically.