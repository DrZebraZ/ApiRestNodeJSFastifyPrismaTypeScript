/*
  Warnings:

  - You are about to drop the `Orientation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `orientationId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `orientationId` on the `Tcc` table. All the data in the column will be lost.
  - Added the required column `guidanceId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Orientation_id_professorId_idx";

-- DropIndex
DROP INDEX "Orientation_id_userId_idx";

-- DropIndex
DROP INDEX "Orientation_tccId_key";

-- DropIndex
DROP INDEX "Orientation_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Orientation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Guidance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tccId" TEXT NOT NULL,
    "professorId" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Guidance_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Guidance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guidance_tccId_fkey" FOREIGN KEY ("tccId") REFERENCES "Tcc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUser" BOOLEAN NOT NULL DEFAULT true,
    "text" TEXT NOT NULL,
    "guidanceId" TEXT NOT NULL,
    CONSTRAINT "Message_guidanceId_fkey" FOREIGN KEY ("guidanceId") REFERENCES "Guidance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("createdAt", "createdByUser", "id", "text") SELECT "createdAt", "createdByUser", "id", "text" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE TABLE "new_Tcc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "professorId" TEXT,
    "guidanceId" TEXT,
    "docFileLink" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ANDAMENTO',
    CONSTRAINT "Tcc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tcc_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tcc_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tcc" ("classId", "docFileLink", "id", "professorId", "status", "summary", "title", "userId") SELECT "classId", "docFileLink", "id", "professorId", "status", "summary", "title", "userId" FROM "Tcc";
DROP TABLE "Tcc";
ALTER TABLE "new_Tcc" RENAME TO "Tcc";
CREATE UNIQUE INDEX "Tcc_id_key" ON "Tcc"("id");
CREATE UNIQUE INDEX "Tcc_docFileLink_key" ON "Tcc"("docFileLink");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Guidance_id_key" ON "Guidance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Guidance_tccId_key" ON "Guidance"("tccId");

-- CreateIndex
CREATE INDEX "Guidance_id_userId_idx" ON "Guidance"("id", "userId");

-- CreateIndex
CREATE INDEX "Guidance_id_professorId_idx" ON "Guidance"("id", "professorId");
