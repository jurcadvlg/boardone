import { Directions } from '@/types/Directions';
import to from '@/utils/awaitTo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const waypoints = searchParams.get('waypoints');

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${apiKey}&language=cs`;

  const [error, response] = await to(fetch(url));

  if (error || !response.ok) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch directions' }, { status: 500 });
  }

  const data: Directions = await response.json();

  return NextResponse.json(data);
}
