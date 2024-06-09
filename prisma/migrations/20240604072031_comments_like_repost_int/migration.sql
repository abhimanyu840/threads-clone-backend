/*
  Warnings:

  - You are about to alter the column `likes` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `reposts` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "likes" SET DATA TYPE INTEGER,
ALTER COLUMN "reposts" SET DATA TYPE INTEGER;
