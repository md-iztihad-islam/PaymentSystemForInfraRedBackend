import express from 'express';
import { getParcelDetails, paymentCancelController, paymentController, paymentFailController, paymentSuccessController } from '../Src/paymentController.js';

const router = express.Router();

router.post("/payment/:parcelid", paymentController);
router.post("/success", paymentSuccessController);
router.post("/failed", paymentFailController);
router.post("/cancel", paymentCancelController);
router.get("/parcel/:parcelid", getParcelDetails);

export default router;