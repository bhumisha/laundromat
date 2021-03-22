
INSERT INTO `laundromat_db`.`laundromats` (`name`, `password`, `email`) VALUES ('admin', 'test123', 'admin@email.com');
INSERT INTO `laundromat_db`.`customers` (`name`, `password`, `email`,`street_address`, `apt_number`, `city`, `state`, `zip_code`) 
VALUES ('Bhumi', 'test123+', 'test@gmail.com','Blaco street', '23', 'Fremont', 'CA', '94538');

INSERT INTO `laundromat_db`.`locations` (`street_address`, `apt_number`, `city`, `state`, `zip_code`,`laundromat_id`) VALUES ('Blaco Street', '56', 'Fremont', 'CA', '94538','1');

INSERT INTO `laundromat_db`.`orders` (`order_date`, `order_status`,    `order_type`,`customer_id`,`laundromat_id`) VALUES ('03/12/21', 'Pick','Wash' '1','1');
