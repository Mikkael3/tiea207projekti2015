DROP TABLE elokuvat;

CREATE TABLE elokuvat (
  id varchar(20) NOT NULL,
  orginalnimi varchar(100),
  suominimi varchar(100),
  imgid varchar(12),
  PRIMARY KEY (id)
);

