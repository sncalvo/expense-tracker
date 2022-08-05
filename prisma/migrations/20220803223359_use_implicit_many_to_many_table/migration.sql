/*
  Warnings:

  - You are about to drop the `CategoriesOnExpense` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CategoriesOnExpense";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_CategoryToExpense" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoryToExpense_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToExpense_B_fkey" FOREIGN KEY ("B") REFERENCES "Expense" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToExpense_AB_unique" ON "_CategoryToExpense"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToExpense_B_index" ON "_CategoryToExpense"("B");
