const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require('path')
const cors = require('cors')

//env
env.config();

//Routes
const authRoutes = require("./routes/admin/auth");
const userAuthRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

//Mongo connection
mongoose.connect("mongodb://localhost:27017/ecom", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Database connect success`);
}).catch((err) => {
    console.log(err);
})

app.use(cors({
    origin: '*',
}));

app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')))

app.use("/api", authRoutes);
app.use("/api", userAuthRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
