/**
 * SVNIT Alumni Association - Google Sheet Webhook Script (Code.gs)
 * Features:
 *  - Instant real-time submission (< 1 second) via SpreadsheetApp.flush()
 *  - Full-length, clickable Cloudinary photo links & Google Drive links
 *  - Generous column widths (280px-350px) so links are never cut off
 *  - Supports ACE Alumnus Accolade Nominations & Alumni Registration Drive
 */

function initialSetup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  sheet.setName("Nominations & Registrations");

  var headers = [
    "Timestamp",
    "Submission ID",
    "Form Type",
    "Full Name / Nominee",
    "Accolade Category / Purpose",
    "Degree",
    "Passing Year",
    "Branch / Discipline",
    "Date of Birth",
    "Mobile Number",
    "Other Phone",
    "Email Address",
    "Residence Address",
    "Work / Office Address",
    "Nominee Photo (Clickable Link)",
    "Proposer Name",
    "Proposer Degree & Year",
    "Proposer Email",
    "Proposer Mobile",
    "Proposer Address",
    "Seconder Name",
    "Seconder Degree & Year",
    "Seconder Email",
    "Seconder Mobile",
    "Seconder Address",
    "Annexure 1 (Work Exp)",
    "Annexure 2 (SVNIT Impact)",
    "Annexure 3 (Society Contribution)",
    "Annexure 4 (Alumni Activities)",
    "Annexure 5 (SVNIT Contribution)",
    "Annexure 6 (Student Welfare)",
    "Annexure 7 (Future Support)",
    "Annexure 8 (Additional Evidence)",
    "Declaration Accepted",
    "Status"
  ];

  // Set and format headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#0F1E36"); // SVNIT Navy Blue
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Arial");
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  // Set generous column widths so URLs, addresses, and names are full length and easily visible
  sheet.setColumnWidth(1, 160);  // Timestamp
  sheet.setColumnWidth(2, 180);  // Submission ID
  sheet.setColumnWidth(3, 180);  // Form Type
  sheet.setColumnWidth(4, 220);  // Nominee Name
  sheet.setColumnWidth(5, 260);  // Category
  sheet.setColumnWidth(6, 110);  // Degree
  sheet.setColumnWidth(7, 110);  // Passing Year
  sheet.setColumnWidth(8, 180);  // Branch
  sheet.setColumnWidth(9, 110);  // DOB
  sheet.setColumnWidth(10, 140); // Mobile
  sheet.setColumnWidth(11, 140); // Other Phone
  sheet.setColumnWidth(12, 240); // Email
  sheet.setColumnWidth(13, 280); // Residence Address
  sheet.setColumnWidth(14, 280); // Work Address
  sheet.setColumnWidth(15, 300); // Nominee Photo (FULL WIDTH CLICKABLE LINK)
  sheet.setColumnWidth(16, 200); // Proposer Name
  sheet.setColumnWidth(17, 160); // Proposer Degree/Year
  sheet.setColumnWidth(18, 220); // Proposer Email
  sheet.setColumnWidth(19, 140); // Proposer Mobile
  sheet.setColumnWidth(20, 240); // Proposer Address
  sheet.setColumnWidth(21, 200); // Seconder Name
  sheet.setColumnWidth(22, 160); // Seconder Degree/Year
  sheet.setColumnWidth(23, 220); // Seconder Email
  sheet.setColumnWidth(24, 140); // Seconder Mobile
  sheet.setColumnWidth(25, 240); // Seconder Address

  // Annexure columns (26 to 33)
  for (var col = 26; col <= 33; col++) {
    sheet.setColumnWidth(col, 220);
  }
  sheet.setColumnWidth(34, 150); // Declaration
  sheet.setColumnWidth(35, 130); // Status
}

// Webhook endpoint to receive POST requests from the website
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other submissions to release lock
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Parse incoming JSON payload
    var data = JSON.parse(e.postData.contents);

    var timestamp = new Date();
    var submissionId = data.submissionId || ("AAA-" + timestamp.getTime());

    // Format Photo URL as full-width clickable Hyperlink
    var photoCell = "";
    if (data.photoUrl && data.photoUrl.toString().trim() !== "") {
      photoCell = '=HYPERLINK("' + data.photoUrl + '", "📸 Click to View Nominee Photo")';
    } else if (data.photoName) {
      photoCell = data.photoName;
    }

    // Helper to format file / Drive links
    function formatLink(val, label) {
      if (!val) return "";
      var str = val.toString().trim();
      if (str.indexOf("http://") === 0 || str.indexOf("https://") === 0 || str.indexOf("drive.google.com") !== -1) {
        return '=HYPERLINK("' + str + '", "📄 ' + (label || "View Drive File") + '")';
      }
      return str;
    }

    var row = [
      timestamp,
      submissionId,
      data.formType || "ACE Accolade Nomination",
      data.nomineeName || data.name || data.fullName || "",
      data.category || data.purpose || data.registrationPurpose || "",
      data.degree || "",
      data.yearOfPassing || data.batch || data.passingYear || "",
      data.branch || "",
      data.dateOfBirth || "",
      data.mobile || data.phone || "",
      data.otherPhone || "",
      data.email || "",
      data.addressResidence || data.cityCountry || "",
      data.addressWork || data.company || "",
      photoCell,
      data.proposerName || "",
      data.proposerDegreeYear || "",
      data.proposerEmail || "",
      data.proposerMobile || "",
      data.proposerAddress || "",
      data.seconderName || "",
      data.seconderDegreeYear || "",
      data.seconderEmail || "",
      data.seconderMobile || "",
      data.seconderAddress || "",
      formatLink(data.annexure1, "Annexure 1"),
      formatLink(data.annexure2, "Annexure 2"),
      formatLink(data.annexure3, "Annexure 3"),
      formatLink(data.annexure4, "Annexure 4"),
      formatLink(data.annexure5, "Annexure 5"),
      formatLink(data.annexure6, "Annexure 6"),
      formatLink(data.annexure7, "Annexure 7"),
      formatLink(data.annexure8, "Annexure 8"),
      data.declarationAccepted || data.declarationConfirmed || "Yes",
      data.status || "Submitted"
    ];

    // Append the row
    sheet.appendRow(row);

    var lastRow = sheet.getLastRow();

    // Ensure link column is wide enough to view the link in full length
    sheet.setColumnWidth(15, 300);

    // Style the new row: vertical center alignment
    sheet.getRange(lastRow, 1, 1, row.length).setVerticalAlignment("middle");

    // CRITICAL: SpreadsheetApp.flush() forces Google Sheets to write and display the row INSTANTLY
    SpreadsheetApp.flush();

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", id: submissionId, row: lastRow })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Health check endpoint
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "active", message: "Google Sheet Webhook is live." })
  ).setMimeType(ContentService.MimeType.JSON);
}
