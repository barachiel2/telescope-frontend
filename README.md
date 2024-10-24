# Steps to Run the App with Docker

## 1. Clone the repository:

   git clone https://repo-url.git
   cd your-repo-folder

## 2. Create a .env file in the root of the project with the content that will be provided to you.
REACT_APP_API_URL=

## 3. Build and run the app using Docker:
docker-compose up --build

# To stop the Docker containers:
docker-compose down

# Additional Notes
The app runs on http://localhost:3000.
Ensure Docker and Docker Compose are installed before running the commands.
The backend is expected to run on http://localhost:8000. You can modify the .env file if needed.

# Debugging
## To view logs for the frontend service:
docker-compose logs frontend