
INSERT INTO `laundromat_db`.`laundromats` (`name`, `password`, `email`) VALUES ('admin', 'test123', 'admin@email.com');
INSERT INTO `laundromat_db`.`customers` (`name`, `password`, `email`,`street_address`, `apartment_no`, `city`, `state`, `zip_code`) 
VALUES ('Tony', 'test123+', 'roood@gmail.com','Harrison', '243', 'Fremont', 'CA', '94538'),
('Ben', 'test123', 'ben@email.com', 'Broadway', '1800', 'San Francisco' , 'CA' , '94109'),
('Mike', 'test123', 'mike@email.com', 'Market', '2800', 'San Francisco' , 'CA' , '94109'),
('April', 'test123', 'April@email.com', 'Castro', '400', 'San Francisco' , 'CA' , '94109');

INSERT INTO `laundromat_db`.`locations` (`street_address`, `apartment_no`, `city`, `state`, `zip_code`,`laundromat_id`) VALUES ('Blaco Street', '56', 'Fremont', 'CA', '94538','1');

INSERT INTO `laundromat_db`.`orders` (`order_date`, `order_status`, `customer_id`,`laundromat_id`) VALUES ('03/12/21', 'Pick', '1','1'),
('03/02/21', 'Pick', '1','1'),
('03/05/21', 'Cleaning', '2','1'),
('03/04/21', 'Pick', '3','1'),
('03/09/21', 'Accepted', '2','1');
