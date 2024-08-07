# Chat-app

**Chat-app** is a chat application that allows users to communicate in real-time. Users can create an account, log in, change their password, and start chatting with other users.

## Features

- **Registration:** Create a new user account.
- **Login:** Log in to the application with an existing account.
- **Real-time Chat:** Send and receive messages instantly between users.
- **Change Password:** Option to change the password for increased account security.

## Setup using Docker

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/Chat-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Chat-app
   ```

3. Build the Docker containers:
   ```bash
   docker-compose build
   ```

4. Start the Docker containers:
   ```bash
   docker-compose up -d
   ```

## Usage

1. Open your browser and go to http://localhost:3000.
2. Create an account on the registration page.
3. Log in with your credentials.
4. Start chatting with other users in real-time.
## Development

If you want to further develop this application, you need to run the backend and the PostgreSQL database using Docker, and start the frontend manually.

1. Start the PostgreSQL database and backend containers:
   ```bash
   docker-compose up -d
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. Start the frontend application:
   ```bash
   npm start
   ```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/new-feature

   ```
3. Make your changes and commit them:
   ```bash
   git commit -am 'Add new feature'

   ```
4. Push your changes to your branch:
   ```bash
   git push origin feature/new-feature
   ```
5. Open a Pull Request.

Thank you for using Chat-app! If you have any questions or issues, feel free to contact us.
