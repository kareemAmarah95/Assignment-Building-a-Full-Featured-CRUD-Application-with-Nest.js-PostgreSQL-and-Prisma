-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "published" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedPassword" TEXT,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "full_name" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
