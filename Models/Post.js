const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 50
        },
    },
    {timestamps: true}
)
module.exports = mongoose.model("Post", PostSchema);