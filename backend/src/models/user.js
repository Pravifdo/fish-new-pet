import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    shopName: {
        type: String,
        required: false
    },
    userType: {
        type: String,
        enum: ['customer', 'business'],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

// Export the User model
export default User;