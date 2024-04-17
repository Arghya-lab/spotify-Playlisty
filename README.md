# React Spotify Playlist Generator

This React web application allows users to create Spotify playlists by providing a playlist name and data in JSON format. The application utilizes the Spotify API to generate the playlist based on the provided data.

## Features

- Input field for entering the playlist name.
- Text area for providing playlist data in JSON format.
<!-- - Validation to ensure the correctness of the JSON format. -->
- Integration with the Spotify API to create playlists.
- Display of success or error messages upon playlist creation.

## Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/react-spotify-playlist-generator.git
```

Navigate to the project directory:

```bash
cd react-spotify-playlist-generator
```

Install dependencies:

```bash
npm install
```

Create a Spotify Developer account and register your application to obtain the client ID and client secret. Create a <code>.env</code> file in the root directory of the project and add the following:

```
REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
REACT_APP_SPOTIFY_CLIENT_SECRET=your_client_secret
REACT_APP_REDIRECT_URI=http://localhost:3000/callback
```

Replace <code>your_client_id</code> and <code>your_client_secret</code> with your actual Spotify client ID and client secret.</p><h2>Usage</h2><ol><li>Start the development server:</ol></li>

```bash
npm start
```

<ol start="2"><li><p>Open your browser and go to <code>http://localhost:3000</code>.</p></li>
<li><p>Input the playlist name and provide the playlist data in JSON format in the designated text area.</p></li>
<li><p>Click on the "Generate Playlist" button.</p></li>
<li><p>You will be redirected to the Spotify login page. Log in with your Spotify credentials.</p></li>
<li><p>After successful authentication, the playlist will be created in your Spotify account.</p></li>

</ol>
<h2>Contributing</h2>
<p>Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.</p><h2>License</h2><p>This project is licensed under the MIT License. See the <a target="_new">LICENSE</a> file for details.</p>
</ol>
