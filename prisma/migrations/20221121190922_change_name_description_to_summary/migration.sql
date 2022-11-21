/*
  Warnings:

  - You are about to drop the column `description` on the `Tcc` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Tcc` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tcc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "professorId" TEXT,
    "orientationId" TEXT,
    "docFileLink" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ANDAMENTO',
    CONSTRAINT "Tcc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tcc_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tcc_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tcc" ("classId", "docFileLink", "id", "orientationId", "professorId", "status", "title", "userId") SELECT "classId", "docFileLink", "id", "orientationId", "professorId", "status", "title", "userId" FROM "Tcc";
DROP TABLE "Tcc";
ALTER TABLE "new_Tcc" RENAME TO "Tcc";
CREATE UNIQUE INDEX "Tcc_id_key" ON "Tcc"("id");
CREATE UNIQUE INDEX "Tcc_docFileLink_key" ON "Tcc"("docFileLink");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
