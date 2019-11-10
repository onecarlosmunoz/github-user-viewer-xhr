class GitHub {
  constructor() {
    this.http = new XMLHttpRequest();
    this.client_id = 'ENTER OAUTH CLIENT ID FROM GITHUB HERE';
    this.client_secret = 'ENTER OAUTH CLIENT SECRET FROM GITHUB HERE';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  // Get user info from GitHub
  getUser(user, callback) {
    this.http.open('GET', `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`, true);

    // Create reference to avoid calling 'this' inside onload function
    let self = this;
   
    this.http.onload = () => {
      if(self.http.status === 200) {
        // If OK, we return no errors with profile info
        const profile = JSON.parse(self.http.responseText);
        callback(false, profile);
      } else {
        // Else, we return an error
        callback(true, null);
      }
    }

    this.http.send();
  }

  // If user doesn't exist, this function won't be called
  //  Get repos info from GitHub
  getRepos(user, callback) {
    this.http.open('GET', `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`, true);

    let self = this;

    this.http.onload = () => {
      if (self.http.status === 200) {
        // If OK, we return the repos
        const repos = JSON.parse(self.http.responseText);
        callback(repos);
        
      } else {
        callback(null);
      }
    }

    this.http.send();
  }
}