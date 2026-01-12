import express from 'express';

// Initialize an express app and store in variable 'app'
const app = express();

// MIDDLEWARE
// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle GET request to fetch users
app.get('/users', async (req, res)  => {
//   const users = [
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Bob Williams' },
//     { id: 3, name: 'Shannon Jackson'},
//     ];

  setTimeout(async ()=> {
  const limit = +req.query.limit || 10;

  const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
  const users = await response.json();

    res.send(`
        <br>
        <h2>Users</h2>
        <ul class="list-group">
        ${users
            .map((user)=>`<li class="list-group-item">${user.name}</li>`)
            .join('')}
        </ul>
    `);
    }, 2000);
});


// Start the server
app.listen (3000, ()=>{
console.log('Server listening on port 3000');
});



// CHATGPT SUMMARY

// This is an **Express.js server** that:

// - Serves static files from a `public` folder
// - Has a `/users` endpoint that fetches user data from the JSONPlaceholder API (with a configurable limit)
// - Adds a 2-second delay before responding
// - Returns the users as an HTML list formatted with Bootstrap classes
// - Runs on port 3000

// It's designed to work with the HTMX frontend you showed earlier—when the button is clicked, 
// this server fetches real user data and returns HTML that HTMX injects into the page.