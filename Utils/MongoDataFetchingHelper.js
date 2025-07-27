import { MongoClient, ObjectId } from 'mongodb';
import { MONGO_URI } from '../Configs/ServerConfig.js';

const client = new MongoClient(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

async function fetchParcelDetails(parcelId) {
    try {
        await client.connect();

        const database = client.db('MainDB');
        const parcelsCollection = database.collection('Parcels');

        const objectId = new ObjectId(parcelId || "687555d74b0d1d4bb6c4afca");

        const parcel = await parcelsCollection.findOne({ _id: objectId });

        if (!parcel) {
            console.log('Parcel not found');
            return null;
        }

        console.log('Parcel Details:', parcel);

        return parcel;
    } catch (error) {
        console.error('Error fetching parcel details:', error);
        throw error;
    } finally {
        await client.close();
    }
}

export default fetchParcelDetails;