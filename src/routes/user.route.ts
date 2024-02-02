import { Router } from "express";

const router = Router();

router.route("/signup").get((req,res)=>{
    return res.json({
        "test" : "Hi Yashwanth B M, I THINK THIS IS ENOUGH FOR TODAY"
    })
})

export default router;