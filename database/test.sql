CREATE TABLE elokuvat (
  id varchar(20) NOT NULL,
  originalnimi varchar(100),
  suominimi varchar(100) ,
  imgid varchar(12),
  genre varchar(300),
  kuvaus varchar(200),
  endtime varchar (100),
  starttime varchar (100),
  promotiontitle varchar(200),
  PRIMARY KEY (id)
);

CREATE TABLE omdb(
  originalnimi varchar(100) NOT NULL,
  rating double NOT NULL,
  imdbid varchar(30) NOT NULL,
  PRIMARY KEY(imdbid)
);

CREATE TABLE trailers(
       imdbid varchar(30) NOT NULL,
       link  varchar(300) NOT NULL,
       PRIMARY KEY(link)
);
