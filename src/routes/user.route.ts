import { Router } from "express";

const router = Router();

router.route("/signup").get((req,res)=>{
    res.send("testing..")
})

export default router;