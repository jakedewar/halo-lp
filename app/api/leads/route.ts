import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

// Rate limiting map (in a production environment, use Redis or similar)
const rateLimiter = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT = {
  MAX_REQUESTS: 5,
  WINDOW_MS: 60000, // 1 minute
};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimiter.get(ip);

  if (!record) {
    rateLimiter.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > RATE_LIMIT.WINDOW_MS) {
    // Reset if window has passed
    rateLimiter.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= RATE_LIMIT.MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { email } = await request.json();
    
    console.log('Received request:', { email });

    // Validate email
    if (!email || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      console.log('Invalid email:', email);
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    console.log('Checking for existing lead...');
    // Check if email exists using our secure function
    const { data: exists, error: existingError } = await supabaseAdmin
      .rpc('check_email_exists', { check_email: email });

    if (existingError) {
      console.error('Error checking existing lead:', existingError);
      throw existingError;
    }

    if (exists) {
      return NextResponse.json(
        { success: false, message: 'You\'re already on the waitlist!' },
        { status: 400 }
      );
    }

    console.log('Inserting new lead...');
    // Insert new lead with metadata
    const { error: insertError } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          email,
          price: 0,
          created_at: new Date().toISOString(),
          metadata: {
            ip_address: ip,
            user_agent: request.headers.get('user-agent'),
            signup_source: request.headers.get('referer')
          }
        },
      ]);

    if (insertError) {
      console.error('Error inserting lead:', insertError);
      throw insertError;
    }

    console.log('Successfully inserted lead');
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist!' 
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
} 