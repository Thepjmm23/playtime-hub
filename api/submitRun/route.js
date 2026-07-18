import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(req) {
  const { title, category, description, version, email } = await req.json();

  try {
    // 1. Check content with OpenAI Moderation AI
    const moderation = await openai.moderations.create({ input: `${title} ${description}` });
    if (moderation.results[0].flagged) {
      return NextResponse.json({ error: "Your post violated safety rules (AI blocked)." }, { status: 400 });
    }

    // 2. Insert safe content into Supabase Database
    const { data, error } = await supabase.from('speedruns').insert([
      { title, category, description, version, author_email: email }
    ]);

    if (error) throw error;
    return NextResponse.json({ success: true, message: "Run published securely!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}