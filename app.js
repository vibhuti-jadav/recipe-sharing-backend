// import dotenv from "dotenv"
// import express from "express";
// import userRouter from "./router/userRouter.js"
// import recipeRouter from "./router/recipeRouter.js"
// import httpError from "./middleware/errorHandling.js";
// import connectDb from "./config/db.js";
// import path from "path"
// import {fileURLToPath} from "url";


// dotenv.config({path:"./env/.env"})

// const app = express()
// const port = process.env.PORT || 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(express.json())

// app.set("view engine", "ejs");
// app.set("views", "./views");

// app.use("/user",userRouter)
// app.use("/recipe",recipeRouter)

// app.get("/",(req,res)=>{
//     res.redirect("/recipe")
// })

// app.use((req,res,next)=>{
//     next(new httpError("router can't find ",404))
// })

// app.use((error,req,res,next)=>{
//     if(req.headersSent){
//         return next(error)
//     }

//     res.status(error.statusCode || 500).json({message: error.message || "somthing went wrong please try again"})
// })

// const startServer = async()=>{
//     try {
        
//         const connect = await connectDb()

//         if(!connect){
//             return console.log("db failed")
//         }

//         console.log("db connected")

//          app.listen(port,()=>{
//           console.log("server running on port",port)
//         })

//     } catch (error) {
//         console.log(error.message)
//         process.exit(1)
//     }
// }

// startServer()



import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import userRouter from "./router/userRouter.js";
import recipeRouter from "./router/recipeRouter.js";
import httpError from "./middleware/errorHandling.js";
import connectDb from "./config/db.js";

dotenv.config({ path: "./env/.env" });

const app = express();
const port = process.env.PORT || 3000;

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Make user available in all EJS templates
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use("/user", userRouter);      // login/register
app.use("/recipe", recipeRouter);  // recipes CRUD

// Home → redirect to recipe list
app.get("/", (req, res) => {
  res.redirect("/recipe");
});

// 404 handler
app.use((req, res, next) => {
  next(new httpError("Route not found", 404));
});

// Global error handler
app.use((error, req, res, next) => {
  if (req.headersSent) return next(error);

  res.status(error.statusCode || 500);
  // Render error page
  res.render("error", { message: error.message || "Something went wrong" });
});

// Start server
const startServer = async () => {
  try {
    await connectDb();
    console.log("✅ Database connected");

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();






// import dotenv from "dotenv";

// dotenv.config({ path: "./env/.env" });

// console.log("JWT_SECRET =", process.env.JWT_SECRET);


// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";

// import recipeRoutes from "./router/recipeRouter.js"
// import userRouter from "./router/userRouter.js"
// import connectDb from "./config/db.js";
// import auth from "./middleware/auth.js";
// import cookieParser from "cookie-parser";

// const app = express();
// const port = process.env.PORT || 3000;
// app.use(cookieParser());
// // File path setup (ESM support)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middlewares
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

// // EJS setup
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Make user available in all EJS templates
// app.use((req, res, next) => {
//   res.locals.user = req.user || null;
//   next();
// });

// // Routes
// app.use("/", userRouter);      // login, register
// app.use("/recipes", auth, recipeRoutes);

// // Redirect home → recipes list
// app.get("/", (req, res) => res.redirect("/recipes"));

// // Serve login/register pages
// app.get("/login", (req, res) => {
//   res.render("auth/login"); // include folder name
// });

// app.get("/register", (req, res) => {
//   res.render("auth/register"); // include folder name
// });



// // Start server
// const startServer = async () => {
//   try {
//     const connect = await connectDb();

//     if (!connect) {
//       throw new Error("Database connection failed");
//     }

//     console.log("✅ Database connected");

//     app.listen(port, () => {
//       console.log(`🚀 Server running at http://localhost:${port}`);
//     });
//   } catch (error) {
//     console.error("❌ Error:", error.message);
//     process.exit(1);
//   }
// };

// startServer();


