import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://ru.investing.com/crypto/tether/usdt-rub');
    const html = await res.text();
    const $ = cheerio.load(html);
    const price = $('div[data-test="instrument-price-last"]').text().trim();

    return NextResponse.json({ price });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 });
  }
}
