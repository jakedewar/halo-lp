import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, price } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Validate price
    if (!price || !['0', '5', '10', '15'].includes(price)) {
      return NextResponse.json(
        { success: false, message: 'Please select a valid price option.' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('email')
      .eq('email', email)
      .single();

    if (existingLead) {
      return NextResponse.json(
        { success: false, message: 'You\'re already on the waitlist!' },
        { status: 400 }
      );
    }

    // Insert new lead
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          email,
          price: parseInt(price),
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error inserting lead:', error);
      throw error;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist!' 
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 