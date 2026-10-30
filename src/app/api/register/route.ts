import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      mobile,
      degree,
      passingYear,
      branch,
      rollNumber,
      registrationPurpose,
      currentDesignation,
      company,
      cityCountry,
      linkedinUrl,
      declarationAccepted,
    } = body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !mobile ||
      !degree ||
      !passingYear ||
      !branch ||
      !registrationPurpose ||
      !declarationAccepted
    ) {
      return NextResponse.json(
        { error: "Please fill in all mandatory fields." },
        { status: 400 }
      );
    }

    const regId = `SVNIT-REG-${passingYear}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;

    const sheetPayload = {
      timestamp: new Date().toISOString(),
      registrationId: regId,
      fullName,
      email,
      mobile,
      degree,
      passingYear,
      branch,
      rollNumber: rollNumber || "N/A",
      registrationPurpose,
      currentDesignation: currentDesignation || "",
      company: company || "",
      cityCountry: cityCountry || "",
      linkedinUrl: linkedinUrl || "",
      membershipCardRequested: "Yes",
      declarationConfirmed: declarationAccepted ? "Yes" : "No",
      status: "Pending Verification",
    };

    // Forward directly to Google Apps Script Web App URL
    const googleSheetUrl = process.env.GOOGLE_SHEET_WEBAPP_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

    if (googleSheetUrl) {
      try {
        await fetch(googleSheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetPayload),
        });
      } catch (sheetErr) {
        console.error("Failed to forward registration to Google Sheet:", sheetErr);
      }
    }

    return NextResponse.json({
      success: true,
      registrationId: regId,
      message: "Alumni registration submitted successfully.",
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit registration. Please try again." },
      { status: 500 }
    );
  }
}
