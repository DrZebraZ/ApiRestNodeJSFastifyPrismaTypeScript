/*
  Warnings:

  - You are about to drop the `ClassArea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TCC` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "ClassArea_id_key";

-- DropIndex
DROP INDEX "TCC_docFileLink_key";

-- DropIndex
DROP INDEX "TCC_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ClassArea";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TCC";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Classarea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tcc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "docFileLink" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ANDAMENTO',
    "userId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "classAreaId" TEXT,
    CONSTRAINT "Tcc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tcc_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tcc_classAreaId_fkey" FOREIGN KEY ("classAreaId") REFERENCES "Classarea" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "classAreaId" TEXT NOT NULL,
    "coordinatorId" TEXT,
    CONSTRAINT "Class_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Professor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Class_classAreaId_fkey" FOREIGN KEY ("classAreaId") REFERENCES "Classarea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Class" ("classAreaId", "coordinatorId", "id", "name") SELECT "classAreaId", "coordinatorId", "id", "name" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE UNIQUE INDEX "Class_id_key" ON "Class"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Classarea_id_key" ON "Classarea"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tcc_id_key" ON "Tcc"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tcc_docFileLink_key" ON "Tcc"("docFileLink");
