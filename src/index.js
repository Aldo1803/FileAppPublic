const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const route = require("./Routes/index.js");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));
app.use(express.static("uploads"));

app.use("/api", route);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.DEV_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connection Succeeded.");

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Express app running on port ${process.env.PORT || 3000}`);
        });
    } catch (err) {
        console.error("Error in DB connection:", err);
        process.exit(1);  // Exit with a failure mode
    }
};

startServer();
