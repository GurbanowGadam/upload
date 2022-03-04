DROP DATABASE IF EXISTS my_market;
DROP ROLE IF EXISTS my_market_db_user;


CREATE ROLE my_market_db_user LOGIN SUPERUSER PASSWORD '12345';
CREATE DATABASE my_market;

\c my_market

SET client_encoding TO 'UTF-8';
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "languages"(
    "id" SERIAL PRIMARY KEY,
    "name" CHARACTER VARYING(15) NOT NULL,
    "short_name" CHARACTER VARYING(5) NOT NULL UNIQUE,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "home" (
    "id" SERIAL PRIMARY KEY,
    "lang_id" INT NOT NULL,
    "title_1" CHARACTER VARYING(50) NOT NULL,
    "title_2" CHARACTER VARYING(50) NOT NULL,
    "title_3" CHARACTER VARYING(50) NOT NULL,
    "content_1" CHARACTER VARYING(250) NOT NULL,
    "content_2" CHARACTER VARYING(250) NOT NULL,
    "content_3" CHARACTER VARYING(250) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT home_lang_id_fk
        FOREIGN KEY ("lang_id")
            REFERENCES languages("id")
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "footer" (
    "id" SERIAL PRIMARY KEY,
    "lang_id" INT NOT NULL,
    "title_1" CHARACTER VARYING(50) NOT NULL,
    "title_2" CHARACTER VARYING(50) NOT NULL,
    "content_1" CHARACTER VARYING(250) NOT NULL,
    "content_2" CHARACTER VARYING(250) NOT NULL,
    "call" CHARACTER VARYING(15) NOT NULL,
    "email" CHARACTER VARYING(50) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT footer_lang_id_fk
        FOREIGN KEY ("lang_id")
            REFERENCES languages("id")
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "about" (
    "id" SERIAL PRIMARY KEY,
    "lang_id" INT NOT NULL,
    "title" CHARACTER VARYING(50) NOT NULL,
    "content" CHARACTER VARYING(250) NOT NULL,
    "image_path" CHARACTER VARYING(250) NOT NULL,
    "reated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT about_lang_id_fk
        FOREIGN KEY ("lang_id")
            REFERENCES languages("id")
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" CHARACTER VARYING(25) NOT NULL,
    "image_path" CHARACTER VARYING(75) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "translation_category" (
    "id" SERIAL PRIMARY KEY,
    "lang_id" INT NOT NULL,
    "category_id" INT NOT NULL,
    "name" CHARACTER VARYING(25) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT translation_category_lang_id_fk
        FOREIGN KEY (lang_id)
            REFERENCES languages(id)
                ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT translation_category_category_id_fk
        FOREIGN KEY ("lang_id")
            REFERENCES languages("id")
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "sub_category" (
    "id" SERIAL PRIMARY KEY,
    "name" CHARACTER VARYING(25) NOT NULL,
    "category_id" INT NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "translation_sub_category" (
    "id" SERIAL PRIMARY KEY,
    "lang_id" INT NOT NULL,
    "sub_category_id" INT NOT NULL,
    "name" CHARACTER VARYING(25) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT translation_sub_category_sub_category_id_fk
        FOREIGN KEY ("lang_id")
            REFERENCES languages("id")
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "sub_category_id" INT NOT NULL,
    "count" INT NOT NULL,
    "price" int NOT NULL,
    "image_path" CHARACTER VARYING(75) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "translation_products" (
    "id" SERIAL PRIMARY KEY,
    "lang_id" INT NOT NULL,
    "product_id" INT NOT NULL,
    "name" CHARACTER VARYING(25) NOT NULL,
    "title" CHARACTER VARYING(150) NOT NULL,
    "description" JSON NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT products_lang_id_fk
        FOREIGN KEY ("lang_id")
            REFERENCES languages("id")
                ON UPDATE CASCADE ON DELETE CASCADE,
     CONSTRAINT translation_products_product_id_fk
        FOREIGN KEY ("product_id")
            REFERENCES products("id")
                ON UPDATE CASCADE ON DELETE CASCADE
);



CREATE TABLE "settings" (
    "id" SERIAL PRIMARY KEY,
    "logo" CHARACTER VARYING(75) NOT NULL,
    "favicon" CHARACTER VARYING(75) NOT NULL,
    "email" CHARACTER VARYING(75) NOT NULL,
    "whatsapp" CHARACTER VARYING(75) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "phones" (
    "id" SERIAL PRIMARY KEY,
    "phone_number" CHARACTER VARYING(25) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "images" (
    "id" SERIAL PRIMARY KEY,
    "image_path" CHARACTER VARYING(25) NOT NULL,
    "role" CHARACTER VARYING(25) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "admins" (
    "id" SERIAL PRIMARY KEY,
    "username" CHARACTER VARYING(25) NOT NULL,
    "email" CHARACTER VARYING(25) NOT NULL,
    "role" CHARACTER VARYING(25) NOT NULL,
    "password" CHARACTER VARYING(100) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" CHARACTER VARYING(50) NOT NULL,
    "email" CHARACTER VARYING(50) NOT NULL,
    "password" CHARACTER VARYING(100) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO languages(name, short_name)
VALUES
('turkmen', 'tm'),
('english', 'en');

INSERT INTO home(lang_id, title_1, title_2, title_3, content_1, content_2, content_3)
VALUES
(1, 't_tm_1', 't_tm_2', 't_tm_3', 'c_tm_1', 'c_tm_2', 'c_tm_3'),
(2, 't_en_1', 't_en_2', 't_en_3', 'c_en_1', 'c_en_2', 'c_en_3');


INSERT INTO footer(lang_id, title_1, title_2, content_1, content_2, call, email)
VALUES
(1, 't_tm_1', 't_tm_2', 'c_tm_1', 'c_tm_2', '+99361675380', 'gadamgurbanaga@gmail.com'),
(2, 't_en_1', 't_en_2', 'c_en_1', 'c_en_2', '+99361675380', 'gadamgurbanaga@gmail.com');

INSERT INTO about(lang_id, title, content, image_path)
VALUES
(1, 'title_tm', 'content_tm', 'about_image_path'),
(2, 'title_en', 'content_en', 'about_image_path');

INSERT INTO category(name, image_path)
VALUES
('Mens', 'category_1.jpg'),
('Womens', 'category_2.jpg'),
('Kids', 'category_3.jpg'),
('For_home', 'category_4.jpg'),
('Electronic', 'category_5.jpg'),
('Sport', 'category_6.jpg'),
('Others', 'category_7.jpg');

INSERT INTO translation_category(lang_id, category_id, name)
VALUES
(1, 1, 'Erkekler'),
(2, 1, 'Mens'),
(1, 2, 'Zenanlar'),
(2, 2, 'Womens'),
(1, 3, 'Cagalar'),
(2, 3, 'Kids'),
(1, 4, 'Oy ucin'),
(2, 4, 'For home'),
(1, 5, 'Elektronika'),
(2, 5, 'Electronik'),
(1, 6, 'Sport'),
(2, 6, 'Sport'),
(1, 7, 'Basgalay'),
(2, 7, 'Others');



INSERT INTO sub_category(name, category_id)
VALUES
('shirt', 1),
('shoes', 1),
('dress', 2),
('cosmetic', 2),
('clother', 3),
('accessory', 3),
('food', 4),
('bath', 4),
('computer', 5),
('phone', 5),
('accessory', 5),
('clothes', 6),
('tops', 6);

INSERT INTO translation_sub_category(lang_id, sub_category_id, name)
VALUES
(1, 1, 'koynekler'),
(2, 1, 'shirt'),
(1, 2, 'kowusler'),
(2, 2, 'shoes'),
(1, 3, 'elbiseler'),
(2, 3, 'dress'),
(1, 4, 'kasmetika'),
(2, 4, 'cosmetic'),
(1, 5, 'giysiler'),
(2, 5, 'clother'),
(1, 6, 'aksesuarlar'),
(2, 6, 'accessory'),
(1, 7, 'iymit'),
(2, 7, 'food'),
(1, 8, 'banya'),
(2, 8, 'bath'),
(1, 9, 'kompyuter'),
(2, 9, 'computer'),
(1, 10, 'telefonlar'),
(2, 10, 'phones');

INSERT INTO products(sub_category_id, count, price, image_path)
VALUES
(1, 50, 150, 'oglan_koynekler_yenli'),
(1, 75, 120, 'oglan_koynekler_yensiz'),
(2, 150, 250, 'oglan_kowusler_1'),
(2, 200, 400, 'oglan_kowusler_2'),
(3, 25, 500, 'gyz_koynekler_1'),
(3, 38, 480, 'gyz_koynekler_2'),
(4, 100, 10, 'bayram krem :)'),
(5, 30, 100, 'mayka'),
(6, 59, 8, 'bantik'),
(7, 80, 50, 'cigit yag'),
(8, 10, 1000, 'boiler'),
(9, 20, 8000, 'HP'),
(10, 25, 20000, 'IPHONE 13'),
(11, 100, 250, 'MI bluetoos nausnik'),
(12, 1000, 300, 'MESSI 10'),
(13, 1500, 400, 'Barca TOP'),
(14, 600, 600,'Legenda TOP');


INSERT INTO translation_products(lang_id, product_id, name, title, description)
VALUES
(1, 1, 'Yenli_koynek', 'oglan_koynekler_yenli_betleri', '{"olcegi": "L", "renki": "gok"}' ),
(2, 1, 'Yenli_koynek_en', 'oglan_koynekler_yenli_betleri_en', '{"size": "L", "color": "blue"}' ),

(1, 2, 'Yensiz_koynek', 'oglan_koynekler_yensiz_betleri', '{"olcegi": "M", "renki": "gok"}' ),
(2, 2, 'Yensiz_koynek_en', 'oglan_koynekler_yensiz_betleri_en', '{"size": "M", "color": "blue"}' ),

(1, 5, 'gyz_koynekler_1', 'gyz_koynekler_1betleri', '{"olcegi": "M", "renki": "gok"}' ),
(2, 5, 'gyz_koynekler_1', 'gyz_koynekler_1betleri_en', '{"size": "M", "color": "blue"}' ),

(1, 9, 'batnik_tm', 'batnik_tm_betleri', '{"renki": "gok"}' ),
(2, 9, 'batnik_en', 'batnik_en_betleri_en', '{"color": "blue"}' ),

(1, 12, 'kompyuter', 'HP-4540s probook', '{"ram": 4, "renki": "kumussow"}' ),
(2, 12, 'computer', 'HP-4540s probook', '{"ram": 4, "color": "silver"}' );

