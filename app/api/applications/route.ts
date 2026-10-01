import { NextRequest, NextResponse } from 'next/server';
import { readApplications, saveApplication, generateApplicationNumber, clearAllApplications } from '@/lib/localDb';

// GET /api/applications — list all applications (admin)
export async function GET() {
  try {
    const apps = await readApplications();
    return NextResponse.json({ applications: apps });
  } catch (err) {
    console.error('GET /api/applications error:', err);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

// POST /api/applications — submit a new application (multipart/form-data)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Parse JSON data field
    const dataRaw = formData.get('data');
    if (!dataRaw || typeof dataRaw !== 'string') {
      return NextResponse.json({ error: 'Missing application data' }, { status: 400 });
    }
    const applicationData = JSON.parse(dataRaw);

    const applicationNumber = generateApplicationNumber();
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Save uploaded files
    const fileFields = ['cvResume', 'coverLetter', 'portfolio', 'nationalIdFront', 'nationalIdBack', 'passportPage'];
    const savedFiles: Record<string, string> = {};

    // Dynamic import for fs (server-only)
    const { writeFile, mkdir } = await import('fs/promises');
    const path = await import('path');

    const uploadDir = path.join(process.cwd(), 'uploads', id);
    await mkdir(uploadDir, { recursive: true });

    for (const field of fileFields) {
      const file = formData.get(field);
      if (file && file instanceof File && file.size > 0) {
        const ext = file.name.split('.').pop() || 'bin';
        const filename = `${field}.${ext}`;
        const filePath = path.join(uploadDir, filename);
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);
        savedFiles[`${field}Url`] = `/uploads/${id}/${filename}`;
        savedFiles[`${field}Name`] = file.name;
        savedFiles[`${field}Size`] = String(file.size);
      }
    }

    const submission = {
      id,
      applicationNumber,
      position: 'Director of Business Development',
      status: 'new',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: applicationData,
      files: savedFiles,
      recruiterNotes: '',
      tags: [],
    };

    await saveApplication(submission);

    return NextResponse.json({ id, applicationNumber }, { status: 201 });
  } catch (err) {
    console.error('POST /api/applications error:', err);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

// DELETE /api/applications — clear ALL applications and uploaded files (admin only)
export async function DELETE() {
  try {
    await clearAllApplications();
    return NextResponse.json({ success: true, message: 'All applications cleared' });
  } catch (err) {
    console.error('DELETE /api/applications error:', err);
    return NextResponse.json({ error: 'Failed to clear applications' }, { status: 500 });
  }
}
