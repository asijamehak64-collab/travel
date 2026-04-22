const nodemailer = require("nodemailer");
require("dotenv").config();

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send booking notification email
 * @param {Object} data
 */
const sendNotificationEmail = async ({
  email,
  name,
  status,
  placeName,
  bookingDate,
  bookingId,
}) => {
  try {
    const mailOptions = {
      from: `"Wanderly ✈️" <${process.env.EMAIL_USER}>`,
      to: email,
      subject:
        status === "approved"
          ? "Your Booking is Confirmed! 🎉"
          : status === "rejected"
          ? "Your Booking was Rejected ❌"
          : "Booking Update",

      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background-color: #0ea5e9; padding: 20px; text-align: center; color: white;">
              <h1 style="margin: 0;">Wanderly</h1>
              <p style="margin: 5px 0 0;">Travel Booking Update</p>
            </div>

            <!-- Body -->
            <div style="padding: 20px;">
              <p>Hi <strong>${name}</strong>,</p>

              <p>
                ${
                  status === "approved"
                    ? "🎉 Your booking has been successfully confirmed!"
                    : status === "rejected"
                    ? "❌ Unfortunately, your booking was rejected."
                    : "Your booking status has been updated."
                }
              </p>

              <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p><strong>📍 Destination:</strong> ${placeName || "N/A"}</p>
                <p><strong>📅 Date:</strong> ${bookingDate || "N/A"}</p>
                <p><strong>🧾 Booking ID:</strong> ${bookingId}</p>
              </div>

              <a href="https://wanderly.example.com"
                style="display:inline-block; padding: 12px 20px; background-color:#0ea5e9; color:white; text-decoration:none; border-radius:6px; margin-top:10px;">
                View Booking
              </a>

              <p style="margin-top: 20px;">
                Safe travels ✈️,<br>
                <strong>Team Wanderly</strong>
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
              <p>Need help? Contact us anytime.</p>
              <p>&copy; ${new Date().getFullYear()} Wanderly. All rights reserved.</p>
            </div>

          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

// ✅ CommonJS export
module.exports = sendNotificationEmail;