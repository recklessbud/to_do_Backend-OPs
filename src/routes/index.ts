import{json,Request,Response
  ,Router} from "express";
import HttpError from "../Customs/CustomError.js";

const useRouter = Router()
useRouter.use(json());

interface properties{
    title : string;
    countdown: {
        hours: number;
        minutes: number;
        seconds: number;
    };
    isDone:boolean;  
}

let data:properties[] = [];

useRouter.post("/add",(req:Request<object,object,properties>,res:Response)=>{
    const { title,countdown } = req.body;
    data.push(req.body);
    console.log(data);
    res.send(`${title} has countdown  ${countdown.hours} hours : ${countdown.minutes} minutes :  ${countdown.seconds} seconds `);
});

useRouter.delete("/delete/:title",(req:Request,res:Response)=>{
    const { title } = req.params;
    data = data.filter(item => item.title !== title);;
    res.send(`Hello , I'm ${title}`);
});

useRouter.patch("/edit/:title", (req: Request, res: Response) => {
  const { title } = req.params;
  const { countdown } = req.body;

  const item = data.find(item => item.title === title);

  if (!item) {
    return res.status(404).send(`Item with title "${title}" not found.`);
  }

  if (!countdown || typeof countdown !== 'object') {
    return res.status(400).send("Invalid or missing 'countdown' in request body.");
  }

  if (countdown.hours !== undefined) {
    item.countdown.hours = countdown.hours;
  }

  if (countdown.minutes !== undefined) {
    item.countdown.minutes = countdown.minutes;
  }

  if (countdown.seconds !== undefined) {
    item.countdown.seconds = countdown.seconds;
  }

  res.send(`Item with title "${title}" partially updated.`);
});

useRouter.post("/done/:title",(req:Request,res:Response)=>{
  const { title } = req.params;
  const item = data.find(item => item.title === title);
  if (!item) {
    return res.status(404).send(`Item with title "${title}" not found.`);
  }
  item.isDone = true;
  res.send(`Item "${title}" marked as done.`);
});

useRouter.get("/search/:title",(req:Request,res:Response)=>{
  const { title } = req.params;
  const item = data.find(item => item.title === title);
  if (!item) {
    return res.status(404).send(`Item with title "${title}" not found.`);
  }
  res.status(200).send(item);
});
 
useRouter.get("/done", (req: Request, res: Response) => {
  const doneItems = data.filter(item => item.isDone);
  res.status(200).json(doneItems);
});

useRouter.get("/getAll", (req: Request, res: Response) => {
  res.status(200).json(data.filter(item => !item.isDone));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
useRouter.get('/error', (req, res) => {
  throw new HttpError('This is a custom error', 400);
});


export default useRouter;