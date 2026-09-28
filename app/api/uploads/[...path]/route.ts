import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

// GET /api/uploads/[...path] — serve uploaded files
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { path: segments } = await context.params;
    const filePath = path.join(process.cwd(), 'uploads', ...segments);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = (segments[segments.length - 1] || '').split('.').pop()?.toLowerCase() || '';

    const contentTypes: Record<string, string> = {
      pdf: 'application/pdf',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };

    const contentType = contentTypes[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
      },
    });
  } catch (err) {
    console.error('GET /api/uploads error:', err);
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 });
  }
}
