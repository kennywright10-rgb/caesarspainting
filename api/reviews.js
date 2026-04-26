/**
 * Caesar's Painting — Live Google Reviews API
 * Vercel Serverless Function: /api/reviews
 *
 * Fetches real reviews from Google Places API.
 * Requires two Vercel environment variables:
 *   GOOGLE_PLACES_API_KEY  — your Google Cloud API key
 *   GOOGLE_PLACE_ID        — your Google Place ID (e.g. ChIJxxxxxxxx)
 *
 * Responses are cached for 1 hour by Vercel's edge CDN.
 */

export default async function handler(req, res) {
  const apiKey  = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // ── Missing config ──────────────────────────────────────────────────────
  if (!apiKey || !placeId) {
    return res.status(200).json({
      configured: false,
      error: "Google Places API not yet configured.",
      reviews: [],
      rating: 5.0,
      user_ratings_total: 4
    });
  }

  // ── Fetch from Google Places API ────────────────────────────────────────
  const fields = "name,rating,user_ratings_total,reviews";
  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=${encodeURIComponent(fields)}` +
    `&reviews_sort=newest` +
    `&key=${apiKey}`;

  try {
    const googleRes = await fetch(url);
    if (!googleRes.ok) {
      throw new Error(`Google API returned ${googleRes.status}`);
    }

    const data = await googleRes.json();

    if (data.status !== "OK") {
      throw new Error(`Places API status: ${data.status}`);
    }

    const result = data.result;

    // Normalise reviews to a clean shape
    const reviews = (result.reviews || []).map(r => ({
      author:  r.author_name,
      avatar:  r.profile_photo_url || null,
      rating:  r.rating,
      text:    r.text,
      date:    new Date(r.time * 1000).toISOString().split("T")[0],
      url:     r.author_url || null,
    }));

    // Cache at Vercel edge for 1 hour, stale-while-revalidate for 24 h
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(200).json({
      configured:          true,
      name:                result.name,
      rating:              result.rating,
      user_ratings_total:  result.user_ratings_total,
      reviews,
    });

  } catch (err) {
    console.error("Google Places fetch error:", err.message);

    // Graceful fallback — return success so the page still works
    return res.status(200).json({
      configured: false,
      error:      err.message,
      reviews:    [],
      rating:     5.0,
      user_ratings_total: 4,
    });
  }
}
