// Professional Email Templates for Rax Tech International
// Minimalist, sleek design with brand colors

const BRAND = {
  name: "Rax Tech International",
  accent: "#DC143C", // Crimson
  dark: "#1a1a1a",
  gray: "#666666",
  lightGray: "#f5f5f5",
  website: "https://raxgbc.co.in",
  logo: "https://vziyntciabkelnaujliq.supabase.co/storage/v1/object/public/rax_landing_products/logo.png",
};

const baseStyles = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
  </style>
`;

const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${baseStyles}
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          ${content}
        </table>

        <!-- Footer -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; margin-top: 24px;">
          <tr>
            <td align="center" style="padding: 0 20px;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #999999;">
                This is an automated message. Please do not reply to this email.
              </p>
              <p style="margin: 0; font-size: 12px; color: #999999;">
                © ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ============================================
// CONTACT FORM ACKNOWLEDGEMENT
// ============================================
export interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  company?: string;
}

export function generateContactAcknowledgementEmail(data: ContactEmailData): string {
  const content = `
    <!-- Header with accent line -->
    <tr>
      <td style="height: 4px; background: linear-gradient(90deg, ${BRAND.accent} 0%, ${BRAND.accent}99 100%);"></td>
    </tr>

    <!-- Logo -->
    <tr>
      <td style="padding: 32px 40px 16px 40px; text-align: center;">
        <img src="${BRAND.logo}" alt="${BRAND.name}" width="120" style="display: inline-block; max-width: 120px; height: auto;" />
      </td>
    </tr>

    <!-- Title -->
    <tr>
      <td style="padding: 0 40px 24px 40px; text-align: center;">
        <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600; color: ${BRAND.dark};">
          Thank You for Reaching Out
        </h1>
        <p style="margin: 0; font-size: 14px; color: ${BRAND.gray};">
          We've received your message
        </p>
      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="padding: 0 40px;">
        <div style="height: 1px; background-color: #eaeaea;"></div>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px 40px;">
        <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: ${BRAND.dark};">
          Hi ${data.firstName},
        </p>
        <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: ${BRAND.gray};">
          Thank you for getting in touch with ${BRAND.name}. We've received your inquiry and our team will review it shortly.
        </p>

        <!-- Message Summary Box -->
        <div style="background-color: ${BRAND.lightGray}; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: ${BRAND.gray};">
            Your Message
          </p>
          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: ${BRAND.dark}; font-style: italic;">
            "${data.message.length > 200 ? data.message.substring(0, 200) + '...' : data.message}"
          </p>
        </div>

        <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: ${BRAND.gray};">
          We typically respond within <strong style="color: ${BRAND.dark};">24-48 hours</strong>. If your matter is urgent, please call us directly.
        </p>

        <!-- Contact Info -->
        <div style="background-color: #fafafa; border-left: 3px solid ${BRAND.accent}; padding: 16px 20px; border-radius: 0 8px 8px 0;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: ${BRAND.gray};">
            <strong style="color: ${BRAND.dark};">Phone:</strong> +91 44-22771949
          </p>
          <p style="margin: 0; font-size: 13px; color: ${BRAND.gray};">
            <strong style="color: ${BRAND.dark};">Email:</strong> sales@raxgbc.co.in
          </p>
        </div>
      </td>
    </tr>

    <!-- Footer CTA -->
    <tr>
      <td style="padding: 0 40px 40px 40px; text-align: center;">
        <a href="${BRAND.website}" style="display: inline-block; padding: 12px 32px; background-color: ${BRAND.accent}; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 6px;">
          Visit Our Website
        </a>
      </td>
    </tr>

    <!-- Brand Footer -->
    <tr>
      <td style="padding: 24px 40px; background-color: ${BRAND.dark}; text-align: center;">
        <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #ffffff;">
          ${BRAND.name}
        </p>
        <p style="margin: 0; font-size: 12px; color: #888888;">
          IoT | Automation | e-Surveillance | Blockchain & Web3
        </p>
      </td>
    </tr>
  `;

  return emailWrapper(content);
}

// ============================================
// JOB APPLICATION ACKNOWLEDGEMENT
// ============================================
export interface JobApplicationEmailData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  jobLocation?: string;
}

export function generateJobApplicationAcknowledgementEmail(data: JobApplicationEmailData): string {
  const content = `
    <!-- Header with accent line -->
    <tr>
      <td style="height: 4px; background: linear-gradient(90deg, ${BRAND.accent} 0%, ${BRAND.accent}99 100%);"></td>
    </tr>

    <!-- Logo -->
    <tr>
      <td style="padding: 32px 40px 16px 40px; text-align: center;">
        <img src="${BRAND.logo}" alt="${BRAND.name}" width="120" style="display: inline-block; max-width: 120px; height: auto;" />
      </td>
    </tr>

    <!-- Icon & Title -->
    <tr>
      <td style="padding: 0 40px 24px 40px; text-align: center;">
        <!-- Checkmark Icon -->
        <div style="width: 56px; height: 56px; background-color: #e8f5e9; border-radius: 50%; margin: 0 auto 16px auto; display: flex; align-items: center; justify-content: center;">
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width: 56px; height: 56px; background-color: #e8f5e9; border-radius: 50%; text-align: center; vertical-align: middle;">
                <span style="font-size: 24px; color: #4caf50;">✓</span>
              </td>
            </tr>
          </table>
        </div>
        <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600; color: ${BRAND.dark};">
          Application Received
        </h1>
        <p style="margin: 0; font-size: 14px; color: ${BRAND.gray};">
          Thank you for your interest in joining our team
        </p>
      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="padding: 0 40px;">
        <div style="height: 1px; background-color: #eaeaea;"></div>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px 40px;">
        <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: ${BRAND.dark};">
          Hi ${data.firstName},
        </p>
        <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: ${BRAND.gray};">
          We've received your application and want to thank you for considering a career with ${BRAND.name}.
        </p>

        <!-- Position Applied Box -->
        <div style="background-color: ${BRAND.lightGray}; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: ${BRAND.gray};">
            Position Applied
          </p>
          <p style="margin: 0; font-size: 16px; font-weight: 600; color: ${BRAND.dark};">
            ${data.jobTitle}
          </p>
          ${data.jobLocation ? `<p style="margin: 4px 0 0 0; font-size: 13px; color: ${BRAND.gray};">${data.jobLocation}</p>` : ''}
        </div>

        <!-- What's Next Section -->
        <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: ${BRAND.dark};">
          What happens next?
        </p>

        <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; background-color: ${BRAND.accent}; color: #ffffff; font-size: 12px; font-weight: 600; line-height: 24px; text-align: center; border-radius: 50%; margin-right: 12px;">1</span>
            </td>
            <td style="padding: 8px 0; font-size: 14px; color: ${BRAND.gray}; line-height: 1.5;">
              Our team will review your application carefully
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; background-color: ${BRAND.accent}; color: #ffffff; font-size: 12px; font-weight: 600; line-height: 24px; text-align: center; border-radius: 50%; margin-right: 12px;">2</span>
            </td>
            <td style="padding: 8px 0; font-size: 14px; color: ${BRAND.gray}; line-height: 1.5;">
              If your profile matches our requirements, we'll reach out to schedule an interview
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; background-color: ${BRAND.accent}; color: #ffffff; font-size: 12px; font-weight: 600; line-height: 24px; text-align: center; border-radius: 50%; margin-right: 12px;">3</span>
            </td>
            <td style="padding: 8px 0; font-size: 14px; color: ${BRAND.gray}; line-height: 1.5;">
              We'll keep you updated on your application status
            </td>
          </tr>
        </table>

        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: ${BRAND.gray};">
          We appreciate your patience during the review process. Our hiring team carefully evaluates each application to ensure the best fit for both you and our organization.
        </p>
      </td>
    </tr>

    <!-- Footer CTA -->
    <tr>
      <td style="padding: 0 40px 40px 40px; text-align: center;">
        <a href="${BRAND.website}/careers" style="display: inline-block; padding: 12px 32px; background-color: ${BRAND.accent}; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 6px;">
          View More Opportunities
        </a>
      </td>
    </tr>

    <!-- Brand Footer -->
    <tr>
      <td style="padding: 24px 40px; background-color: ${BRAND.dark}; text-align: center;">
        <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #ffffff;">
          ${BRAND.name}
        </p>
        <p style="margin: 0; font-size: 12px; color: #888888;">
          Building Tomorrow's Technology Today
        </p>
      </td>
    </tr>
  `;

  return emailWrapper(content);
}

// ============================================
// PRODUCT ENQUIRY ACKNOWLEDGEMENT
// ============================================
export interface ProductEnquiryEmailData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  company?: string;
  product: {
    name: string;
    model: string;
    image: string;
    category: string;
  };
}

export function generateProductEnquiryAcknowledgementEmail(data: ProductEnquiryEmailData): string {
  const content = `
    <!-- Header with accent line -->
    <tr>
      <td style="height: 4px; background: linear-gradient(90deg, ${BRAND.accent} 0%, ${BRAND.accent}99 100%);"></td>
    </tr>

    <!-- Logo -->
    <tr>
      <td style="padding: 32px 40px 16px 40px; text-align: center;">
        <img src="${BRAND.logo}" alt="${BRAND.name}" width="120" style="display: inline-block; max-width: 120px; height: auto;" />
      </td>
    </tr>

    <!-- Title -->
    <tr>
      <td style="padding: 0 40px 24px 40px; text-align: center;">
        <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600; color: ${BRAND.dark};">
          Product Enquiry Received
        </h1>
        <p style="margin: 0; font-size: 14px; color: ${BRAND.gray};">
          Thank you for your interest in our product
        </p>
      </td>
    </tr>

    <!-- Product Card -->
    <tr>
      <td style="padding: 0 40px 24px 40px;">
        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="background-color: ${BRAND.lightGray}; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="padding: 20px;">
              <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <!-- Product Image -->
                  <td style="width: 120px; vertical-align: top;">
                    <div style="width: 100px; height: 100px; background-color: #ffffff; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                      <img src="${data.product.image}" alt="${data.product.name}" width="90" height="90" style="display: block; max-width: 90px; max-height: 90px; object-fit: contain;" />
                    </div>
                  </td>
                  <!-- Product Details -->
                  <td style="vertical-align: top; padding-left: 16px;">
                    <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: ${BRAND.accent};">
                      ${data.product.category}
                    </p>
                    <p style="margin: 0 0 6px 0; font-size: 18px; font-weight: 600; color: ${BRAND.dark}; line-height: 1.3;">
                      ${data.product.name}
                    </p>
                    <p style="margin: 0; font-size: 13px; color: ${BRAND.gray}; font-family: 'Courier New', monospace; background-color: #ffffff; padding: 4px 8px; border-radius: 4px; display: inline-block;">
                      Model: ${data.product.model}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="padding: 0 40px;">
        <div style="height: 1px; background-color: #eaeaea;"></div>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px 40px;">
        <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: ${BRAND.dark};">
          Hi ${data.firstName},
        </p>
        <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: ${BRAND.gray};">
          Thank you for your interest in <strong style="color: ${BRAND.dark};">${data.product.name}</strong>. Our team has received your enquiry and will get back to you with detailed information about pricing, availability, and technical specifications.
        </p>

        <!-- Your Message Box -->
        <div style="background-color: #fafafa; border-left: 3px solid ${BRAND.accent}; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
          <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: ${BRAND.gray};">
            Your Message
          </p>
          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: ${BRAND.dark}; font-style: italic;">
            "${data.message.length > 200 ? data.message.substring(0, 200) + '...' : data.message}"
          </p>
        </div>

        <!-- What to Expect -->
        <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: ${BRAND.dark};">
          What to expect:
        </p>

        <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; background-color: ${BRAND.accent}; color: #ffffff; font-size: 12px; font-weight: 600; line-height: 24px; text-align: center; border-radius: 50%; margin-right: 12px;">1</span>
            </td>
            <td style="padding: 8px 0; font-size: 14px; color: ${BRAND.gray}; line-height: 1.5;">
              Our product specialist will review your requirements
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; background-color: ${BRAND.accent}; color: #ffffff; font-size: 12px; font-weight: 600; line-height: 24px; text-align: center; border-radius: 50%; margin-right: 12px;">2</span>
            </td>
            <td style="padding: 8px 0; font-size: 14px; color: ${BRAND.gray}; line-height: 1.5;">
              You'll receive detailed product information and a customized quote
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; vertical-align: top;">
              <span style="display: inline-block; width: 24px; height: 24px; background-color: ${BRAND.accent}; color: #ffffff; font-size: 12px; font-weight: 600; line-height: 24px; text-align: center; border-radius: 50%; margin-right: 12px;">3</span>
            </td>
            <td style="padding: 8px 0; font-size: 14px; color: ${BRAND.gray}; line-height: 1.5;">
              Our team will be available to answer any technical questions
            </td>
          </tr>
        </table>

        <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: ${BRAND.gray};">
          We typically respond within <strong style="color: ${BRAND.dark};">24 hours</strong>. For urgent inquiries, please contact us directly.
        </p>

        <!-- Contact Info -->
        <div style="background-color: #fafafa; border-left: 3px solid ${BRAND.accent}; padding: 16px 20px; border-radius: 0 8px 8px 0;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: ${BRAND.gray};">
            <strong style="color: ${BRAND.dark};">Phone:</strong> +91 44-22771949
          </p>
          <p style="margin: 0; font-size: 13px; color: ${BRAND.gray};">
            <strong style="color: ${BRAND.dark};">Email:</strong> sales@raxgbc.co.in
          </p>
        </div>
      </td>
    </tr>

    <!-- Footer CTA -->
    <tr>
      <td style="padding: 0 40px 40px 40px; text-align: center;">
        <a href="${BRAND.website}/products" style="display: inline-block; padding: 12px 32px; background-color: ${BRAND.accent}; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 6px;">
          Browse More Products
        </a>
      </td>
    </tr>

    <!-- Brand Footer -->
    <tr>
      <td style="padding: 24px 40px; background-color: ${BRAND.dark}; text-align: center;">
        <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #ffffff;">
          ${BRAND.name}
        </p>
        <p style="margin: 0; font-size: 12px; color: #888888;">
          IoT | Automation | e-Surveillance | Blockchain & Web3
        </p>
      </td>
    </tr>
  `;

  return emailWrapper(content);
}

// ============================================
// EMAIL SUBJECTS
// ============================================
export const EMAIL_SUBJECTS = {
  contactAcknowledgement: "Thank you for contacting Rax Tech International",
  jobApplicationAcknowledgement: (jobTitle: string) =>
    `Application Received: ${jobTitle} - Rax Tech International`,
  productEnquiryAcknowledgement: (productName: string) =>
    `Product Enquiry: ${productName} - Rax Tech International`,
};
