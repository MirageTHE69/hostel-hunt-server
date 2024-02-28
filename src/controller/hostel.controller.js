// hostelController.js

import Hostel from '../models/hostel.model.js'; // Update the path as needed
import { createOne, getAll, getOne, updateOne, deleteOne } from '../utils/handlerFactory.js';
import catchAsync from '../utils/catchAsync.js';

export const createHostel = createOne(Hostel);
export const getAllHostels = getAll(Hostel);
export const getHostel = getOne(Hostel);
export const updateHostel = updateOne(Hostel);
export const deleteHostel = deleteOne(Hostel);

export const getNearbyHostels = catchAsync(async (req, res, next) => {
    const { lat, lng, maxDistance } = req.query;
    console.log(`Received request for nearby hostels with lat: ${lat}, lng: ${lng}, maxDistance: ${maxDistance}`);

    if (!lat || !lng) {
        console.log('Latitude or longitude not provided');
        return next(new AppError('Please provide latitude and longitude!', 400));
    }

    const maxDistanceValue = maxDistance || 10000; // Default to 10km
    console.log(`Querying hostels within ${maxDistanceValue} meters`);

    const hostels = await Hostel.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(lng), parseFloat(lat)]
                },
                distanceField: 'distance',
                maxDistance: maxDistanceValue,
                spherical: true
            }
        }
    ]);

    

    console.log(`Found ${hostels.length} hostels`);
    res.status(200).json({
        status: 'success',
        results: hostels.length,
        data: {
            hostels
        }
    });
});


export const getHostelsByCity = catchAsync(async (req, res, next) => {
    const { city } = req.query;

    if (!city) {
        return next(new AppError('Please provide a city name!', 400));
    }

    const hostels = await Hostel.find({ city });

    res.status(200).json({
        status: 'success',
        results: hostels.length,
        data: {
            hostels
        }
    });
});