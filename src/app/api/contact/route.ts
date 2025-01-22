import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Here you would typically send the email or store the contact form data
    // For now, we'll just simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
