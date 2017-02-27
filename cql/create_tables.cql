USE cassango;

DROP TABLE IF EXISTS file;

CREATE TABLE file (
  app ascii,
  dir text,
  file text,
  version timestamp,
  schema_id text,
  is_deleted boolean,
  data_whole blob,
  data_diff blob,
  diff_alg ascii,
  parent_version timestamp,
  owner text,
  headers MAP <text, text>,
  acl MAP <text, tinyint>,
  info text,
  PRIMARY KEY ((app, dir, file), version)
) WITH CLUSTERING ORDER BY (version DESC);

CREATE CUSTOM INDEX fn_prefix ON file (schema_id) USING 'org.apache.cassandra.index.sasi.SASIIndex';

DROP TABLE IF EXISTS file_by_dir;

CREATE TABLE file_by_dir (
  app ascii,
  dir text,
  file text,
  PRIMARY KEY ((app, dir), file)
) WITH CLUSTERING ORDER BY (file ASC);

DROP TABLE IF EXISTS dir_access;

CREATE TABLE dir_access (
  app ascii,
  dir text,
  owner text,
  acl MAP <text, tinyint>,
  info text,
  PRIMARY KEY ((app, dir))
);

