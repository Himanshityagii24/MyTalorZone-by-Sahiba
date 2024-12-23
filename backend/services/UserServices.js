const User = require('../model/User');
const bcrypt = require('bcrypt');

const signupUser = async (userData) => {
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            return { success: false, message: 'Account already exists with this email.' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create a new user
        const newUser = new User({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            phoneNumber: userData.phoneNumber,
        });

        await newUser.save();
        return { success: true, message: 'User registered successfully.' };
    } catch (error) {
        return { success: false, message: 'An error occurred during signup. Please try again later.' };
    }
};
const loginUser = async (loginData) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: loginData.email });
        if (!user) {
            return { success: false, message: 'Invalid email or password.' };
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: 'Invalid email or password.' };
        }

        // Successful login
        return { success: true, message: 'Login successful.', user };
    } catch (error) {
        return { success: false, message: 'An error occurred during login. Please try again later.' };
    }
};


module.exports = { signupUser,loginUser };
