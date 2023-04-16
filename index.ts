import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { craeteFir, getallfir, login, myCompaines, setStatusSolve, signup } from "./helper";


const app: Application = express();
const port = 5000;

// Body parsing Middleware
app.use(express.json());
app.options('*', cors())
// CORS middleware
const allowCrossDomain = (req:Request, res:Response, next:NextFunction) => {
    res.header(`Access-Control-Allow-Origin`, `example.com`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
  };
  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  app.use(function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    // if(oneof) {
    //     res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    // }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
  //...
  
//   app.configure(() => {
//     app.use(express.bodyParser());
//     app.use(express.cookieParser());
//     app.use(express.session({ secret: `cool beans` }));
//     app.use(express.methodOverride());
    // CORS middleware
    app.use(allowCrossDomain);
    // app.use(app.router);
    app.options('*', cors());
    app.use(express.static(`public`));
//   });
// Enable CORS for a specific origin
// const corsOptions = {
//     origin: 'http://localhost:3001',
//   };
//   app.use(cors(corsOptions));
  
//   // Enable CORS for specific HTTP methods
//   const corsOptions1 = {
//     methods: ['GET', 'POST'],
//   };
//   app.use(cors(corsOptions1));
  
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.post("/login", login);
app.post("/signup", signup);
app.post("/getallfir", getallfir);
app.post("/myCompaines", myCompaines);
app.post("/craeteFir", craeteFir);
app.post("/setStatusSolve", setStatusSolve);
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("hello from backend");
})



try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
