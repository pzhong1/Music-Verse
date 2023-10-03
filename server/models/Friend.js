const friendSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        createdAt: {
            type:Date,
            default: true,
            get: (timestamp) => dateFormat(timestamp),
        },
        userId: [
            {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
]
});
