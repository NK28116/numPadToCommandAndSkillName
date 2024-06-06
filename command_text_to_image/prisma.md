
```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

#c0366ed32402
#mysql://USER:PASSWORD@HOST:PORT/DATABASE
#MYSQL_ROOT_PASSWORD=databasepassword 

##+---------------+----------------+--------------+------+---------+
##| database_name | user_name      | host_name    | port | version |
##+---------------+----------------+--------------+------+---------+
##| world         | root@localhost | c0366ed32402 | 3306 | 8.4.0   |
##+---------------+----------------+--------------+------+---------+

MYSQL_USER=root@localhost
MYSQL_PASSWORD=databasepassword
MYSQL_HOST=c0366ed32402
MYSQL_PORT=3306
MYSQL_DATABASE=world


DATABASE_URL="mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}"
```