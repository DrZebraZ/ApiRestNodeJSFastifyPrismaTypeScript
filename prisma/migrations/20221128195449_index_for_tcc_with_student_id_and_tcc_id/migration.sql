-- DropIndex
DROP INDEX "Tcc_studentId_idx";

-- CreateIndex
CREATE INDEX "Tcc_studentId_id_idx" ON "Tcc"("studentId", "id");
