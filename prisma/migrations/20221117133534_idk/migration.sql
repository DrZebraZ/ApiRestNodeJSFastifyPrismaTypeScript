/*
  Warnings:

  - You are about to drop the column `orientationId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Orientation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "datenasc" TEXT,
    "avatarUrl" TEXT,
    "personalDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    CONSTRAINT "User_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatarUrl", "classId", "cpf", "createdAt", "datenasc", "email", "id", "name", "password", "personalDescription", "salt", "token") SELECT "avatarUrl", "classId", "cpf", "createdAt", "datenasc", "email", "id", "name", "password", "personalDescription", "salt", "token" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
CREATE TABLE "new_Orientation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "professorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Orientation_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orientation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orientation" ("id", "professorId") SELECT "id", "professorId" FROM "Orientation";
DROP TABLE "Orientation";
ALTER TABLE "new_Orientation" RENAME TO "Orientation";
CREATE UNIQUE INDEX "Orientation_id_key" ON "Orientation"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
