-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "datenasc" TEXT,
    "avatarUrl" TEXT,
    "personalDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    CONSTRAINT "Teacher_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "classAreaId" TEXT NOT NULL,
    "coordinatorId" TEXT,
    CONSTRAINT "Class_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Class_classAreaId_fkey" FOREIGN KEY ("classAreaId") REFERENCES "Classarea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Classarea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tcc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "studantId" TEXT NOT NULL,
    "teacherId" TEXT,
    "guidanceId" TEXT,
    "docFileLink" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ANDAMENTO',
    CONSTRAINT "Tcc_studantId_fkey" FOREIGN KEY ("studantId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tcc_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tcc_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Guidance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tccId" TEXT NOT NULL,
    "teacherId" TEXT,
    "studantId" TEXT NOT NULL,
    CONSTRAINT "Guidance_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Guidance_studantId_fkey" FOREIGN KEY ("studantId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guidance_tccId_fkey" FOREIGN KEY ("tccId") REFERENCES "Tcc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByStudent" BOOLEAN NOT NULL DEFAULT true,
    "text" TEXT NOT NULL,
    "guidanceId" TEXT NOT NULL,
    CONSTRAINT "Message_guidanceId_fkey" FOREIGN KEY ("guidanceId") REFERENCES "Guidance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ClassToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClassToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Student_token_key" ON "Student"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_token_key" ON "Teacher"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Class_id_key" ON "Class"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Classarea_id_key" ON "Classarea"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tcc_id_key" ON "Tcc"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tcc_docFileLink_key" ON "Tcc"("docFileLink");

-- CreateIndex
CREATE UNIQUE INDEX "Guidance_id_key" ON "Guidance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Guidance_tccId_key" ON "Guidance"("tccId");

-- CreateIndex
CREATE INDEX "Guidance_id_studantId_idx" ON "Guidance"("id", "studantId");

-- CreateIndex
CREATE INDEX "Guidance_id_teacherId_idx" ON "Guidance"("id", "teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToTeacher_AB_unique" ON "_ClassToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToTeacher_B_index" ON "_ClassToTeacher"("B");
