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

// Handle POST request for email validation
app.post("/email", (req, res) => {
  const submittedEmail = req.body.email;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(submittedEmail)) {
    return res.send(`
      <div class="mb-3" hx-target="this" hx-swap="outerHTML">
<label class="form-label">Email address</label>
<input
type="email"
class="form-control"
name="email"
hx-post="/email"
value="${submittedEmail}"
>
<div class="alert alert-success" role="alert">
That email is valid
</div>
</div>`);
  } else {
    return res.send(`
      <div class="mb-3" hx-target="this" hx-swap="outerHTML">
<label class="form-label">Email address</label>
<input
type="email"
class="form-control"
name="email"
hx-post="/email"
value="${submittedEmail}"
>
<div class="alert alert-danger" role="alert">
Please enter a valid email address
</div>
</div>`);
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});


// CHATGPT SUMMARY

// This server listens for POST requests to /email and checks whether the email the user typed
//  is valid using a regular expression.

// If the email is valid, it sends back the email input field along with a green success message.

// If it's invalid, it sends back the same input field but with a red error message.

// HTMX then replaces the email section on the page with the updated version, 
// giving instant feedback as the user types.