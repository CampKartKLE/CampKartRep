// utils/otpStorage.js

const otpStore = new Map();

module.exports = {
    createOTP(email, otp, tempUserData, expiryMinutes = 10) {
        otpStore.set(email, {
            otp,
            tempUserData,
            attempts: 0,
            expiresAt: Date.now() + expiryMinutes * 60 * 1000
        });
    },

    verifyOTP(email, enteredOtp) {
        const record = otpStore.get(email);

        if (!record) return { success: false, message: "No OTP found" };

        if (Date.now() > record.expiresAt) {
            otpStore.delete(email);
            return { success: false, message: "OTP expired" };
        }

        if (record.attempts >= 5) {
            otpStore.delete(email);
            return { success: false, message: "Too many attempts" };
        }

        record.attempts++;

        if (record.otp !== enteredOtp) {
            return { success: false, message: "Invalid OTP", attemptsLeft: 5 - record.attempts };
        }

        // OTP correct → clean up
        otpStore.delete(email);
        return { success: true, tempUserData: record.tempUserData };
    }
};
