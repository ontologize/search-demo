import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  if (searchParams.get("objectType") && searchParams.get("query")) {
    const url = `https://${
      process.env.NEXT_PUBLIC_HOSTNAME
    }/api/v1/ontologies/${process.env.ONTOLOGYRID}/objects/${searchParams.get(
      "objectType"
    )}/search/`;
    console.log(url);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      body: JSON.stringify({
        query: {
          type: "allTerms",
          field: "properties.subject",
          value: searchParams.get("query"),
        },
        pageSize: 10,
      }),
    });
    const data = await res.json();

    return NextResponse.json(data);
  }
}
