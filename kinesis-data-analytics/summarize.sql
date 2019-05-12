
/**
 * Welcome to the SQL editor
 * =========================
 * 
 * The SQL code you write here will continuously transform your streaming data
 * when your application is running.
 *
 * Get started by clicking "Add SQL from templates" or pull up the
 * documentation and start writing your own custom queries.
 */
create or replace stream "aggregate_sql_stream" (
    "clientId" varchar(32),
    "event_at" timestamp,
    "accel_x" double,
    "accel_y" double,
    "accel_z" double,
    "gyro_x" double,
    "gyro_y" double,
    "gyro_z" double,
    "rotation_x" double,
    "rotation_y" double,
    "avgTemp" double,
    "ledStatus" int,
    "counter" int
);

create or replace PUMP "stream_pump" AS
  insert into "aggregate_sql_stream"
    select stream 
      "clientId", 
      "ROWTIME", 
      STDDEV_SAMP("x"),
      STDDEV_SAMP("y"),
      STDDEV_SAMP("z"),
      STDDEV_SAMP("x0"),
      STDDEV_SAMP("y0"),
      STDDEV_SAMP("z0"),
      STDDEV_SAMP("x1"),
      STDDEV_SAMP("y1"),
      avg("temp"),
      MAX("ledStatus"),
      MAX("counter")
    from "SOURCE_SQL_STREAM_001"
    GROUP BY FLOOR("SOURCE_SQL_STREAM_001"."ROWTIME" TO MINUTE), "clientId";
