const Seller = require('../model/Seller');
const bcrypt = require('bcrypt');


const loginSeller = async (loginData) => {
    try {
        // Find the seller by email
        const seller = await Seller.findOne({ email: loginData.email });
        if (!seller) {
            return { success: false, message: 'Invalid email or password.' };
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(loginData.password, seller.password);
        if (!isPasswordValid) {
            return { success: false, message: 'Invalid email or password.' };
        }

        // Successful login
        return { success: true, message: 'Login successful.', seller };
    } catch (error) {
        return { success: false, message: 'An error occurred during login. Please try again later.' };
    }
};

const signupSeller = async (sellerData) => {
    try {
        // Check if email already exists
        const existingSeller = await Seller.findOne({ email: sellerData.email });
        if (existingSeller) {
            return { success: false, message: 'Account already exists with this email.' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(sellerData.password, 10);

        // Create a new seller
        const newSeller = new Seller({
            name: sellerData.name,
            email: sellerData.email,
            password: hashedPassword,
            phoneNumber: sellerData.phoneNumber,
            businessName: sellerData.businessName,
            businessAddress: sellerData.businessAddress,
            businessType: sellerData.businessType,
        });

        await newSeller.save();
        return { success: true, message: 'Seller registered successfully.' };
    } catch (error) {
        return { success: false, message: 'An error occurred during signup. Please try again later.' };
    }
};

module.exports = { signupSeller, loginSeller  };
