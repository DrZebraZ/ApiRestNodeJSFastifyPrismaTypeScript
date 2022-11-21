/*
  Warnings:

  - Made the column `classAreaId` on table `Tcc` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tcc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "docFileLink" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ANDAMENTO',
    "userId" TEXT NOT NULL,
    "professorId" TEXT,
    "classAreaId" TEXT NOT NULL,
    "orientationId" TEXT,
    CONSTRAINT "Tcc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tcc_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tcc_classAreaId_fkey" FOREIGN KEY ("classAreaId") REFERENCES "Classarea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tcc" ("classAreaId", "description", "docFileLink", "id", "orientationId", "professorId", "status", "title", "userId") SELECT "classAreaId", "description", "docFileLink", "id", "orientationId", "professorId", "status", "title", "userId" FROM "Tcc";
DROP TABLE "Tcc";
ALTER TABLE "new_Tcc" RENAME TO "Tcc";
CREATE UNIQUE INDEX "Tcc_id_key" ON "Tcc"("id");
CREATE UNIQUE INDEX "Tcc_docFileLink_key" ON "Tcc"("docFileLink");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
