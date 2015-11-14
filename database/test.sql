CREATE TABLE elokuvat (
  id varchar(20) NOT NULL,
  orginalnimi varchar(100),
  suominimi varchar(100) ,
  imgid varchar(12),
  PRIMARY KEY (id)
);

CREATE TABLE omdb(
  orginalnimi varchar(100) NOT NULL,
  rating double NOT NULL,
  imdbid varchar(30) NOT NULL,
  PRIMARY KEY(imdbid)
);

CREATE TABLE trailers(
       imdbid varchar(30) NOT NULL,
       link  varchar(300) NOT NULL,
       PRIMARY KEY(link)
);
