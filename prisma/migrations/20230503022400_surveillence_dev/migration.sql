/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `cameras` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cameras_name_key" ON "cameras"("name");
