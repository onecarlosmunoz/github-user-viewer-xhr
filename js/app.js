// Init github.js
const github = new GitHub();
const ui = new UI();

// Get the search input field
const searchUser = document.getElementById('search-input');

// For every keypress, we search for a user
searchUser.addEventListener('keyup', (e) => {
  const userText = e.target.value;

  if(userText !== '') {
    // If not blank, make HTTP call and 
    // format response in callback function
    github.getUser(userText, (error, user) => {

      if(error) {
        // If user is not found, create alert message
        ui.showAlert(userText, 'danger')

      } else {
        // We dont want to display 'null' in the front end.
        // So, if some JSON key has a null value, we assign 
        // it with a string value depending on the key.

        if(user.name === null) {
          user.name = '';
        }

        if(user.bio === null) {
          user.bio = '';
        }

        if(user.company === null) {
          user.company = "None";
        }

        if(user.blog === '') {
          user.blog = 'None';
        }
        
        if(user.email === null) {
          user.email = 'None';
        }

        ui.showProfile(user);

        // Nested HTTP call to obtain user's repos
        github.getRepos(userText, (reposData) => {
          repos = reposData;
          ui.getRepos(repos);
        });
      }
    });
    
  } else {
    // Clear the created UI if field is emptied
    ui.clearProfile();
  }
});