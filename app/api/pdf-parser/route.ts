import { NextResponse } from 'next/server';
import pdf from 'pdf-parse/lib/pdf-parse';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    const arrayBuffer = await file.arrayBuffer();
    const data = await pdf(Buffer.from(arrayBuffer));
    
    // Clean and format the text
    const cleanedText = data.text
      // Replace multiple spaces (3 or more) with two spaces
      .replace(/\s{3,}/g, '  ')
      // Replace multiple newlines with double newline for paragraph separation
      .replace(/\n{3,}/g, '\n\n')
      // Remove page numbers and headers (customize based on your PDF format)
      .replace(/Page \d+ of \d+/g, '')
      // Trim whitespace from start/end
      .trim();

    return NextResponse.json({ text: cleanedText });
  } catch (error) {
    console.error('PDF parsing error:', error);
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
}
