# DealFinder – Real-Time Price Comparison Website

DealFinder is a real-time product price comparison platform that helps users find the best deals across multiple online shopping websites. Whether you're looking for electronics, fashion, home essentials, or more — DealFinder fetches the latest prices and presents the most affordable and trusted buying options instantly.

Users can enter a product name (e.g., "iPhone 14") into the search bar, and DealFinder retrieves real-time data from e-commerce platforms like Amazon, Walmart, and Flipkart. The backend scrapes product titles, prices, ratings, and product links from each website, compares the results, and ranks them based on price or customer rating. This helps users make smart purchasing decisions and avoid spending time browsing multiple websites manually.

## 🏗️ Architecture

DealFinder is built using a modern web stack:

- **Frontend**: React and TailwindCSS offer a sleek, responsive user experience
- **Backend**: FastAPI powers the real-time API that triggers scrapers
- **Scrapers**: Built with Playwright and BeautifulSoup to handle both static and dynamic content
- **Database**: MongoDB stores and caches previous searches for better performance

The system uses a short-term caching mechanism to avoid frequent scraping of the same product, making it efficient and scalable. Search results are stored temporarily in MongoDB and served instantly if the user repeats a search within a set timeframe.

## 🔧 Features

- ✅ Real-time product search and comparison
- ✅ Multi-store support (Amazon, Walmart, Flipkart)
- ✅ Smart sorting by price and rating
- ✅ Direct purchase links to original websites
- ✅ Clean, responsive design
- ✅ Search result caching for better performance
- ✅ Product image display
- ✅ Price history tracking

## 🚀 Roadmap

- [ ] Add support for eBay and BestBuy
- [ ] Implement filters (price range, brand, in-stock)
- [ ] Deploy a hosted version with user account features
- [ ] Add historical price tracking and alert system
- [ ] Mobile app development
- [ ] Price drop notifications

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string and other settings
   ```

5. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Database Setup

1. Install and start MongoDB
2. Create a database named `dealfinder`
3. Update the connection string in your `.env` file

## 📁 Project Structure

```
DealFinder/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── scrapers/
│   │   └── services/
│   ├── requirements.txt
│   └── main.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🔍 API Endpoints

- `GET /api/search/{query}` - Search for products
- `GET /api/products/{product_id}` - Get product details
- `GET /api/stores` - Get supported stores
- `POST /api/cache/clear` - Clear search cache

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This application is for educational purposes. Please respect the terms of service of the websites being scraped and implement appropriate rate limiting and user agents.
