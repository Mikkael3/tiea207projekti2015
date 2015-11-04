CREATE TABLE elokuvat (
  id varchar(9) NOT NULL,
  orginalnimi varchar(100),
  suominimi varchar(100),
  imgid varchar(12),
  PRIMARY KEY (id)
);

INSERT INTO elokuvat (id, orginalnimi,suominimi,imgid) VALUES
('1-2120545', 'Pasila','Pasila', '13-1-2120545');
