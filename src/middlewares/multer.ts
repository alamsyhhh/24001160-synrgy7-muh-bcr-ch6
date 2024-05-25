import multer from 'multer';
import { Response } from 'express';

// Konfigurasi penyimpanan untuk multer
const storage = multer.memoryStorage();

// Fungsi untuk memeriksa apakah tipe file yang diunggah adalah gambar
const fileFilter = (req: any, file: any, cb: any) => {
  // Daftar tipe file yang diizinkan
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  const res: Response = req.res;

  // Periksa apakah tipe file yang diunggah termasuk dalam daftar tipe yang diizinkan
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = res.status(400).json({
      status: 400,
      message: 'Hanya diperbolehkan untuk mengunggah file gambar (JPG, PNG)!',
    });
    cb(error, false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;

// Fungsi untuk menghasilkan nama file acak
function generateRandomCode(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Fungsi untuk mengambil ekstensi file
function getFileExtension(fileName: string): string {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
}

// Fungsi untuk membuat nama file unik dengan waktu saat diunggah dan kode acak
export function generateUniqueFileName(fileName: string): string {
  const timestamp = new Date().getTime();
  const randomCode = generateRandomCode(8);
  const fileExtension = getFileExtension(fileName);
  return `${timestamp}_${randomCode}.${fileExtension}`;
}

export function extractPublicId(imageUrl: string): string | null {
  const match = imageUrl.match(/\/([^/]+)\/([^/]+)\./);
  return match ? `${match[1]}/${match[2]}` : null;
}
