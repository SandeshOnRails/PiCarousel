 #insert into image (filepath,adminverified,licencetype,privacy,published,deleted) values ('a.jpg',0,0,0,0,0);
 #ALTER TABLE image ALTER COLUMN filepath SET Null no;
 #ALTER TABLE image ADD photo_categorie_id smallint NOT NULL DEFAULT 0;
 #ALTER TABLE image DROP COLUMN photo_categorie_id;
 #DROP TABLE image;


 CREATE TABLE user (
		user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		firstname VARCHAR(30) NULL,
		lastname VARCHAR(30) NULL,
		email VARCHAR(50),
		age SMALLINT UNSIGNED NOT NULL,
		gender SMALLINT UNSIGNED NOT NULL,
		accounttype SMALLINT UNSIGNED NOT NULL,
		suspend TINYINT UNSIGNED NOT NULL,
		emailvrfcode VARCHAR(30) NULL,
		emailvrfexpdate TIME, 
		deleted TINYINT UNSIGNED NOT NULL,
		lastlogindate DATETIME ,
		user_regdate TIMESTAMP
) ;

CREATE TABLE categorie (
		categorie_id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		categorie VARCHAR(50) NULL,
		categorie_regdate TIMESTAMP
) ;

CREATE TABLE image (
		photo_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		filepath VARCHAR(30) NOT NULL,
		photo_categorie_id SMALLINT NOT NULL Default 0,
		description VARCHAR(30) NULL,
		owner_user_id INT UNSIGNED NOT NULL Default 0,
		adminverified SMALLINT UNSIGNED NOT NULL Default 0,
		licencetype SMALLINT UNSIGNED NOT NULL Default 0,
		privacy SMALLINT UNSIGNED NOT NULL Default 0,
		published TINYINT UNSIGNED NOT NULL Default 0,
		deleted TINYINT UNSIGNED NOT NULL Default 0,
		photo_regdate TIMESTAMP
) ;

CREATE TABLE download (
		download_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		download_photo_id INT UNSIGNED,
		download_user_id INT UNSIGNED,
		download_regdate TIMESTAMP	
) ;


CREATE TABLE sharewith (
		sharewith_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		sharewith_photo_id INT UNSIGNED,
		sharewith_user_id INT UNSIGNED,
		sharewith_regdate TIMESTAMP
) ;



