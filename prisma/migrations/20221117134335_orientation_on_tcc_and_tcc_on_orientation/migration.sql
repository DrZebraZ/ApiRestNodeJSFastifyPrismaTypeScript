/*
  Warnings:

  - Added the required column `orientationId` to the `Tcc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tccId` to the `Orientation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tcc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "docFileLink" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ANDAMENTO',
    "userId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "classAreaId" TEXT,
    "orientationId" TEXT NOT NULL,
    CONSTRAINT "Tcc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tcc_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tcc_classAreaId_fkey" FOREIGN KEY ("classAreaId") REFERENCES "Classarea" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tcc" ("classAreaId", "description", "docFileLink", "id", "professorId", "status", "title", "userId") SELECT "classAreaId", "description", "docFileLink", "id", "professorId", "status", "title", "userId" FROM "Tcc";
DROP TABLE "Tcc";
ALTER TABLE "new_Tcc" RENAME TO "Tcc";
CREATE UNIQUE INDEX "Tcc_id_key" ON "Tcc"("id");
CREATE UNIQUE INDEX "Tcc_docFileLink_key" ON "Tcc"("docFileLink");
CREATE UNIQUE INDEX "Tcc_orientationId_key" ON "Tcc"("orientationId");
CREATE TABLE "new_Orientation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "professorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tccId" TEXT NOT NULL,
    CONSTRAINT "Orientation_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orientation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orientation_tccId_fkey" FOREIGN KEY ("tccId") REFERENCES "Tcc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orientation" ("id", "professorId", "userId") SELECT "id", "professorId", "userId" FROM "Orientation";
DROP TABLE "Orientation";
ALTER TABLE "new_Orientation" RENAME TO "Orientation";
CREATE UNIQUE INDEX "Orientation_id_key" ON "Orientation"("id");
CREATE UNIQUE INDEX "Orientation_tccId_key" ON "Orientation"("tccId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
