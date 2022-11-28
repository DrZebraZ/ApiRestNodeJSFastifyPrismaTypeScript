/*
  Warnings:

  - You are about to drop the column `studantId` on the `Guidance` table. All the data in the column will be lost.
  - Added the required column `studentId` to the `Guidance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guidance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tccId" TEXT NOT NULL,
    "teacherId" TEXT,
    "studentId" TEXT NOT NULL,
    CONSTRAINT "Guidance_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Guidance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guidance_tccId_fkey" FOREIGN KEY ("tccId") REFERENCES "Tcc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guidance" ("id", "tccId", "teacherId") SELECT "id", "tccId", "teacherId" FROM "Guidance";
DROP TABLE "Guidance";
ALTER TABLE "new_Guidance" RENAME TO "Guidance";
CREATE UNIQUE INDEX "Guidance_id_key" ON "Guidance"("id");
CREATE UNIQUE INDEX "Guidance_tccId_key" ON "Guidance"("tccId");
CREATE INDEX "Guidance_id_studentId_idx" ON "Guidance"("id", "studentId");
CREATE INDEX "Guidance_id_teacherId_idx" ON "Guidance"("id", "teacherId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
