import mongoose from "mongoose";
import dotenv from "dotenv";
import Startup from "./models/startup.js";

dotenv.config();

const demoData = [
  {
    name: "Flipkart",
    state: "Karnataka",
    sector: "E-commerce",
    funding: 12500000000, // $1.25B USD
    companytype: "Private Limited",
    registrationDate: new Date("2007-10-28"),
    turnover: 42000000000, // $4.2B USD
    rating: 4.5,
    description: "India's largest e-commerce marketplace",
    founder: "Sachin Bansal & Binny Bansal",
    website: "https://www.flipkart.com",
    email: "support@flipkart.com",
    phoneNumber: "+91-1800-208-9898",
    imageUrl: "https://via.placeholder.com/400x200/2874f0/ffffff?text=Flipkart"
  },
  {
    name: "Paytm",
    state: "Delhi",
    sector: "Fintech",
    funding: 3200000000, // $320M USD
    companytype: "Public Limited",
    registrationDate: new Date("2010-08-23"),
    turnover: 2500000000, // $250M USD
    rating: 4.2,
    description: "Digital payments and financial services platform",
    founder: "Vijay Shekhar Sharma",
    website: "https://paytm.com",
    email: "support@paytm.com",
    phoneNumber: "+91-120-499-4242",
    imageUrl: "https://via.placeholder.com/400x200/003366/ffffff?text=Paytm"
  },
  {
    name: "Ola",
    state: "Karnataka",
    sector: "Transportation",
    funding: 4500000000, // $450M USD
    companytype: "Private Limited",
    registrationDate: new Date("2010-12-03"),
    turnover: 1500000000, // $150M USD
    rating: 4.3,
    description: "Ride-hailing and mobility solutions",
    founder: "Bhavish Aggarwal & Ankit Bhati",
    website: "https://www.olacabs.com",
    email: "support@olacabs.com",
    phoneNumber: "+91-974-155-5155",
    imageUrl: "https://via.placeholder.com/400x200/FF6B35/ffffff?text=Ola"
  },
  {
    name: "Swiggy",
    state: "Karnataka",
    sector: "Food Delivery",
    funding: 2500000000, // $250M USD
    companytype: "Private Limited",
    registrationDate: new Date("2014-06-01"),
    turnover: 1200000000, // $120M USD
    rating: 4.4,
    description: "Online food delivery and restaurant discovery platform",
    founder: "Sriharsha Majety, Nandan Reddy & Rahul Jaimini",
    email: "support@swiggy.com",
    phoneNumber: "+91-80-6740-6840",
    website: "https://www.swiggy.com",
    imageUrl: "https://via.placeholder.com/400x200/FC8019/ffffff?text=Swiggy"
  },
  {
    name: "Zomato",
    state: "Delhi",
    sector: "Food Delivery",
    funding: 1500000000, // $150M USD
    companytype: "Public Limited",
    registrationDate: new Date("2008-07-23"),
    turnover: 800000000, // $80M USD
    rating: 4.1,
    description: "Restaurant discovery and food delivery platform",
    founder: "Deepinder Goyal & Pankaj Chaddah",
    website: "https://www.zomato.com",
    email: "support@zomato.com",
    phoneNumber: "+91-80-4420-4420",
    imageUrl: "https://via.placeholder.com/400x200/D84B20/ffffff?text=Zomato"
  },
  {
    name: "BookMyShow",
    state: "Maharashtra",
    sector: "Entertainment",
    funding: 400000000, // $40M USD
    companytype: "Private Limited",
    registrationDate: new Date("1999-12-01"),
    turnover: 500000000, // $50M USD
    rating: 4.5,
    description: "Online ticket booking platform for movies and events",
    founder: "Ashish Hemrajani",
    website: "https://www.bookmyshow.com",
    email: "contact@bookmyshow.com",
    phoneNumber: "+91-22-3987-4411",
    imageUrl: "https://via.placeholder.com/400x200/8B5CF6/ffffff?text=BookMyShow"
  },
  {
    name: "MakeMyTrip",
    state: "Haryana",
    sector: "Travel",
    funding: 200000000, // $20M USD
    companytype: "Private Limited",
    registrationDate: new Date("2000-04-01"),
    turnover: 600000000, // $60M USD
    rating: 4.3,
    description: "Online travel booking platform",
    founder: "Deep Kalra",
    website: "https://www.makemytrip.com",
    email: "info@makemytrip.com",
    phoneNumber: "+91-124-406-3000",
    imageUrl: "https://via.placeholder.com/400x200/10B981/ffffff?text=MakeMyTrip"
  },
  {
    name: "OYO",
    state: "Haryana",
    sector: "Hospitality",
    funding: 2800000000, // $280M USD
    companytype: "Private Limited",
    registrationDate: new Date("2012-08-01"),
    turnover: 500000000, // $50M USD
    rating: 4.0,
    description: "Budget hotel chain and hospitality platform",
    founder: "Ritesh Agarwal",
    website: "https://www.oyorooms.com",
    email: "reservations@oyorooms.com",
    phoneNumber: "+91-124-405-5555",
    imageUrl: "https://via.placeholder.com/400x200/F59E0B/ffffff?text=OYO"
  },
  {
    name: "Byju's",
    state: "Karnataka",
    sector: "Edtech",
    funding: 2000000000, // $200M USD
    companytype: "Private Limited",
    registrationDate: new Date("2011-01-01"),
    turnover: 400000000, // $40M USD
    rating: 4.6,
    description: "Online learning platform for K-12 education",
    founder: "Byju Raveendran",
    website: "https://byjus.com",
    email: "support@byjus.com",
    phoneNumber: "+91-924-311-0070",
    imageUrl: "https://via.placeholder.com/400x200/3B82F6/ffffff?text=Byjus"
  },
  {
    name: "Unacademy",
    state: "Rajasthan",
    sector: "Edtech",
    funding: 300000000, // $30M USD
    companytype: "Private Limited",
    registrationDate: new Date("2015-09-01"),
    turnover: 150000000, // $15M USD
    rating: 4.4,
    description: "Online learning platform specializing in competitive exams",
    founder: "Gaurav Munjal, Roman Saini & Hemesh Singh",
    website: "https://unacademy.com",
    email: "support@unacademy.com",
    phoneNumber: "+91-120-689-6600",
    imageUrl: "https://via.placeholder.com/400x200/06B6D4/ffffff?text=Unacademy"
  },
  {
    name: "Razorpay",
    state: "Maharashtra",
    sector: "Fintech",
    funding: 400000000, // $40M USD
    companytype: "Private Limited",
    registrationDate: new Date("2014-07-01"),
    turnover: 500000000, // $50M USD
    rating: 4.7,
    description: "Payment gateway and financial technology solutions",
    founder: "Harshil Mathur & Shashank Kumar",
    website: "https://razorpay.com",
    email: "merchant.onboarding@razorpay.com",
    phoneNumber: "+91-722-388-9999",
    imageUrl: "https://via.placeholder.com/400x200/7C3AED/ffffff?text=Razorpay"
  },
  {
    name: "Freshworks",
    state: "Tamil Nadu",
    sector: "SaaS",
    funding: 700000000, // $70M USD
    companytype: "Private Limited",
    registrationDate: new Date("2010-11-01"),
    turnover: 600000000, // $60M USD
    rating: 4.5,
    description: "Cloud-based software solutions for customer service and growth",
    founder: "Girish Mathrubootham",
    website: "https://freshworks.com",
    email: "support@freshworks.com",
    phoneNumber: "+91-044-6112-7000",
    imageUrl: "https://via.placeholder.com/400x200/059669/ffffff?text=Freshworks"
  },
  {
    name: "ShareChat",
    state: "Karnataka",
    sector: "Social Media",
    funding: 200000000, // $20M USD
    companytype: "Private Limited",
    registrationDate: new Date("2015-03-01"),
    turnover: 50000000, // $5M USD
    rating: 4.2,
    description: "Regional language social media platform",
    founder: "Bhanu Singh, Ankush Sachdeva & Farid Ahsan",
    website: "https://sharechat.com",
    email: "support@sharechat.com",
    phoneNumber: "+91-080-690-9650",
    imageUrl: "https://via.placeholder.com/400x200/EC4899/ffffff?text=ShareChat"
  },
  {
    name: "Meesho",
    state: "Karnataka",
    sector: "E-commerce",
    funding: 700000000, // $70M USD
    companytype: "Private Limited",
    registrationDate: new Date("2015-07-01"),
    turnover: 300000000, // $30M USD
    rating: 4.3,
    description: "Reseller platform and online marketplace for Indian SMEs",
    founder: "Vidit Aatrey & Sanjeev Barnwal",
    website: "https://www.meesho.com",
    email: "help@meesho.com",
    phoneNumber: "+91-0120-470-5900",
    imageUrl: "https://via.placeholder.com/400x200/F97316/ffffff?text=Meesho"
  },
  {
    name: "Udaan",
    state: "Karnataka",
    sector: "B2B Commerce",
    funding: 1000000000, // $100M USD
    companytype: "Private Limited",
    registrationDate: new Date("2016-02-01"),
    turnover: 200000000, // $20M USD
    rating: 4.4,
    description: "B2B marketplace connecting manufacturers and retailers",
    founder: "Vaibhav Gupta & Sujeet Kumar",
    website: "https://udaan.com",
    email: "support@udaan.com",
    phoneNumber: "+91-080-6858-8558",
    imageUrl: "https://via.placeholder.com/400x200/65A30D/ffffff?text=Udaan"
  },
  {
    name: "Nykaa",
    state: "Maharashtra",
    sector: "E-commerce",
    funding: 100000000, // $10M USD
    companytype: "Private Limited",
    registrationDate: new Date("2012-01-01"),
    turnover: 350000000, // $35M USD
    rating: 4.5,
    description: "Online beauty and wellness marketplace",
    founder: "Falguni Nayar",
    website: "https://www.nykaa.com",
    email: "help@nykaa.com",
    phoneNumber: "+91-022-6159-5858",
    imageUrl: "https://via.placeholder.com/400x200/DB2777/ffffff?text=Nykaa"
  },
  {
    name: "PharmEasy",
    state: "Maharashtra",
    sector: "Healthcare",
    funding: 500000000, // $50M USD
    companytype: "Private Limited",
    registrationDate: new Date("2015-08-01"),
    turnover: 200000000, // $20M USD
    rating: 4.6,
    description: "Online pharmacy and healthcare services platform",
    founder: "Dharmil Sheth, Dhaval Shah & Mikhil Innani",
    website: "https://pharmeasy.in",
    email: "care@pharmeasy.in",
    phoneNumber: "+91-8068-123-123",
    imageUrl: "https://via.placeholder.com/400x200/06B6D4/ffffff?text=PharmEasy"
  },
  {
    name: "PolicyBazaar",
    state: "Haryana",
    sector: "Insurance",
    funding: 200000000, // $20M USD
    companytype: "Private Limited",
    registrationDate: new Date("2008-09-01"),
    turnover: 400000000, // $40M USD
    rating: 4.3,
    description: "Online insurance marketplace and comparison platform",
    founder: "Alok Bansal & Avaneesh Kumar",
    website: "https://www.policybazaar.com",
    email: "contact@policybazaar.com",
    phoneNumber: "+91-124-4500200",
    imageUrl: "https://via.placeholder.com/400x200/10B981/ffffff?text=PolicyBazaar"
  },
  {
    name: "Dream11",
    state: "Karnataka",
    sector: "Fantasy Sports",
    funding: 400000000, // $40M USD
    companytype: "Private Limited",
    registrationDate: new Date("2008-09-01"),
    turnover: 200000000, // $20M USD
    rating: 4.2,
    description: "Fantasy sports platform for cricket and other games",
    founder: "Harsh Jain & Bhavit Sheth",
    website: "https://www.dream11.com",
    email: "support@dream11.com",
    phoneNumber: "+91-080-6161-6161",
    imageUrl: "https://via.placeholder.com/400x200/8B5CF6/ffffff?text=Dream11"
  },
  {
    name: "Lenskart",
    state: "Delhi",
    sector: "Eyewear",
    funding: 150000000, // $15M USD
    companytype: "Private Limited",
    registrationDate: new Date("2010-01-01"),
    turnover: 250000000, // $25M USD
    rating: 4.4,
    description: "Online eyewear retailer with physical stores",
    founder: "Peyush Bansal & Sumeet Kapahi",
    website: "https://www.lenskart.com",
    email: "support@lenskart.com",
    phoneNumber: "+91-1800-111-111",
    imageUrl: "https://via.placeholder.com/400x200/059669/ffffff?text=Lenskart"
  },
  {
    name: "BigBasket",
    state: "Karnataka",
    sector: "E-commerce",
    funding: 400000000, // $40M USD
    companytype: "Private Limited",
    registrationDate: new Date("2011-06-01"),
    turnover: 150000000, // $15M USD
    rating: 4.1,
    description: "Online grocery delivery platform",
    founder: "V.S. Sudhakar, Hari Menon & Vipul Parekh",
    website: "https://www.bigbasket.com",
    email: "care@bigbasket.com",
    phoneNumber: "+91-1860-123-1000",
    imageUrl: "https://via.placeholder.com/400x200/84CC16/ffffff?text=BigBasket"
  },
  {
    name: "RedBus",
    state: "Tamil Nadu",
    sector: "Transportation",
    funding: 70000000, // $7M USD
    companytype: "Private Limited",
    registrationDate: new Date("2006-06-01"),
    turnover: 100000000, // $10M USD
    rating: 4.3,
    description: "Online bus ticket booking platform",
    founder: "Phanindra Sama",
    website: "https://www.redbus.in",
    email: "bookings@redbus.in",
    phoneNumber: "+91-044-6151-2471",
    imageUrl: "https://via.placeholder.com/400x200/DC2626/ffffff?text=RedBus"
  },
  {
    name: "Cure.fit",
    state: "Karnataka",
    sector: "Health & Fitness",
    funding: 300000000, // $30M USD
    companytype: "Private Limited",
    registrationDate: new Date("2016-10-01"),
    turnover: 150000000, // $15M USD
    rating: 4.4,
    description: "Digital health and fitness platform with gyms and clinics",
    founder: "Mukesh Bansal & Ankit Nagori",
    website: "https://cult.fit",
    email: "help@cult.fit",
    phoneNumber: "+91-080-4201-2345",
    imageUrl: "https://via.placeholder.com/400x200/F59E0B/ffffff?text=CURE.FIT"
  },
  {
    name: "Blinkit",
    state: "Delhi",
    sector: "Quick Commerce",
    funding: 500000000, // $50M USD
    companytype: "Private Limited",
    registrationDate: new Date("2013-01-01"),
    turnover: 80000000, // $8M USD
    rating: 4.2,
    description: "30-minute grocery delivery service",
    founder: "Albinder Dhindsa, Amit Kumar & Shardul Sharma",
    website: "https://blinkit.com",
    email: "help@blinkit.com",
    phoneNumber: "+91-0120-470-1900",
    imageUrl: "https://via.placeholder.com/400x200/10B981/ffffff?text=Blinkit"
  },
  {
    name: "DocsApp",
    state: "Delhi",
    sector: "Healthcare",
    funding: 20000000, // $2M USD
    companytype: "Private Limited",
    registrationDate: new Date("2015-01-01"),
    turnover: 30000000, // $3M USD
    rating: 4.3,
    description: "Doctor appointment booking and telemedicine platform",
    founder: "Gaurav Agarwal & Saurabh Arora",
    website: "https://www.docsapp.in",
    email: "support@docsapp.in",
    phoneNumber: "+91-011-4130-2100",
    imageUrl: "https://via.placeholder.com/400x200/06B6D4/ffffff?text=DocsApp"
  },
  {
    name: "Niyo",
    state: "Maharashtra",
    sector: "Fintech",
    funding: 30000000, // $3M USD
    companytype: "Private Limited",
    registrationDate: new Date("2017-07-01"),
    turnover: 15000000, // $1.5M USD
    rating: 4.5,
    description: "Modern banking solutions for businesses",
    founder: "Ashwin Mittal, Anirudh Garg & Abhinav Maheshwari",
    website: "https://niyo.inc",
    email: "support@niyo.inc",
    phoneNumber: "+91-022-6185-0100",
    imageUrl: "https://via.placeholder.com/400x200/7C3AED/ffffff?text=Niyo"
  },
  {
    name: "CRED",
    state: "Karnataka",
    sector: "Fintech",
    funding: 200000000, // $20M USD
    companytype: "Private Limited",
    registrationDate: new Date("2018-04-01"),
    turnover: 50000000, // $5M USD
    rating: 4.7,
    description: "Digital credit card for premium users",
    founder: "Kunal Shah",
    website: "https://cred.club",
    email: "support@cred.club",
    phoneNumber: "+91-080-6872-3131",
    imageUrl: "https://via.placeholder.com/400x200/000000/ffffff?text=CRED"
  },
  {
    name: "FirstCry",
    state: "Maharashtra",
    sector: "E-commerce",
    funding: 50000000, // $5M USD
    companytype: "Private Limited",
    registrationDate: new Date("2010-01-01"),
    turnover: 250000000, // $25M USD
    rating: 4.2,
    description: "Online marketplace for baby and kids products",
    founder: "Supam Maheshwari & Amish Shah",
    website: "https://www.firstcry.com",
    email: "care@firstcry.com",
    phoneNumber: "+91-022-6130-6666",
    imageUrl: "https://via.placeholder.com/400x200/EF4444/ffffff?text=FirstCry"
  }
];

const seedDatabase = async () => {
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");

    console.log("🗑️  Removing existing startups...");
    await Startup.deleteMany({});
    console.log("✅ Existing startups removed");

    console.log("📝 Adding demo startups...");
    const startups = await Startup.insertMany(demoData);
    console.log(`✅ Successfully added ${startups.length} startups`);

    const savedStartups = await Startup.find({});
    console.log("📊 Total startups in database:", savedStartups.length);

    console.log("🎉 Demo data seeded successfully!");
    console.log("📋 Sample of added startups:");
    savedStartups.slice(0, 5).forEach((startup, index) => {
      console.log(`${index + 1}. ${startup.name} - ${startup.state} - ${startup.sector}`);
    });

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

seedDatabase();
