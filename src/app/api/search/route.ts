import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const objectType = new URL(request.url).searchParams.get("objectType");
  if (objectType) {
    const url = `https://${process.env.NEXT_PUBLIC_HOSTNAME}/api/v1/ontologies/${process.env.ONTOLOGYRID}/objects/${objectType}/search/`;
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((respJson) => NextResponse.json(respJson));
  }
}
