/*
  Warnings:

  - You are about to alter the column `datenasc` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `datenasc` on the `Teacher` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "datenasc" DATETIME,
    "avatarUrl" TEXT,
    "personalDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    CONSTRAINT "Student_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("active", "avatarUrl", "classId", "createdAt", "datenasc", "id", "name", "personalDescription", "token", "userEmail") SELECT "active", "avatarUrl", "classId", "createdAt", "datenasc", "id", "name", "personalDescription", "token", "userEmail" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_token_key" ON "Student"("token");
CREATE TABLE "new_Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "datenasc" DATETIME,
    "avatarUrl" TEXT,
    "personalDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    CONSTRAINT "Teacher_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Teacher" ("active", "avatarUrl", "createdAt", "datenasc", "id", "name", "personalDescription", "token", "userEmail") SELECT "active", "avatarUrl", "createdAt", "datenasc", "id", "name", "personalDescription", "token", "userEmail" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_token_key" ON "Teacher"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
