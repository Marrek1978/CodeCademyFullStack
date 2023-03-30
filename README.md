# codecademy Ecommerce-pern-app
PERN app to provide typical functionality found in an ecommerce website.  Users can create accounts, view products, add products to a cart, and place/view orders.

## Running the app
`npm run dev`

Vite was used for the React Framework.  

This project requires a [PostgreSQL](https://www.postgresql.org/) database to be running locally.  

Reference the ERD diagram located in the `resources` folder of this repo to view the structure of the tables.  You can use [pgAdmin](https://www.pgadmin.org/) to interact with the database manually. 

This repo includes an `example.env` file that contains important environment variables for reference.  Make sure to create a `.env` file and include all variables found in the `example.env` file, replacing the example values with those specific to your environment/needs.

To easily populate your database with the requisite tables, `npm run create-db`.  This will create tables in your database if they do not already exist.  The configuration for this script can be found in the  `setupDatabase.js` file located in the server folder of this project.

Once the app is running locally, you can access it in a browser at `http://localhost:<your-port>`

## Resources

Server
Express


React Application
React Router - https://reactrouter.com/
- [REST Architecture](https://www.codecademy.com/articles/what-is-rest)
- [Using pgAdmin](https://www.pgadmin.org/docs/pgadmin4/development/getting_started.html)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
