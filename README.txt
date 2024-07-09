
Description:
The TwubricGrid component is a React application designed to display and manage a grid of Twitter followers. It fetches mock follower data (or can be integrated with a real Twitter API), allows sorting by various Twubric metrics, and filtering by join date. Users can also remove followers from the grid.

Features:

* Fetches and displays Twitter follower data in a grid format.
* Each follower card shows their profile image, fullname, username, Twubric scores, join date, and a remove button.
* Sortable by Twubric Score, Friends, Influence, and Chirpiness.
* Filterable by start and end join dates.
* Implements mock data fetching (easily replaceable with actual API integration).
* Utilizes React Bootstrap for styling and layout.

Usage:

1. Install Dependencies:
   Make sure you have Node.js and npm (or yarn) installed. Run the following command to install project dependencies:

   ```bash
   npm install
   # or
   yarn install