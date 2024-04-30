const { deleteCar } = require('./cars');
const Booking = require('../models/Bookings');
const CarSchema = require('../models/Car')

// Mock dependencies
jest.mock('../models/Car', () => ({
    findById: jest.fn(),
}));

describe('deleteCar function', () => {
    it('should delete a car when it has not been booked by the user', async () => {
        const req = {
            params: { id: '662ff09ef9d0aad889bdfb8f' }, //testjest1 car
            user: { id: '662f74ab8f787a82d38e9a0b', role: 'provider' } // User making the request
        };
        const res = {
            status: jest.fn().mockReturnThis(), // Mock the status method
            json: jest.fn() // Mock the json method
        };
    
        // Mock Car.findById to resolve with a mock car
        const mockCar = { provider: '662f74ab8f787a82d38e9a0b', deleteOne: jest.fn() };
        require('../models/Car').findById.mockResolvedValue(mockCar);
    
        // Call deleteCar function
        await deleteCar(req, res);
    
        // Expectations
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Car deleted successfully' });
    });

    it('should not delete a car when it has been booked by the user', async () => {
      const req = {
        params: { id: '663099460f535115488837fa' }, //testjest2
        user: { id: '662f74ab8f787a82d38e9a0b', role: 'provider' } // User making the request
      };
      const res = {
        status: jest.fn().mockReturnThis(), // Mock the status method
        json: jest.fn() // Mock the json method
      };
  
      // Mock Car.findById to resolve with a mock car
      const mockCar = { provider: '662f74ab8f787a82d38e9a0b', deleteOne: jest.fn() };
      require('../models/Car').findById.mockResolvedValue(mockCar);
  
      // Mock Booking.find to resolve with an empty array, indicating the car is not booked
      const mockBooking = [];
      jest.spyOn(Booking, 'find').mockResolvedValue(mockBooking);
  
      // Call deleteCar function
      await deleteCar(req, res);
  
      // Expectations
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: `This car is still booking`
      });
  
      // Add some debugging information
      console.log('res.status was called with:', res.status.mock.calls[0][0]);
      console.log('res.json was called with:', res.json.mock.calls[0][0]);
    });
  
  
});