/*
  Warnings:

  - You are about to drop the column `like` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `repost` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "like",
DROP COLUMN "repost",
ADD COLUMN     "likes" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "reposts" BIGINT NOT NULL DEFAULT 0;
