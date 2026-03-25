import { NextRequest, NextResponse } from "next/server"
import { Client } from "@notionhq/client"

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    console.log("Received form data:", JSON.stringify(data, null, 2))
    
    // Validate required environment variables
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      console.error("Missing Notion environment variables")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Validate form data
    const requiredFields = [
      'name', 'email', 'enrollmentId', 'year', 'whatsappNumber',
      'preFestDepartments', 'festDayDepartment', 'motivation'
    ]
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Create the page in Notion database
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        // Name field (Title)
        "Name": {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        // University Email field (Email)
        "University Email": {
          email: data.email,
        },
        // Enrollment ID field (Rich Text)
        "Enrollment ID": {
          rich_text: [
            {
              text: {
                content: data.enrollmentId,
              },
            },
          ],
        },
        // Year field (Multi-select)
        "Year": {
          multi_select: [
            {
              name: data.year,
            },
          ],
        },
        // Whatsapp Number field (Phone)
        "Whatsapp Number": {
          phone_number: data.whatsappNumber,
        },
        // Pre Fest Department Choice field (Multi-select)
        "Pre Fest Department Choice": {
          multi_select: data.preFestDepartments.map((dept: string) => ({
            name: dept,
          })),
        },
        // Fest Day Department Choice field (Multi-select)
        "Fest Day Department Choice": {
          multi_select: [
            {
              name: data.festDayDepartment,
            },
          ],
        },
        // Why do you want to join Neutron field (Rich Text)
        "Why do you want to join Neutron": {
          rich_text: [
            {
              text: {
                content: data.motivation,
              },
            },
          ],
        },
        // Show us your work field (Rich Text) - Optional
        "Show us your work": {
          rich_text: data.workSample ? [
            {
              text: {
                content: data.workSample,
              },
            },
          ] : [],
        },
        // Status field (Status) - Default to appropriate status
        "Status": {
          status: {
            name: "Form Filled",
          },
        },
      },
    })

    console.log("Successfully created Notion page:", response.id)
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Registration submitted successfully!",
        pageId: response.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error submitting to Notion:", error)
    
    // Return appropriate error message with more details
    if (error instanceof Error) {
      console.error("Error details:", error.message)
      console.error("Error stack:", error.stack)
      return NextResponse.json(
        { 
          error: "Failed to submit registration", 
          details: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to submit registration", details: "Unknown error" },
      { status: 500 }
    )
  }
}
