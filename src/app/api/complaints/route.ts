import { NextResponse } from 'next/server';
import { INITIAL_COMPLAINTS } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level');
  const priority = searchParams.get('priority');

  let results = [...INITIAL_COMPLAINTS];
  if (level) {
    results = results.filter(c => c.currentLevel === level);
  }
  if (priority) {
    results = results.filter(c => c.priority === priority);
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    complaints: results
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, priority, targetAuthority, whyChosenAuthority } = body;

    if (!title || !description || !whyChosenAuthority) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, description, and whyChosenAuthority are required'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Complaint registered successfully with multi-tier routing',
      ticketNumber: `CR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    });
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Invalid request body'
    }, { status: 500 });
  }
}
