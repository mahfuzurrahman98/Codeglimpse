CodeGlimpse
===========

CodeGlimpse is an online platform that allows users to easily share and manage code snippets. It offers the convenience of making snippets private by adding a passcode for added security. Users can quickly log in and sign up using their Google account with just one click, giving them access to their code snippets stored in their personal library.

Technologies Used
-----------------

* **Frontend:** CodeGlimpse is built using React for the user interface and Tailwind CSS for styling, ensuring a responsive and visually appealing design.
* **Backend:** The backend of CodeGlimpse is powered by Python, utilizing the FAST API framework. We've chosen PostgreSQL as our database management system, and we interact with it using the SQLAlchemy ORM for seamless database operations.

Features
--------

* **Code Sharing:** Users can easily paste and share code snippets with others, making collaboration and knowledge sharing a breeze.
* **Privacy:** CodeGlimpse allows users to set a passcode for their snippets, keeping them private and secure.
* **One-Click Google Login:** We provide a seamless login experience with one-click Google authentication, simplifying user access to their personal code library.

Getting Started
---------------

To run CodeGlimpse locally, follow these simple steps:

1. Clone this repository to your local machine.
2. Install the required dependencies for both the frontend and backend:

   shellCopy code

   `cd frontend npm install`

   shellCopy code

   `cd backend pip install -r requirements.txt`
3. Configure the database connection in the backend settings.
4. Start the frontend and backend servers:

   shellCopy code

   `cd frontend npm start`

   shellCopy code

   `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`
5. Access CodeGlimpse by opening your web browser and navigating to `http://localhost:3000`.

Contribute
----------

We welcome contributions from the community! If you have ideas for improvements or would like to report any issues, please feel free to create a GitHub issue or submit a pull request.

License
-------

CodeGlimpse is open-source software released under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as per the terms of the license.

Enjoy sharing and managing your code snippets with CodeGlimpse!
