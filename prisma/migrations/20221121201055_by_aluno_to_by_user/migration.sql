/*
  Warnings:

  - You are about to drop the column `createdByAluno` on the `Message` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUser" BOOLEAN NOT NULL DEFAULT true,
    "text" TEXT NOT NULL,
    "orientationId" TEXT NOT NULL,
    CONSTRAINT "Message_orientationId_fkey" FOREIGN KEY ("orientationId") REFERENCES "Orientation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("createdAt", "id", "orientationId", "text") SELECT "createdAt", "id", "orientationId", "text" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
