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

// Handle POST request for contacts search
app.post("/search", async (req, res) => {
  const searchTerm = req.body.search.toLowerCase();
  if (!searchTerm) {
    return res.send("<tr></tr>");
  }
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await response.json();

  const searchResults = users.filter((user) => {
    const name = user.name.toLowerCase();
    const email = user.email.toLowerCase();

    return name.includes(searchTerm) || email.includes(searchTerm);
  });

  const searchResultHtml = searchResults
    .map(
      (user) => `
    <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
    </tr>
`
    )
    .join("");

  res.send(searchResultHtml);
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});



// CHATGPT SUMMARY

// This Express server listens for POST requests to /search, reads the search text sent 
// from the client, fetches a list of users from an external API, filters them by matching the 
// search term with their name or email, and returns HTML table rows containing the matching users.