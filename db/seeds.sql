
INSERT INTO `laundromat_db`.`laundromats` (`name`, `password`, `email`) VALUES ('admin', 'test123', 'admin@email.com');
INSERT INTO `laundromat_db`.`customers` (`name`, `password`, `email`,`street_address`, `city`, `state`, `zipcode`) 
VALUES 
('Tony', 'test123+', 'roood@gmail.com','243 Harrison',  'Fremont', 'CA', '94538'),
('Ben', 'test123', 'ben@email.com', '1800 Broadway',  'San Francisco' , 'CA' , '94109'),
('Mike', 'test123', 'mike@email.com', '2800 Market', 'San Francisco' , 'CA' , '94109'),
('April', 'test123', 'April@email.com', '400 Castro', 'San Francisco' , 'CA' , '94109');

INSERT INTO `laundromat_db`.`locations` (`street_address`, `city`, `state`, `zipcode`,`laundromat_id`) VALUES ('Blaco Street', 'Fremont', 'CA', '94538','1');

INSERT INTO `laundromat_db`.`orders` (`order_date`, `order_status`, `order_type`,`customer_id`,`laundromat_id`) VALUES ('2021-03-24', 'Pick','Wash', '1','1');

