/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Tcc` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tcc_studentId_key" ON "Tcc"("studentId");
