import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { searchParams } = new URL(request.url);
  if (searchParams.get("objectType")) {
    const url = `https://${
      process.env.NEXT_PUBLIC_HOSTNAME
    }/api/v1/ontologies/${process.env.ONTOLOGYRID}/objects/${searchParams.get(
      "objectType"
    )}/search/`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const data = await res.json();
      return NextResponse.json(data);
    }
    console.log(res);
    return res;
  }
  return new NextResponse(null, {
    status: 400,
    statusText: "Bad request. Must include the objectType url param.",
  });
}
