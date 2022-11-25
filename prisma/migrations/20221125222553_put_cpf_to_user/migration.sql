/*
  Warnings:

  - You are about to drop the column `cpf` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `Professor` table. All the data in the column will be lost.
  - Added the required column `cpf` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "datenasc" TEXT,
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
CREATE TABLE "new_User" (
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "password", "salt") SELECT "email", "password", "salt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
CREATE TABLE "new_Professor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "datenasc" TEXT,
    "avatarUrl" TEXT,
    "personalDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    CONSTRAINT "Professor_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Professor" ("active", "avatarUrl", "createdAt", "datenasc", "id", "name", "personalDescription", "token", "userEmail") SELECT "active", "avatarUrl", "createdAt", "datenasc", "id", "name", "personalDescription", "token", "userEmail" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
CREATE UNIQUE INDEX "Professor_token_key" ON "Professor"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
