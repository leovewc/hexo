# Database

## attributes类型

数据库中的变量类型，也称为数据类型，是用于定义数据库中存储的数据的性质和范围的关键概念。不同的数据库管理系统（DBMS）可能有一些特定的变量类型，但总体上，常见的数据类型可以分为以下几类：

### 数值类型（Numeric Types）

1. **整数类型（Integer Types）**：
   - **TINYINT**: 非常小的整数。
   - **SMALLINT**: 小的整数。
   - **MEDIUMINT**: 中等大小的整数。
   - **INT / INTEGER**: 标准整数。
   - **BIGINT**: 大整数。
2. **浮点数类型（Floating-Point Types）**：
   - **FLOAT**: 单精度浮点数。
   - **DOUBLE**: 双精度浮点数。
   - **REAL**: 另一个浮点数类型，有时与DOUBLE同义。
3. **定点数类型（Fixed-Point Types）**：
   - **DECIMAL / NUMERIC**: 定点数，通常用于存储精确的小数，如货币金额。

### 字符串类型（String Types）

1. **定长字符串类型（Fixed-Length Strings）**：
   - **CHAR**: 固定长度的字符串。
2. **变长字符串类型（Variable-Length Strings）**：
   - **VARCHAR**: 可变长度的字符串。
3. **文本类型（Text Types）**：
   - **TINYTEXT**: 非常小的文本。
   - **TEXT**: 小文本。
   - **MEDIUMTEXT**: 中等大小的文本。
   - **LONGTEXT**: 大文本。

### 二进制类型（Binary Types）

1. **定长二进制类型（Fixed-Length Binary Data）**：
   - **BINARY**: 固定长度的二进制数据。
2. **变长二进制类型（Variable-Length Binary Data）**：
   - **VARBINARY**: 可变长度的二进制数据。
3. **大对象类型（Large Object Types）**：
   - **TINYBLOB**: 非常小的二进制对象。
   - **BLOB**: 二进制大对象。
   - **MEDIUMBLOB**: 中等大小的二进制对象。
   - **LONGBLOB**: 大二进制对象。

### 日期和时间类型（Date and Time Types）

1. **日期类型（Date Types）**：
   - **DATE**: 仅日期。
2. **时间类型（Time Types）**：
   - **TIME**: 仅时间。
3. **日期和时间类型（Date and Time Types）**：
   - **DATETIME**: 日期和时间。
   - **TIMESTAMP**: 时间戳，通常用于记录行的创建或修改时间。
   - **YEAR**: 年份。

### 布尔类型（Boolean Types）

- **BOOLEAN / BOOL**: 布尔值，通常用 `TRUE` 或 `FALSE` 表示。

### 枚举和集合类型（Enumeration and Set Types）

1. **枚举类型（Enumeration Types）**：
   - **ENUM**: 枚举类型，包含预定义的一组值。
2. **集合类型（Set Types）**：
   - **SET**: 集合类型，包含预定义的一组值，可以有零个或多个。

### JSON和XML类型（JSON and XML Types）

- **JSON**: 用于存储JSON格式的数据。
- **XML**: 用于存储XML格式的数据（某些DBMS支持）。

### 空间数据类型（Spatial Data Types）

- **GEOMETRY**: 用于存储几何数据。
- **POINT**: 点类型。
- **LINESTRING**: 线串类型。
- **POLYGON**: 多边形类型。
- **MULTIPOINT**: 多点类型。
- **MULTILINESTRING**: 多线串类型。
- **MULTIPOLYGON**: 多多边形类型。
- **GEOMETRYCOLLECTION**: 几何集合类型。

这些是数据库中常见的数据类型，每种类型都有其特定的用途和适用场景。不同的数据库管理系统（如 MySQL, PostgreSQL, Oracle, SQL Server 等）可能会有一些特定的数据类型或变种，但大致上会涵盖上述类别。