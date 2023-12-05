# Bookstore POS System
- [Korean](https://github.com/zake-dev/bookstore-pos-react/blob/main/README-KR.md)

❓ Problem : My father's bookstore has an outdated book management POS program. It was created by a Windows developer and distributed for a fee. It has a lot of complex features, such as membership management, book arrival and departure record management, inventory management, and receipt calculation, but there are not many features that my father has been using for 10 years. On the other hand, even though he paid for the license, every time his computer crashed or he needed to install the program on a new PC, he had to contact the developer and pay an additional fee to have it installed. I wondered if there was any way I could help him.  😮

‼ Idea : Wouldn't it be great if I could just pick out the features he uses the most and develop them for him? 🤔

💯 Solution : Let's write a bookstore POS system as a React application and port it to a desktop version with ElectronJS! 😁

## Screenshots

<p float="left">
  <img src="./screenshots/판매하기1.png" width="450" height="250" />
  <img src="./screenshots/판매하기2.png" width="450" height="250" />
  <img src="./screenshots/입고하기2.png" width="450" height="250" />
  <img src="./screenshots/반품하기1.png" width="450" height="250" />
  <img src="./screenshots/입출고기록2.png" width="450" height="250" />
  <img src="./screenshots/재고관리1.png" width="450" height="250" />
</p>

## Key Features

- **Sell**: This feature allows you to load books from your inventory that you want to sell and settle the price and inventory. You can apply a bulk discount for the entire book. If the book is not found in your inventory, you can proceed to the `Inventory` screen to process the inventory.
- **Inventory**: This is a function to register books in the bookstore before selling. If the book exists in the DB, you can only change the quantity, and if the book does not exist, you can register a new book. Leave an 'innput/output record` with where the book was purchased.
- **Return**: This is a feature that allows you to process returns to a specific purchasing organization. The quantity will be changed in the inventory and an entry will be made.
- **Inventory log**: This is a feature that allows you to collect records of sales/receipts/returns by date and type and save them as an Excel file.
- **Inventory Management**: This is an Admin function that allows you to search, edit, delete, etc. all books currently registered in the system. You can change the quantity, book information, etc.
- **Barcode Scan**: The barcode on the back of all books distributed in Korea matches the ISBN. We have designed autofocus on the book search input box on the `Sell`, `Inventory`, and `Return` screens so that you can read the book directly with a barcode scanner.
- **Utilize public book search API**: When registering a new book, basic book information can be retrieved using the web API.

## Project Development Duration

- Planning & Implementing MVP: 24/01/2021 ~ 11/02/2021

## Tech Stack

- Frontend: TypeScript, React, Material UI, Webpack
- Backend: PostgreSQL

## Reflection

- To solve the same problem, I implemented the program with PyQT and SQLite in the first half of 2020. Later, I wanted to study web development, so I redeveloped the project by redesigning the UI/UX and moving the database to the web (ElephantSQL).
- It was my first React project, so I was immature in separating code concerns, project structure, and state management. I tried to manage global state with React's built-in `useReducer` instead of Redux, and the code lines were incredibly long because it wasn't modularized enough.
- However, in the short time I had, I was able to fulfill the required functionality. The application was created a week before leaving home due to military service, so I was unable to maintain it properly, but father told me that he used it well without any inconvenience until recently when I finished my military service. I think this is the first service that has a well planned MVP and delivered it to users in the shortest time.
- I worked so hard on it that I spent every waking moment except for eating and sleeping. I would sit down with my dad and talk through the feature requirements, draw screens in a notebook to finalize the screen design, and look at the React docs, Material UI docs, Stack Overflow, etc. to try to implement the feature somehow. Due to the time crunch, I often Ctrl-C and Ctrl-V the existing screens I created instead of taking care of the reusability of the components, which would have been better if I had refactored them later. I still remember the feeling of pride when I saw my dad actually using the application in a bookstore.
- I've heard that many small neighborhood bookstores still use paper ledgers to manage their books, either because they can't afford to buy a program like this or because they don't see the need for it. Although I haven't developed the application further because father was closing the bookstore and moving on to other things, I'd love to see this source available to other small bookstores for free. Of course, there's a lot of polishing to be done. 😁 .
