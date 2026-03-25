import { NextRequest, NextResponse } from "next/server";

const rt = (value: string) => [{ text: { content: value ?? "" } }];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      whatsapp,
      gender,
      college,
      stream,
      yearOfStudy,
      previousExperience,
      whyAmbassador,
      instagramUrl,
      linkedinUrl,
    } = body;

    if (!name || !email || !whatsapp || !college) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const notionToken = process.env.NOTION_TOKEN;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!notionToken || !databaseId) {
      console.error("Missing NOTION_TOKEN or NOTION_DATABASE_ID in .env.local");
      return NextResponse.json(
        { error: "Server configuration error — Notion credentials not set" },
        { status: 500 }
      );
    }

    const notionBody = {
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: rt(name),
        },
        Email: {
          email: email || null,
        },
        "Whatsapp Number": {
          number: Number(whatsapp.replace(/\D/g, "")) || 0,
        },
        Gender: {
          multi_select: gender
            ? [{ name: gender }]
            : [],
        },
        "College Name": {
          rich_text: rt(college),
        },
        Stream: {
          rich_text: rt(stream || ""),
        },
        "Year of Study": {
          multi_select: yearOfStudy
            ? [{ name: yearOfStudy }]
            : [],
        },
        "Previous Experience": {
          rich_text: rt(previousExperience || ""),
        },
        "Why Ambassador": {
          rich_text: rt(whyAmbassador || ""),
        },
        "Instagram Profile Url": {
          url: instagramUrl ? (instagramUrl.startsWith('http') ? instagramUrl : `https://${instagramUrl}`) : null,
        },
        "Linkedin Profile Url": {
          url: linkedinUrl ? (linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`) : null,
        },
      },
    };

    console.log("Submitting to Notion database:", databaseId);

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionToken}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify(notionBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API error:", JSON.stringify(errorData, null, 2));
      return NextResponse.json(
        { error: "Failed to save to Notion", details: errorData },
        { status: response.status }
      );
    }

    console.log("Saved to Notion successfully");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
