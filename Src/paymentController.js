import { STORE_ID, STORE_PASSWORD } from "../Configs/ServerConfig.js";
import { ObjectId } from "mongodb";
import fetchParcelDetails from "../Utils/MongoDataFetchingHelper.js";
import SslCommerzPayment from "sslcommerz-lts/api/payment-controller.js";


const store_id = STORE_ID;
const store_passwd = STORE_PASSWORD;
const is_live = false;

export const paymentController = async (req, res) => {
    try {
        const tran_id = new ObjectId().toString();

        console.log(store_id, store_passwd, is_live);

        console.log("Transaction ID: ", tran_id);

        const parcelid = req.params.parcelid;

        console.log("Parcel ID: ", parcelid);

        const parcelDetails = await fetchParcelDetails(parcelid);

        console.log("Parcel Details in payment: ", parcelDetails);



        const data = {
                total_amount: parcelDetails.totalCharge,
                currency: 'BDT',
                tran_id: tran_id,
                success_url: `http://localhost:8050/api/success`,
                fail_url: `http://localhost:8050/api/failed`,
                cancel_url: `http://localhost:8050/api/cancel`,
                ipn_url: 'http://localhost:3030/ipn',
                shipping_method: 'Courier',
                product_name: 'Course',
                product_category: 'Education',
                product_profile: 'general',
                cus_name: parcelDetails.receiverName,
                cus_email: "hjhsbscj@gmail.com",
                cus_add1: parcelDetails.receiverAddress,
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: parcelDetails.receiverPhone,
                cus_fax: '01711111111',
                ship_name: "bsb",
                ship_add1: "bjkzb",
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: 1000,
                ship_country: 'Bangladesh',
            };
            console.log("Data: ", data);
            const sslcz = new SslCommerzPayment(store_id, store_passwd, is_live)
            sslcz.init(data).then(apiResponse => {
                // Redirect the user to payment gateway
                let GatewayPageURL = apiResponse.GatewayPageURL
                res.send({url: GatewayPageURL})
    
            
                console.log('Redirecting to: ', GatewayPageURL)
            });
    
    } catch (error) {
        console.log("Error in payment: ", error);
    }
};

export const paymentSuccessController = async (req, res) => {
    try {
        console.log("Payment Success Controller"); 
        
        res.redirect(`https://payment-system-for-infra-red.vercel.app/success`);


    } catch (error) {
        console.log("Error in paymentSuccessController: ", error);        
    }
};

export const paymentFailController = async (req, res) => {
    try {

        console.log("Payment failed, transaction deleted");
        res.redirect(`https://payment-system-for-infra-red.vercel.app/failed`);
    } catch (error) {
        console.log("Error in paymentFailController: ", error);
    }
};

export const paymentCancelController = async (req, res) => {
    try {
        console.log("Payment canceled, transaction deleted");
        res.redirect(`https://payment-system-for-infra-red.vercel.app/cancel`);
    } catch (error) {
        console.log("Error in paymentFailController: ", error);
    }
};

export const getParcelDetails = async (req, res) => {
    try {
        const parcelId = req.params.parcelid;
        const parcelDetails = await fetchParcelDetails(parcelId);

        return res.status(200).json({
            success: true,
            data: parcelDetails
        });
    } catch (error) {
        console.log("Error in getParcelDetails: ", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch parcel details"
        });
    }
};