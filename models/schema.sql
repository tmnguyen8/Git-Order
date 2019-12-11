DROP DATABASE IF EXISTS gitOrder;
CREATE DATABASE gitOrder;
use gitorder;

insert into Menus (Name, Ingredients, Cost, URL) values ("Homewrecker", "guac, seasoned rice, beans, shredded cheese, steak, tortilla", 10, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/Homewrecker.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Wrong-Doug", "queso, pico de gallo, beans, shredded cheese, steak, tortilla, crunchy corn shell x2", 9, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/WrongDoug.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Big Mac", "pickles, onions, cheese, lettuce, big mac sauce, hamburger x2, sesame seed buns", 5, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/BigMac.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Bacon Cheeseburger", "beef burger, bacon, cheese, bun", 11, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/FiveGuysCheeseBurger.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Chicken Popeyes", "chicken", 7, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/popeyeschicken.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Chicken Sandwich", "breaded chicken, soft bun, tart pickles", 4, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/ChikFilASandwich.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Spicy Chicken Sandwich", "breaded spicy chicken, soft bun, tart pickles, pepperjack cheese", 4, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/SpicyChickenSandwichChikFilA.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Mcnuggets", "chicken", 6, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/McNuggets.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Chicken Fingers", "seasoned breaded chicken", 2, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/CanesFingers.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Cheesy Gordita Crunch", "double tortilla, hard soft shell, cheese, ground beef, lettuce, baha sauce", 4, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/CheesyGorditaCrunch.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Soft Tacos", "soft tortilla, ground beef, cheese, sour cream, guac", 8, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/ChickenSoftTaco.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Roast Beef Sandwich", "sesame bun, cold cut roast beef, cheddar cheese, arby's sauce", 4, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/RoastBeefSandwich.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Chicken Quesadilla", "tortilla, cheese, chicken, roasted onions, roasted peppers, tangy spicy sauce", 4, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/ChickenQuesadilla.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Filet-O-Fish", "square fish, american cheese, soft bun, tarter sauce", 5, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/FiletOFish.png');
insert into Menus (Name, Ingredients, Cost, URL) values ("Frosty", "milk, chocolate, sugar, icecream", 3, 'https://raw.githubusercontent.com/tmnguyen8/Git-Order/master/public/images/WendysFrosty.png');

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
