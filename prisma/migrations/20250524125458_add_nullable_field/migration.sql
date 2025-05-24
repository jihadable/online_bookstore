-- AlterTable
ALTER TABLE "authors" ALTER COLUMN "bio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;
