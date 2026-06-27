import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Collision } from "./types";

export const generateCollisionPDF = async (collision: Collision) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const vehiclesHTML = collision.vehicles
    .map(
      (vehicle, index) => `
    <div class="vehicle-card" style="margin-bottom: 12px; border: 1px solid #ddd; padding: 10px; background-color: #fafafa;">
      <h3 style="color: #2c3e50; margin-top: 0; font-size: 13px;">Vehicle ${index + 1}</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <tr>
          <td style="padding: 4px; font-weight: bold; width: 40%;">Make:</td>
          <td style="padding: 4px;">${vehicle.make || "N/A"}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 4px; font-weight: bold;">Model:</td>
          <td style="padding: 4px;">${vehicle.model || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 4px; font-weight: bold;">Color:</td>
          <td style="padding: 4px;">${vehicle.color || "N/A"}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 4px; font-weight: bold;">License Plate:</td>
          <td style="padding: 4px;">${vehicle.licensePlate || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 4px; font-weight: bold;">Insurance Company:</td>
          <td style="padding: 4px;">${vehicle.insuranceCompany || "N/A"}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 4px; font-weight: bold;">Policy Number:</td>
          <td style="padding: 4px;">${vehicle.policyNumber || "N/A"}</td>
        </tr>
      </table>
      ${
        vehicle.driver
          ? `
        <h4 style="color: #34495e; margin-top: 8px; margin-bottom: 5px; font-size: 11px;">Driver Information</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
          <tr>
            <td style="padding: 4px; font-weight: bold; width: 40%;">Name:</td>
            <td style="padding: 4px;">${vehicle.driver.name || "N/A"}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 4px; font-weight: bold;">License Number:</td>
            <td style="padding: 4px;">${vehicle.driver.license || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 4px; font-weight: bold;">Address:</td>
            <td style="padding: 4px;">${vehicle.driver.address || "N/A"}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 4px; font-weight: bold;">Phone Number:</td>
            <td style="padding: 4px;">${vehicle.driver.phoneNumber || "N/A"}</td>
          </tr>
        </table>
      `
          : '<p style="color: #7f8c8d; font-style: italic; font-size: 10px;">No driver information provided</p>'
      }
    </div>
  `,
    )
    .join("");

  const witnessesHTML =
    collision.witnesses.length > 0
      ? collision.witnesses
          .map(
            (witness, index) => `
    <div class="witness-card" style="margin-bottom: 10px; padding: 8px; border-left: 3px solid #3498db; background-color: #f8f9fa;">
      <h4 style="color: #2c3e50; margin: 0 0 5px 0; font-size: 11px;">Witness ${index + 1}</h4>
      <p style="margin: 3px 0; font-size: 10px;"><strong>Name:</strong> ${witness.name || "N/A"}</p>
      <p style="margin: 3px 0; font-size: 10px;"><strong>Address:</strong> ${witness.address || "N/A"}</p>
      <p style="margin: 3px 0; font-size: 10px;"><strong>Phone:</strong> ${witness.phoneNumber || "N/A"}</p>
    </div>
  `,
          )
          .join("")
      : '<p style="color: #7f8c8d; font-style: italic; font-size: 10px;">No witnesses recorded</p>';

  const officerHTML = collision.officer
    ? `
    <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
      <tr>
        <td style="padding: 4px; font-weight: bold; width: 40%;">Officer Name:</td>
        <td style="padding: 4px;">${collision.officer.name || "N/A"}</td>
      </tr>
      <tr style="background-color: #f5f5f5;">
        <td style="padding: 4px; font-weight: bold;">Badge Number:</td>
        <td style="padding: 4px;">${collision.officer.badgeNumber || "N/A"}</td>
      </tr>
    </table>
  `
    : '<p style="color: #7f8c8d; font-style: italic; font-size: 10px;">No officer information recorded</p>';

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <style>
      @page {
        size: letter;
        margin: 0.5in;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        padding: 15px;
        color: #333;
        line-height: 1.4;
        font-size: 11px;
      }
      .header {
        text-align: center;
        border-bottom: 2px solid #2c3e50;
        padding-bottom: 10px;
        margin-bottom: 15px;
      }
      .header h1 {
        color: #2c3e50;
        font-size: 22px;
        margin-bottom: 5px;
      }
      .header p {
        color: #7f8c8d;
        font-size: 10px;
      }
      .section {
        margin-bottom: 15px;
      }
      .section-title {
        background-color: #2c3e50;
        color: white;
        padding: 6px 10px;
        font-size: 13px;
        margin-bottom: 8px;
      }
      .info-grid {
        background-color: #f8f9fa;
        padding: 10px;
        border-radius: 3px;
      }
      .info-row {
        margin-bottom: 5px;
      }
      .label {
        font-weight: bold;
        color: #2c3e50;
      }
      .description-box {
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 10px;
        margin-top: 5px;
        border-radius: 3px;
      }
      .footer {
        margin-top: 20px;
        padding-top: 10px;
        border-top: 1px solid #ecf0f1;
        text-align: center;
        color: #7f8c8d;
        font-size: 9px;
      }
      .vehicle-card {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .witness-card {
        page-break-inside: avoid;
        break-inside: avoid;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>COLLISION REPORT</h1>
      <p>Generated: ${formatDate(new Date())}</p>
    </div>

    <div class="section">
      <div class="section-title">Incident Information</div>
      <div class="info-grid">
        <div class="info-row">
          <span class="label">Date & Time:</span> ${formatDate(collision.date)}
        </div>
        <div class="info-row">
          <span class="label">Location:</span> ${collision.location.description || "N/A"}
        </div>
        ${
          collision.location.coordinates
            ? `
        <div class="info-row">
          <span class="label">Coordinates:</span> 
          ${collision.location.coordinates.latitude.toFixed(6)}, ${collision.location.coordinates.longitude.toFixed(6)}
        </div>
        `
            : ""
        }
      </div>
    </div>

    <div class="section">
      <div class="section-title">Incident Description</div>
      <div class="description-box">
        ${collision.description || "No description provided"}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Vehicles Involved (${collision.vehicles.length})</div>
      ${vehiclesHTML}
    </div>

    <div class="section">
      <div class="section-title">Witnesses (${collision.witnesses.length})</div>
      ${witnessesHTML}
    </div>

    <div class="section">
      <div class="section-title">Officer Information</div>
      ${officerHTML}
    </div>

    <div class="section">
      <div class="section-title">Media Documentation</div>
      <div class="info-grid">
        <div class="info-row">
          <span class="label">Total Media Files:</span> ${collision.media.length}
        </div>
        ${
          collision.media.length > 0
            ? `
        <div class="info-row">
          <span class="label">Note:</span> Media files are stored separately and referenced in this report.
        </div>
        `
            : ""
        }
      </div>
    </div>

    <div class="footer">
      <p>This is an NOT official collision report document.</p>
      <p>Report generated on ${formatDate(new Date())}</p>
    </div>
  </body>
</html>`;
  const { uri } = await Print.printToFileAsync({ html });
  console.log("File has been saved to:", uri);
  await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
};
