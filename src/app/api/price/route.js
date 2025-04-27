import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://ru.investing.com/crypto/tether/usdt-rub', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    // --- Detect and remove modal if it exists ---
    const modal = $('div[class*="modal"], div[id*="modal"]'); // common modal selectors
    if (modal.length > 0) {
      console.log('Modal detected. Removing modal from DOM.');
      modal.remove();
    }

    // --- Then safely parse price ---
    const price = $('div[data-test="instrument-price-last"]').text().trim();

    if (!price) {
      console.error('Price not found. Possibly blocked or page not fully loaded.');
      return NextResponse.json({ error: 'Could not fetch price. Try again later.' }, { status: 503 });
    }

    return NextResponse.json({ price });
  } catch (error) {
    console.error('Error fetching price:', error);
    return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 });
  }
}
