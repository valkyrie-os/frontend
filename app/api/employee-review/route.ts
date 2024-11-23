import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const response = await fetch('http://localhost:8000/mock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: parseInt(data.id),
        Name: data.name,
        Position: data.position,
        Level: data.level,
        Github: data.github,
        Slack: data.slack,
        PdfContent: data.pdfContent || '' // Optional PDF content
      })
    });

    const reviewData = await response.json();
    return NextResponse.json(reviewData);
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json({ error: 'Failed to generate review' }, { status: 500 });
  }
} 