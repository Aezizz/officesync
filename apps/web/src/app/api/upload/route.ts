import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Handler unggah berkas (Local / S3 / Cloudinary)
    return NextResponse.json({ success: true, url: '/uploads/sample.pdf' });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengunggah berkas' }, { status: 500 });
  }
}
