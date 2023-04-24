import express from "express";
import { login } from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.post("/login", login);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: 'http://localhost:3000/home',
		failureRedirect: "/login/failed",
	})
);

router.get("/login/success", (req, res) => {
	if (req.user) {
		// console.log(req.user.displayName)
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});


export default router;