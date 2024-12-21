exports.billingThankYouTemplate = (billing) => {
    const formattedArrivalDate = new Date(billing.arrivalDate).toLocaleDateString();
    const formattedDepartureDate = new Date(billing.departureDate).toLocaleDateString();

    return {
        subject: 'Thank You for Choosing Tripster!',
        text: `Dear ${billing.name},\n\nThank you for booking your tour: ${billing.tourTitle}.\nTotal cost: $${billing.totalCost}\n\nWe look forward to serving you!\n\nBest regards,\nTripster Booking Tour Team`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #F44336; color: #fff; padding: 20px; text-align: center;">
                    <h1 style="margin: 0;">Thank You for Your Booking!</h1>
                </div>
                <div style="padding: 20px;">
                    <p>Dear <strong>${billing.name}</strong>,</p>
                    <p>Thank you for choosing <strong>Tripster</strong> for your next adventure. Below are your booking details:</p>
                    <hr>
                    <p><strong>Email:</strong> ${billing.email}</p>
                    <p><strong>Phone:</strong> ${billing.phone}</p>
                    <p><strong>Tour Title:</strong> ${billing.tourTitle}</p>
                    <p><strong>Tour Place:</strong> ${billing.tourPlace}</p>
                    <p><strong>Arrival Date:</strong> ${formattedArrivalDate}</p>
                    <p><strong>Departure Date:</strong> ${formattedDepartureDate}</p>
                    <p><strong>Children:</strong> ${billing.children}</p>
                    <p><strong>Adults:</strong> ${billing.adults}</p>
                    <p><strong>Total Cost:</strong> $${billing.totalCost}</p>
                    <hr>
                    <p>We are excited to host you and ensure your experience is unforgettable.</p>
                    <p>For any inquiries, feel free to contact us.</p>
                </div>
                <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 0.9em;">
                    <p>Best regards,</p>
                    <p><strong>Tripster Booking Tours Team</strong></p>
                    <p style="margin: 0;">phamquangvinh@tripster.com | 0901996064</p>
                </div>
            </div>
        `,
    };
};

exports.forgotPasswordTemplate = (resetUrl, userName) => {
    return {
        subject: 'Reset Your Password - Tripster',
        text: `Hi ${userName},\n\nWe received a request to reset your password.\nPlease click the link below to reset it:\n${resetUrl}\n\nIf you didn’t request a password reset, please ignore this email.\n\nBest regards,\nThe Tripster Team`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p>Hi <strong>${userName}</strong>,</p>
                <p>We received a request to reset your password. Click the button below to reset it:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${resetUrl}" style="background-color: #F44336; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                <p>If you didn’t request a password reset, please ignore this email. Your password will remain safe.</p>
                <p>This link will expire in 10 minutes.</p>
                <hr style="margin: 20px 0;">
                <p style="font-size: 12px; color: #666;">If you're having trouble clicking the button, copy and paste the following link into your browser:</p>
                <p style="word-break: break-all; font-size: 12px; color: #F44336;">${resetUrl}</p>
                <p style="text-align: center; margin-top: 30px; color: #888;">Best regards,<br><strong>Tripster Team</strong></p>
            </div>
        `,
    };
};

