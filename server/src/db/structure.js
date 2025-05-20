import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    isNewUser: {
        type: Boolean,
        default: true
    },
    
    sessionKey: {
        type: String,
        required: false,
        expires: 86400
    },
    sessionKeyLastUpdated: {
        type: Date,
        default: Date.now
    },
    
    wallet: {
        address: {
            type: String,
            required: false
        },
        chain: {
            type: String,
            required: false,
            enum: ['ethereum', 'polygon', 'arbitrum']
        },
        balance: {
            type: Number,
            default: 0
        }
    },
    escrow: {
        contractAddress: {
            type: String,
            required: false
        },
        balance: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['active', 'locked', 'released'],
            default: 'active'
        }
    },
    
    fiatOnramp: {
        provider: {
            type: String,
            enum: ['wert', 'onramper'],
            required: false
        },
        lastTransaction: {
            type: Date,
            required: false
        },
        totalDeposited: {
            type: Number,
            default: 0
        }
    },
    
    metadata: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        country: String,
        kycStatus: {
            type: String,
            enum: ['pending', 'verified', 'rejected'],
            default: 'pending'
        }
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

userSchema.index({ 'wallet.address': 1 });
userSchema.index({ 'escrow.contractAddress': 1 });
userSchema.index({ 'metadata.email': 1 });

userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const User = mongoose.model('User', userSchema);

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'transfer', 'escrow_lock', 'escrow_release'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    fromAddress: String,
    toAddress: String,
    transactionHash: String,
    metadata: {
        description: String,
        category: String,
        tags: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const walletOperationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    operationType: {
        type: String,
        enum: ['wallet_creation', 'escrow_creation', 'pin_update', 'uuid_update'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    metadata: {
        oldValue: String,
        newValue: String,
        reason: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ transactionHash: 1 }, { unique: true, sparse: true });
walletOperationSchema.index({ userId: 1, createdAt: -1 });

const Transaction = mongoose.model('Transaction', transactionSchema);
const WalletOperation = mongoose.model('WalletOperation', walletOperationSchema);

export { User, Transaction, WalletOperation };
