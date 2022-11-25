/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `datenasc` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `personalDescription` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tcc` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Guidance` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `createdByUser` on the `Message` table. All the data in the column will be lost.
  - Added the required column `studantId` to the `Tcc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studantId` to the `Guidance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
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

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "password", "salt") SELECT "email", "password", "salt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Tcc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "studantId" TEXT NOT NULL,
    "professorId" TEXT,
    "guidanceId" TEXT,
    "docFileLink" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ANDAMENTO',
    CONSTRAINT "Tcc_studantId_fkey" FOREIGN KEY ("studantId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tcc_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tcc_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tcc" ("classId", "docFileLink", "guidanceId", "id", "professorId", "status", "summary", "title") SELECT "classId", "docFileLink", "guidanceId", "id", "professorId", "status", "summary", "title" FROM "Tcc";
DROP TABLE "Tcc";
ALTER TABLE "new_Tcc" RENAME TO "Tcc";
CREATE UNIQUE INDEX "Tcc_id_key" ON "Tcc"("id");
CREATE UNIQUE INDEX "Tcc_docFileLink_key" ON "Tcc"("docFileLink");
CREATE TABLE "new_Guidance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tccId" TEXT NOT NULL,
    "professorId" TEXT,
    "studantId" TEXT NOT NULL,
    CONSTRAINT "Guidance_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Guidance_studantId_fkey" FOREIGN KEY ("studantId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guidance_tccId_fkey" FOREIGN KEY ("tccId") REFERENCES "Tcc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guidance" ("id", "professorId", "tccId") SELECT "id", "professorId", "tccId" FROM "Guidance";
DROP TABLE "Guidance";
ALTER TABLE "new_Guidance" RENAME TO "Guidance";
CREATE UNIQUE INDEX "Guidance_id_key" ON "Guidance"("id");
CREATE UNIQUE INDEX "Guidance_tccId_key" ON "Guidance"("tccId");
CREATE INDEX "Guidance_id_studantId_idx" ON "Guidance"("id", "studantId");
CREATE INDEX "Guidance_id_professorId_idx" ON "Guidance"("id", "professorId");
CREATE TABLE "new_Professor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "datenasc" TEXT,
    "avatarUrl" TEXT,
    "personalDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    CONSTRAINT "Professor_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Professor" ("active", "avatarUrl", "cpf", "createdAt", "datenasc", "id", "name", "personalDescription", "token") SELECT "active", "avatarUrl", "cpf", "createdAt", "datenasc", "id", "name", "personalDescription", "token" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
CREATE UNIQUE INDEX "Professor_cpf_key" ON "Professor"("cpf");
CREATE UNIQUE INDEX "Professor_token_key" ON "Professor"("token");
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByStudent" BOOLEAN NOT NULL DEFAULT true,
    "text" TEXT NOT NULL,
    "guidanceId" TEXT NOT NULL,
    CONSTRAINT "Message_guidanceId_fkey" FOREIGN KEY ("guidanceId") REFERENCES "Guidance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("createdAt", "guidanceId", "id", "text") SELECT "createdAt", "guidanceId", "id", "text" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Student_cpf_key" ON "Student"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Student_token_key" ON "Student"("token");
