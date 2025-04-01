# Web-Dev-Project - Music Discovery App

## Overview
Music Discovery App is a web application that helps users find new music through curated album packs. Users can create, share, and explore collections of albums, fostering a community-driven music discovery experience.

This project is built using:
- **Frontend**: Angular
- **Backend**: Django + Django REST Framework (DRF)
- **Database**: PostgreSQL (or any preferred database supported by Django)
## Features
- User authentication (Sign up, Login, Logout)
- Browse and search for albums
- Create and manage album packs
- Like and save album packs
- Customize and discover user profiles
### Possible additional features
- Share albums packs
- Comment on albums packs
- OAuth2 authentication

## Installation

### Backend (Django + DRF)
1. Clone the repository:
```sh
git clone https://github.com/n-n06/Web-Dev-Project
cd backend
    ```
2. Create a virtual environment:
    ```sh
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
    ```
3. Install dependencies:
    ```sh
pip install -r requirements.txt
    ```
4. Set up environment variables (create a `.env` file in the backend directory):
```env
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
DEBUG=True
SPOTIFY_API_KEY=spotify_api_key

//any other necessary env vars
```
5. Run migrations:
    ```sh
python manage.py migrate
    ```
6. Start the development server:
    ```sh
python manage.py runserver
    ```

### Frontend (Angular)
1. Navigate to the frontend directory:
    ```sh
cd ../frontend/music-app
    ```
2. Install dependencies:
    ```sh
npm install
    ```
3. Start the Angular development server:
    ```sh
ng serve
    ```

**Note:** make sure to use different ports for backend and frontend. 
## API Overview
The backend provides RESTful APIs for interacting with the music discovery system. Below are the core endpoints:

| Endpoint                | Method | Description                                             |
| ----------------------- | ------ | ------------------------------------------------------- |
| `/api/auth/login/`      | POST   | User login                                              |
| `/api/auth/register/`   | POST   | User registration using username, email and password    |
| `/api/albums/`          | GET    | Get all albums                                          |
| `/api/albums/{id}/`     | GET    | Get a specific album                                    |
| `/api/packs/`           | GET    | Get all album packs                                     |
| `/api/packs/`           | POST   | Create a new album pack                                 |
| `/api/packs/{id}/`      | GET    | Get a specific album pack                               |
| `/api/packs/{id}/`      | UPDATE | Update album pack information (name, description, etc.) |
| `/api/packs/{id}/like/` | POST   | Like an album pack                                      |

Logic related to obtaining album information will probably be implemented using an external REST API like the Spotify API.
Logic related to creating album packs would be implemented by us.
## Data Models (Interfaces for Frontend)
### Album
```ts
interface Album {
  id: number;
  title: string;
  artist: string;
  coverImageUrl: string;
  releaseDate: string;
  genre: string;
}
```

### Album Pack
```ts
interface AlbumPack {
  id: number;
  title: string;
  description: string;
  creator: User;
  albums: Album[];
  likes: number;
  createdAt: string;
}
```
### User
```ts
interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
}
```

## Authors
- Torekhan Ernur 🖥️🏌️
- Yamane Yumi 🌐👩‍🎨
- Zhantuar Nursultan 💻🎹
## License
This project is licensed under the MIT License.
