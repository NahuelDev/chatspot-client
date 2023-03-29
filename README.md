# Chatspot

Chatspot is a chat application that allows you to connect with other people who are listening to the same song as you on Spotify. The application uses the Spotify API to fetch the current song and match you with other users who are listening to the same track.

![Chatspot client](https://raw.githubusercontent.com/NahuelDev/images/main/chatspot.png?token=GHSAT0AAAAAAB7UXLFYVCRPI67B4FRHW4Y4ZBEY4NA)

## Features

- Login with Spotify
- Automatically match with other users who are listening to the same song
- See all the other rooms
- Switch automatically to a new room if you change the song
- Can change/pause/resume the track if you have spotify premium
- Dark/Light mode

## Technologies

- React
- Material UI
- Socket.IO

## Installation

To install and run the client, follow these steps:

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Change `.env.example` to `.env`
3. Create a new Spotify app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and set all the required variables on `.env`
4. Start client with `npm run dev`

You also need to run the server that is found [here](https://github.com/NahuelDev/chatspot-server)

## Contributing

Contributions are welcome! Please follow the steps below to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them
4. Push your changes to your forked repository
5. Create a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.
