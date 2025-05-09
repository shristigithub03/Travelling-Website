import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('plan');
  const [formData, setFormData] = useState({
    destination: '',
    duration: 7,
    travelWith: 'Couple',
    startDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    budget: 3000
  });

  const [tripDetails, setTripDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);

  // Mock API call to fetch popular destinations
  useEffect(() => {
    const mockDestinations = [
      { name: 'Tokyo', country: 'Japan', image: 'tokyo.jpg', rating: 4.8 },
      { name: 'Paris', country: 'France', image: 'paris.jpg', rating: 4.7 },
      { name: 'Bali', country: 'Indonesia', image: 'bali.jpg', rating: 4.9 },
      { name: 'New York', country: 'USA', image: 'ny.jpg', rating: 4.6 },
    ];
    setDestinations(mockDestinations);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'budget' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate realistic trip details
    const generatedTrip = {
      destination: formData.destination || 'Tokyo',
      startDate: new Date(formData.startDate).toLocaleDateString('en-GB'),
      endDate: new Date(new Date(formData.startDate).setDate(new Date(formData.startDate).getDate() + formData.duration)).toLocaleDateString('en-GB'),
      duration: `${formData.duration} Days`,
      travelers: formData.travelWith === 'Solo' ? '1 Traveler' : 
                formData.travelWith === 'Couple' ? '2 Travelers' : 
                formData.travelWith === 'Family' ? '4 Travelers (2 Adults + 2 Kids)' : 'Group',
      flight: generateFlightDetails(formData.destination),
      accommodation: generateAccommodation(formData.budget),
      activities: generateActivities(formData.destination),
      budget: `$${formData.budget.toLocaleString()}`,
      weather: generateWeatherForecast()
    };
    
    setTripDetails(generatedTrip);
    setCurrentPage('trip');
    setIsLoading(false);
  };

  // Helper functions for trip generation
  const generateFlightDetails = (destination) => {
    const flights = {
      'Tokyo': {
        date: new Date(Date.now() + 86400000 * 6).toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'}),
        departure: { code: 'DEL', name: 'Delhi, India' },
        arrival: { code: 'NRT', name: 'Narita, Tokyo' },
        airline: 'Japan Airlines',
        flightNumber: 'JL 456'
      },
      'Paris': {
        date: new Date(Date.now() + 86400000 * 6).toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'}),
        departure: { code: 'DEL', name: 'Delhi, India' },
        arrival: { code: 'CDG', name: 'Charles de Gaulle, Paris' },
        airline: 'Air France',
        flightNumber: 'AF 123'
      },
      'Bali': {
        date: new Date(Date.now() + 86400000 * 6).toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'}),
        departure: { code: 'DEL', name: 'Delhi, India' },
        arrival: { code: 'DPS', name: 'Denpasar, Bali' },
        airline: 'Garuda Indonesia',
        flightNumber: 'GA 789'
      },
      'New York': {
        date: new Date(Date.now() + 86400000 * 6).toLocaleString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'}),
        departure: { code: 'DEL', name: 'Delhi, India' },
        arrival: { code: 'JFK', name: 'John F. Kennedy, New York' },
        airline: 'Delta Airlines',
        flightNumber: 'DL 345'
      }
    };
    
    return flights[destination] || flights['Tokyo'];
  };

  const generateAccommodation = (budget) => {
    const tier = budget < 2000 ? 'Standard' : budget < 4000 ? 'Premium' : 'Luxury';
    const options = {
      'Standard': [
        { name: '3-Star Hotel', price: '$80/night', rating: 3.5 },
        { name: 'Boutique Guesthouse', price: '$60/night', rating: 4.0 }
      ],
      'Premium': [
        { name: '4-Star Resort', price: '$150/night', rating: 4.5 },
        { name: 'Business Hotel', price: '$120/night', rating: 4.2 }
      ],
      'Luxury': [
        { name: '5-Star Hotel', price: '$300/night', rating: 4.8 },
        { name: 'Private Villa', price: '$400/night', rating: 4.9 }
      ]
    };
    return options[tier];
  };

  const generateActivities = (destination) => {
    const activities = {
      'Tokyo': [
        { name: 'Shibuya Crossing Visit', duration: '2 hours', price: 'Free' },
        { name: 'Tsukiji Fish Market Tour', duration: '3 hours', price: '$50' },
        { name: 'Sumo Wrestling Experience', duration: '4 hours', price: '$120' },
        { name: 'Traditional Tea Ceremony', duration: '1.5 hours', price: '$35' }
      ],
      'Paris': [
        { name: 'Eiffel Tower Visit', duration: '2 hours', price: '$25' },
        { name: 'Louvre Museum Tour', duration: '3 hours', price: '$40' },
        { name: 'Seine River Cruise', duration: '1.5 hours', price: '$35' },
        { name: 'Montmartre Walking Tour', duration: '2.5 hours', price: '$30' }
      ],
      'Bali': [
        { name: 'Ubud Monkey Forest', duration: '2 hours', price: '$10' },
        { name: 'Tegallalang Rice Terraces', duration: '3 hours', price: 'Free' },
        { name: 'Waterfall Trekking', duration: '4 hours', price: '$45' },
        { name: 'Balinese Cooking Class', duration: '3 hours', price: '$65' }
      ],
      'New York': [
        { name: 'Statue of Liberty Tour', duration: '3 hours', price: '$35' },
        { name: 'Central Park Bike Ride', duration: '2 hours', price: '$25' },
        { name: 'Broadway Show', duration: '2.5 hours', price: '$120+' },
        { name: 'Metropolitan Museum Visit', duration: '3 hours', price: '$30' }
      ]
    };
    return activities[destination] || activities['Tokyo'];
  };

  const generateWeatherForecast = () => {
    return [
      { day: 'Mon', temp: '24°C', icon: '☀️', condition: 'Sunny' },
      { day: 'Tue', temp: '22°C', icon: '⛅', condition: 'Partly Cloudy' },
      { day: 'Wed', temp: '20°C', icon: '🌧️', condition: 'Light Rain' },
      { day: 'Thu', temp: '23°C', icon: '☀️', condition: 'Sunny' },
      { day: 'Fri', temp: '25°C', icon: '☀️', condition: 'Sunny' }
    ];
  };

  const toggleActivitySelection = (activity) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity) 
        : [...prev, activity]
    );
  };

  return (
    <div className="app">
      {currentPage === 'plan' ? (
        <TripPlanForm 
          formData={formData}
          destinations={destinations}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      ) : (
        <TripDetails 
          details={tripDetails}
          selectedActivities={selectedActivities}
          onToggleActivity={toggleActivitySelection}
          onBack={() => setCurrentPage('plan')}
        />
      )}
    </div>
  );
}

const TripPlanForm = ({ formData, destinations, onInputChange, onSubmit, isLoading }) => {
  return (
    <div className="trip-plan">
      <div className="hero-section">
        <h1>Discover Your Perfect Getaway</h1>
        <p>Customize every detail of your dream vacation</p>
      </div>
      
      <form onSubmit={onSubmit}>
        <div className="form-card">
          <h2>✈️ Trip Preferences</h2>
          
          <div className="form-group">
            <label>Destination</label>
            <div className="destination-selector">
              <input
                type="text"
                name="destination"
                placeholder="Where to?"
                value={formData.destination}
                onChange={onInputChange}
                list="destinations"
              />
              <datalist id="destinations">
                {destinations.map(dest => (
                  <option key={dest.name} value={dest.name} />
                ))}
              </datalist>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={onInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label>Duration (days)</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={onInputChange}
              >
                {[3, 5, 7, 10, 14].map(days => (
                  <option key={days} value={days}>{days}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Traveling With</label>
            <div className="travel-with-options">
              {['Solo', 'Couple', 'Family', 'Friends'].map(option => (
                <label key={option} className={formData.travelWith === option ? 'active' : ''}>
                  <input
                    type="radio"
                    name="travelWith"
                    checked={formData.travelWith === option}
                    onChange={() => onInputChange({ target: { name: 'travelWith', value: option }})}
                    hidden
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label>Budget Estimate</label>
            <div className="budget-slider">
              <input
                type="range"
                name="budget"
                min="1000"
                max="10000"
                step="500"
                value={formData.budget}
                onChange={onInputChange}
              />
              <div className="budget-value">${formData.budget.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <div className="popular-destinations">
          <h3>✨ Popular Destinations</h3>
          <div className="destination-grid">
            {destinations.map(dest => (
              <div 
                key={dest.name} 
                className="destination-card"
                onClick={() => onInputChange({ target: { name: 'destination', value: dest.name }})}
              >
                <div className="destination-image" style={{ backgroundImage: `url(${dest.image})` }}>
                  <div className="rating">⭐ {dest.rating}</div>
                </div>
                <h4>{dest.name}</h4>
                <p>{dest.country}</p>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" className="cta-button" disabled={isLoading}>
          {isLoading ? 'Creating Your Itinerary...' : 'Plan My Trip'}
        </button>
      </form>
    </div>
  );
};

const TripDetails = ({ details, selectedActivities, onToggleActivity, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookNow = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
    }, 2000);
  };

  return (
    <div className="trip-details">
      <div className="trip-header">
        <button onClick={onBack} className="back-button">
          &larr; Back to Planning
        </button>
        <h1>Your {details.destination} Adventure</h1>
        <p>{details.startDate} - {details.endDate} • {details.duration}</p>
      </div>
      
      <div className="trip-nav">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'itinerary' ? 'active' : ''}
          onClick={() => setActiveTab('itinerary')}
        >
          Itinerary
        </button>
        <button 
          className={activeTab === 'documents' ? 'active' : ''}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <div className="overview-tab">
          <div className="trip-highlights">
            <div className="highlight-card">
              <div className="icon">✈️</div>
              <h3>Flight Details</h3>
              <p>{details.flight.date}</p>
              <div className="flight-route">
                <div>
                  <strong>{details.flight.departure.code}</strong>
                  <p>{details.flight.departure.name}</p>
                </div>
                <div className="flight-arrow">→</div>
                <div>
                  <strong>{details.flight.arrival.code}</strong>
                  <p>{details.flight.arrival.name}</p>
                </div>
              </div>
              <p className="flight-info">{details.flight.airline} • {details.flight.flightNumber}</p>
            </div>
            
            <div className="highlight-card">
              <div className="icon">🏨</div>
              <h3>Accommodation Options</h3>
              {details.accommodation.map((hotel, index) => (
                <div key={index} className="hotel-option">
                  <h4>{hotel.name}</h4>
                  <p>{hotel.price} • {'⭐'.repeat(Math.floor(hotel.rating))}</p>
                </div>
              ))}
            </div>
            
            <div className="highlight-card weather-card">
              <div className="icon">🌤️</div>
              <h3>Weather Forecast</h3>
              <div className="weather-grid">
                {details.weather.map((day, index) => (
                  <div key={index} className="weather-day">
                    <p>{day.day}</p>
                    <p className="weather-icon">{day.icon}</p>
                    <p>{day.temp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="trip-summary">
            <h2>Trip Summary</h2>
            <div className="summary-grid">
              <div>
                <p className="summary-label">Travelers</p>
                <p className="summary-value">{details.travelers}</p>
              </div>
              <div>
                <p className="summary-label">Budget</p>
                <p className="summary-value">{details.budget}</p>
              </div>
              <div>
                <p className="summary-label">Selected Activities</p>
                <p className="summary-value">{selectedActivities.length}</p>
              </div>
            </div>
            
            {bookingSuccess ? (
              <div className="booking-success">
                <p>🎉 Your trip has been booked successfully!</p>
                <p>Confirmation has been sent to your email.</p>
              </div>
            ) : (
              <button 
                onClick={handleBookNow} 
                className="book-now-button"
                disabled={isBooking}
              >
                {isBooking ? 'Processing...' : 'Book Now'}
              </button>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'itinerary' && (
        <div className="itinerary-tab">
          <h2>Your Itinerary</h2>
          
          <div className="day-planner">
            <h3>Available Activities</h3>
            <div className="activities-grid">
              {details.activities.map((activity, index) => (
                <div 
                  key={index} 
                  className={`activity-card ${selectedActivities.includes(activity.name) ? 'selected' : ''}`}
                  onClick={() => onToggleActivity(activity.name)}
                >
                  <h4>{activity.name}</h4>
                  <p>⏱️ {activity.duration}</p>
                  <p>💵 {activity.price}</p>
                  <button className="select-activity">
                    {selectedActivities.includes(activity.name) ? 'Selected ✓' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="selected-activities">
            <h3>Your Selected Activities ({selectedActivities.length})</h3>
            {selectedActivities.length > 0 ? (
              <ul>
                {selectedActivities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No activities selected yet</p>
            )}
          </div>
        </div>
      )}
      
      {activeTab === 'documents' && (
        <div className="documents-tab">
          <h2>Travel Documents</h2>
          <div className="documents-list">
            <div className="document-card">
              <div className="icon">📄</div>
              <div>
                <h3>Flight Itinerary</h3>
                <p>PDF • 245 KB</p>
              </div>
              <button>Download</button>
            </div>
            <div className="document-card">
              <div className="icon">🏨</div>
              <div>
                <h3>Hotel Vouchers</h3>
                <p>PDF • 180 KB</p>
              </div>
              <button>Download</button>
            </div>
            <div className="document-card">
              <div className="icon">ℹ️</div>
              <div>
                <h3>Destination Guide</h3>
                <p>PDF • 1.2 MB</p>
              </div>
              <button>Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;