export const products = [
    {
        id: '1',
        title: 'Introduction to Algorithms (CLRS) - 4th Edition',
        price: 850,
        category: 'Textbooks',
        condition: 'Like New',
        location: 'Central Library',
        postedAt: '2023-10-15T10:30:00Z',
        seller: { name: 'Rahul Sharma', email: 'rahul.sharma@iitb.ac.in', isVerified: true, avatar: 'R' },
        rating: 4.8,
        views: 120,
        images: [
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Standard CLRS algorithm book. Barely used, no markings. Essential for CSE algorithms course.'
    },
    {
        id: '2',
        title: 'Scientific Calculator fx-991EX',
        price: 600,
        category: 'Calculators',
        condition: 'Excellent',
        location: 'Hostel 4',
        postedAt: '2023-10-14T15:20:00Z',
        seller: { name: 'Priya Patel', email: 'priya.p@iitb.ac.in', isVerified: true, avatar: 'P' },
        rating: 4.5,
        views: 85,
        images: [
            'https://images.unsplash.com/photo-1574602305366-eb9a299d2e12?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Classwiz scientific calculator. Perfect for engineering exams. Solar panel working perfectly.'
    },
    {
        id: '3',
        title: 'Drafter for Engineering Drawing',
        price: 350,
        category: 'Drawing Tools',
        condition: 'Good',
        location: 'Mechanical Dept',
        postedAt: '2023-10-12T09:00:00Z',
        seller: { name: 'Amit Kumar', email: 'amit.k@iitb.ac.in', isVerified: false, avatar: 'A' },
        rating: 4.0,
        views: 45,
        images: [
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Mini drafter for ED labs. Scales are intact. A bit of wear on the joints but locks firmly.'
    },
    {
        id: '4',
        title: 'Hero Sprint Cycle - Black',
        price: 3500,
        category: 'Cycles',
        condition: 'Good',
        location: 'Hostel 12',
        postedAt: '2023-10-10T18:45:00Z',
        seller: { name: 'Vikram Singh', email: 'vikram.s@iitb.ac.in', isVerified: true, avatar: 'V' },
        rating: 4.2,
        views: 210,
        images: [
            'https://images.unsplash.com/photo-1485965120184-e224f723d621?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1532298229144-0ec0c57e3081?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Single speed cycle. Brakes recently serviced. Good for campus commute. Lock included.'
    },
    {
        id: '5',
        title: 'Sony WH-CH510 Wireless Headphones',
        price: 1800,
        category: 'Headphones',
        condition: 'Excellent',
        location: 'Library Reading Room',
        postedAt: '2023-10-16T11:15:00Z',
        seller: { name: 'Neha Gupta', email: 'neha.g@iitb.ac.in', isVerified: true, avatar: 'N' },
        rating: 4.9,
        views: 150,
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Blue color. 35 hours battery life. USB-C charging. Very comfortable for long study sessions.'
    },
    {
        id: '6',
        title: 'Arduino Uno Starter Kit',
        price: 1200,
        category: 'Lab Equipment',
        condition: 'Like New',
        location: 'Tinkerers Lab',
        postedAt: '2023-10-13T14:30:00Z',
        seller: { name: 'Rohan Das', email: 'rohan.d@iitb.ac.in', isVerified: true, avatar: 'R' },
        rating: 4.7,
        views: 95,
        images: [
            'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Complete kit with sensors, jumper wires, breadboard, and Arduino Uno board. Used for one semester project.'
    },
    {
        id: '7',
        title: 'Mini Refrigerator (50L)',
        price: 4500,
        category: 'Mini-fridge',
        condition: 'Good',
        location: 'Hostel 9',
        postedAt: '2023-10-09T16:00:00Z',
        seller: { name: 'Suresh Raina', email: 'suresh.r@iitb.ac.in', isVerified: false, avatar: 'S' },
        rating: 3.8,
        views: 300,
        images: [
            'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Perfect for keeping milk and drinks cold. Works well, slightly noisy compressor but manageable.'
    },
    {
        id: '8',
        title: 'Study Table Lamp (Rechargeable)',
        price: 400,
        category: 'Table/Chair',
        condition: 'New',
        location: 'Hostel 3',
        postedAt: '2023-10-17T08:00:00Z',
        seller: { name: 'Anjali Sharma', email: 'anjali.s@iitb.ac.in', isVerified: true, avatar: 'A' },
        rating: 5.0,
        views: 60,
        images: [
            'https://images.unsplash.com/photo-1534234828563-0253171e5e3a?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'LED touch lamp with 3 brightness levels. Flexible neck. Unopened box.'
    },
    {
        id: '9',
        title: 'Mi Power Bank 20000mAh',
        price: 900,
        category: 'Power banks',
        condition: 'Fair',
        location: 'Lecture Hall Complex',
        postedAt: '2023-10-11T13:45:00Z',
        seller: { name: 'Karan Johar', email: 'karan.j@iitb.ac.in', isVerified: true, avatar: 'K' },
        rating: 4.1,
        views: 110,
        images: [
            'https://images.unsplash.com/photo-1609592424362-e694a5e3d165?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Heavy duty power bank. Scratches on the body but holds charge perfectly. Supports fast charging.'
    },
    {
        id: '10',
        title: 'Mattress for Single Bed',
        price: 800,
        category: 'Hostel mattresses',
        condition: 'Good',
        location: 'Hostel 5',
        postedAt: '2023-10-08T10:00:00Z',
        seller: { name: 'Deepak Verma', email: 'deepak.v@iitb.ac.in', isVerified: false, avatar: 'D' },
        rating: 3.5,
        views: 180,
        images: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Cotton mattress, 4 inches thick. Clean and comfortable. Moving out sale.'
    },
    {
        id: '11',
        title: 'Campus Hoodie (Size L)',
        price: 500,
        category: 'Clothes / Hoodies',
        condition: 'Excellent',
        location: 'Hostel 7',
        postedAt: '2023-10-18T09:30:00Z',
        seller: { name: 'Arjun Reddy', email: 'arjun.r@iitb.ac.in', isVerified: true, avatar: 'A' },
        rating: 4.6,
        views: 130,
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Navy blue hoodie with college logo. Worn twice. Too big for me.'
    },
    {
        id: '12',
        title: 'Badminton Racket (Yonex)',
        price: 1500,
        category: 'Sports items',
        condition: 'Like New',
        location: 'SAC (Student Activity Center)',
        postedAt: '2023-10-16T17:00:00Z',
        seller: { name: 'Saina N', email: 'saina.n@iitb.ac.in', isVerified: true, avatar: 'S' },
        rating: 4.9,
        views: 200,
        images: [
            'https://images.unsplash.com/photo-1626224583764-847890e045b5?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Muscle Power 29. Gutting is new. Comes with full cover.'
    },
    {
        id: '13',
        title: 'Laptop Stand (Aluminum)',
        price: 700,
        category: 'Laptop stands',
        condition: 'Excellent',
        location: 'Hostel 10',
        postedAt: '2023-10-15T12:00:00Z',
        seller: { name: 'Tech Guy', email: 'tech.g@iitb.ac.in', isVerified: true, avatar: 'T' },
        rating: 4.4,
        views: 75,
        images: [
            'https://images.unsplash.com/photo-1616353071588-708dcff912e2?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Adjustable height. Sturdy and helps with posture. Fits up to 15.6 inch laptops.'
    },
    {
        id: '14',
        title: 'SanDisk 64GB Pen Drive',
        price: 400,
        category: 'Pendrive / Router',
        condition: 'New',
        location: 'Computer Center',
        postedAt: '2023-10-19T11:00:00Z',
        seller: { name: 'Data Hoarder', email: 'data.h@iitb.ac.in', isVerified: false, avatar: 'D' },
        rating: 5.0,
        views: 40,
        images: [
            'https://images.unsplash.com/photo-1623949556303-b0d17d198863?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'USB 3.0. Unopened pack. Got it as a gift, don\'t need it.'
    },
    {
        id: '15',
        title: 'TP-Link WiFi Router',
        price: 900,
        category: 'Pendrive / Router',
        condition: 'Good',
        location: 'Hostel 2',
        postedAt: '2023-10-14T14:00:00Z',
        seller: { name: 'Net Admin', email: 'net.a@iitb.ac.in', isVerified: true, avatar: 'N' },
        rating: 4.3,
        views: 90,
        images: [
            'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Dual band router. Good range for hostel rooms. Adapter included.'
    },
    {
        id: '16',
        title: 'Nike Running Shoes (Size 9)',
        price: 2500,
        category: 'Shoes',
        condition: 'Good',
        location: 'Hostel 8',
        postedAt: '2023-10-13T08:30:00Z',
        seller: { name: 'Runner Boy', email: 'runner.b@iitb.ac.in', isVerified: true, avatar: 'R' },
        rating: 4.1,
        views: 160,
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Nike Downshifter. Used for 3 months. Cleaned and sanitized. Good grip.'
    },
    {
        id: '17',
        title: 'Engineering Mechanics (Statics & Dynamics)',
        price: 450,
        category: 'Textbooks',
        condition: 'Fair',
        location: 'Civil Dept',
        postedAt: '2023-10-12T16:45:00Z',
        seller: { name: 'Civil Eng', email: 'civil.e@iitb.ac.in', isVerified: true, avatar: 'C' },
        rating: 3.9,
        views: 55,
        images: [
            'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Hibbeler. Cover is torn but pages are intact. Highlighted important points.'
    },
    {
        id: '18',
        title: 'Multimeter (Digital)',
        price: 300,
        category: 'Lab Equipment',
        condition: 'Like New',
        location: 'Electrical Dept',
        postedAt: '2023-10-11T10:15:00Z',
        seller: { name: 'Elec Geek', email: 'elec.g@iitb.ac.in', isVerified: true, avatar: 'E' },
        rating: 4.8,
        views: 70,
        images: [
            'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Basic digital multimeter. Probes included. Battery fresh.'
    },
    {
        id: '19',
        title: 'Plastic Chair',
        price: 400,
        category: 'Table/Chair',
        condition: 'Good',
        location: 'Hostel 1',
        postedAt: '2023-10-10T13:00:00Z',
        seller: { name: 'Hosteler', email: 'hosteler@iitb.ac.in', isVerified: false, avatar: 'H' },
        rating: 3.7,
        views: 100,
        images: [
            'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Nilkamal chair. Sturdy. No cracks. Good for balcony or extra seating.'
    },
    {
        id: '20',
        title: 'Football (Nivia)',
        price: 450,
        category: 'Sports items',
        condition: 'Good',
        location: 'Football Ground',
        postedAt: '2023-10-18T16:30:00Z',
        seller: { name: 'Striker', email: 'striker@iitb.ac.in', isVerified: true, avatar: 'S' },
        rating: 4.0,
        views: 80,
        images: [
            'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Nivia Shining Star. Size 5. Good bounce. A bit scuffed.'
    },
    {
        id: '21',
        title: 'Organic Chemistry (Morrison & Boyd)',
        price: 700,
        category: 'Textbooks',
        condition: 'Excellent',
        location: 'Chemistry Dept',
        postedAt: '2023-10-19T09:00:00Z',
        seller: { name: 'Chemist', email: 'chemist@iitb.ac.in', isVerified: true, avatar: 'C' },
        rating: 4.7,
        views: 65,
        images: [
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'The bible of organic chemistry. Hardcover. Pristine condition.'
    },
    {
        id: '22',
        title: 'Logitech Wireless Mouse',
        price: 650,
        category: 'Electronics & Gadgets',
        condition: 'Like New',
        location: 'Hostel 13',
        postedAt: '2023-10-17T14:45:00Z',
        seller: { name: 'Gamer', email: 'gamer@iitb.ac.in', isVerified: true, avatar: 'G' },
        rating: 4.8,
        views: 140,
        images: [
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'M235. Red color. Smooth tracking. Receiver inside battery compartment.'
    },
    {
        id: '23',
        title: 'Electric Kettle (1.5L)',
        price: 800,
        category: 'Hostel & Room Essentials',
        condition: 'Good',
        location: 'Hostel 6',
        postedAt: '2023-10-15T19:00:00Z',
        seller: { name: 'Late Nighter', email: 'latenight@iitb.ac.in', isVerified: false, avatar: 'L' },
        rating: 4.2,
        views: 220,
        images: [
            'https://images.unsplash.com/photo-1594213114663-d94db9b17126?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Prestige kettle. Boils water in 2 mins. Auto cut-off working.'
    },
    {
        id: '24',
        title: 'Yoga Mat',
        price: 300,
        category: 'Sports & Fitness',
        condition: 'Good',
        location: 'Gymkhana',
        postedAt: '2023-10-14T07:00:00Z',
        seller: { name: 'Yogi', email: 'yogi@iitb.ac.in', isVerified: true, avatar: 'Y' },
        rating: 4.5,
        views: 50,
        images: [
            'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=800'
        ],
        description: '6mm thick. Anti-slip. Purple color. Washed and clean.'
    },
    {
        id: '25',
        title: 'T-Square (Acrylic)',
        price: 200,
        category: 'Drawing Tools',
        condition: 'Fair',
        location: 'Architecture Studio',
        postedAt: '2023-10-13T11:30:00Z',
        seller: { name: 'Archi', email: 'archi@iitb.ac.in', isVerified: true, avatar: 'A' },
        rating: 3.8,
        views: 35,
        images: [
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
        ],
        description: '24 inch T-square. Edges are slightly chipped but usable for rough work.'
    },
    {
        id: '26',
        title: 'Microscope Slides (Box of 50)',
        price: 150,
        category: 'Scientific instruments',
        condition: 'New',
        location: 'Bio School',
        postedAt: '2023-10-12T15:00:00Z',
        seller: { name: 'Biologist', email: 'bio@iitb.ac.in', isVerified: true, avatar: 'B' },
        rating: 5.0,
        views: 25,
        images: [
            'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Blank glass slides. Pre-cleaned. Cover slips included.'
    },
    {
        id: '27',
        title: 'MBA Entrance Guide (CAT)',
        price: 400,
        category: 'Textbooks',
        condition: 'Good',
        location: 'SOM',
        postedAt: '2023-10-11T12:00:00Z',
        seller: { name: 'Manager', email: 'manager@iitb.ac.in', isVerified: true, avatar: 'M' },
        rating: 4.3,
        views: 90,
        images: [
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Arun Sharma. Quantitative Aptitude. Solved examples are very helpful.'
    },
    {
        id: '28',
        title: 'Extension Board (4 Sockets)',
        price: 350,
        category: 'Electronics & Gadgets',
        condition: 'Good',
        location: 'Hostel 11',
        postedAt: '2023-10-10T20:00:00Z',
        seller: { name: 'Electrician', email: 'elec@iitb.ac.in', isVerified: false, avatar: 'E' },
        rating: 4.0,
        views: 105,
        images: [
            'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Anchor spike guard. 2 meter wire. Individual switches.'
    },
    {
        id: '29',
        title: 'Formal Shirt (White, Size 40)',
        price: 400,
        category: 'Clothes / Hoodies',
        condition: 'Like New',
        location: 'Hostel 4',
        postedAt: '2023-10-18T08:00:00Z',
        seller: { name: 'Intern', email: 'intern@iitb.ac.in', isVerified: true, avatar: 'I' },
        rating: 4.7,
        views: 60,
        images: [
            'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Raymond. Worn once for interview. Freshly ironed.'
    },
    {
        id: '30',
        title: 'Table Tennis Racket',
        price: 600,
        category: 'Sports items',
        condition: 'Good',
        location: 'Hostel 8',
        postedAt: '2023-10-17T18:30:00Z',
        seller: { name: 'Ping Pong', email: 'ping@iitb.ac.in', isVerified: true, avatar: 'P' },
        rating: 4.2,
        views: 85,
        images: [
            'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'GKI Offensive. Rubber has good spin. Handle grip taped.'
    },
    {
        id: '31',
        title: 'Vernier Caliper',
        price: 400,
        category: 'Scientific instruments',
        condition: 'Excellent',
        location: 'Physics Lab',
        postedAt: '2023-10-16T13:15:00Z',
        seller: { name: 'Physicist', email: 'phys@iitb.ac.in', isVerified: true, avatar: 'P' },
        rating: 4.9,
        views: 40,
        images: [
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Stainless steel. Analog. Precision 0.02mm. Case included.'
    },
    {
        id: '32',
        title: 'Bean Bag (XXL)',
        price: 1200,
        category: 'Table/Chair',
        condition: 'Fair',
        location: 'Hostel 12',
        postedAt: '2023-10-15T16:00:00Z',
        seller: { name: 'Chiller', email: 'chill@iitb.ac.in', isVerified: false, avatar: 'C' },
        rating: 3.6,
        views: 190,
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Brown leatherette. Beans are slightly compressed, might need refill. Very comfy.'
    },
    {
        id: '33',
        title: 'Bluetooth Speaker (JBL Go)',
        price: 1100,
        category: 'Electronics & Gadgets',
        condition: 'Good',
        location: 'Hostel 3',
        postedAt: '2023-10-14T19:30:00Z',
        seller: { name: 'Music Lover', email: 'music@iitb.ac.in', isVerified: true, avatar: 'M' },
        rating: 4.5,
        views: 170,
        images: [
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Orange color. Loud sound. Battery lasts 4 hours.'
    },
    {
        id: '34',
        title: 'Desk Organizer',
        price: 200,
        category: 'Hostel & Room Essentials',
        condition: 'Like New',
        location: 'Hostel 9',
        postedAt: '2023-10-13T10:00:00Z',
        seller: { name: 'Organized', email: 'org@iitb.ac.in', isVerified: true, avatar: 'O' },
        rating: 4.8,
        views: 55,
        images: [
            'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Metal mesh. Pen holder, sticky note section, and drawer.'
    },
    {
        id: '35',
        title: 'Canvas Shoes (White)',
        price: 300,
        category: 'Shoes',
        condition: 'Fair',
        location: 'Hostel 5',
        postedAt: '2023-10-12T08:00:00Z',
        seller: { name: 'Artist', email: 'art@iitb.ac.in', isVerified: false, avatar: 'A' },
        rating: 3.5,
        views: 45,
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Painted with acrylics. Size 8. Unique design.'
    },
    {
        id: '36',
        title: 'Python Crash Course',
        price: 500,
        category: 'Textbooks',
        condition: 'Like New',
        location: 'CSE Dept',
        postedAt: '2023-10-11T14:30:00Z',
        seller: { name: 'Coder', email: 'code@iitb.ac.in', isVerified: true, avatar: 'C' },
        rating: 4.9,
        views: 100,
        images: [
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Eric Matthes. Best book for beginners. No marks.'
    },
    {
        id: '37',
        title: 'Soldering Iron Kit',
        price: 450,
        category: 'Lab Equipment',
        condition: 'Good',
        location: 'Elec Lab',
        postedAt: '2023-10-10T11:00:00Z',
        seller: { name: 'Maker', email: 'make@iitb.ac.in', isVerified: true, avatar: 'M' },
        rating: 4.4,
        views: 65,
        images: [
            'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800'
        ],
        description: '25W iron. Stand and flux included. Tip is slightly oxidized but works.'
    },
    {
        id: '38',
        title: 'Laundry Bag',
        price: 150,
        category: 'Hostel & Room Essentials',
        condition: 'Good',
        location: 'Hostel 2',
        postedAt: '2023-10-09T09:00:00Z',
        seller: { name: 'Cleaner', email: 'clean@iitb.ac.in', isVerified: true, avatar: 'C' },
        rating: 4.0,
        views: 30,
        images: [
            'https://images.unsplash.com/photo-1517677208171-0bc12dd9743c?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Mesh bag. Collapsible. Holds 2 weeks of clothes.'
    },
    {
        id: '39',
        title: 'Cricket Bat (Kashmir Willow)',
        price: 1200,
        category: 'Sports items',
        condition: 'Fair',
        location: 'Gymkhana',
        postedAt: '2023-10-08T17:30:00Z',
        seller: { name: 'Batsman', email: 'bat@iitb.ac.in', isVerified: true, avatar: 'B' },
        rating: 3.9,
        views: 110,
        images: [
            'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'SG bat. Toe guard missing. Good stroke. Oiled and knocked.'
    },
    {
        id: '40',
        title: 'Water Bottle (Steel)',
        price: 300,
        category: 'Hostel & Room Essentials',
        condition: 'Good',
        location: 'Hostel 7',
        postedAt: '2023-10-07T12:00:00Z',
        seller: { name: 'Hydrated', email: 'water@iitb.ac.in', isVerified: true, avatar: 'H' },
        rating: 4.6,
        views: 50,
        images: [
            'https://images.unsplash.com/photo-1602143407151-01114192003f?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Milton 1L. Keeps water cool for 4 hours. Dent at the bottom.'
    }
];

export const categories = [
    'All Categories',
    'Textbooks',
    'Lab Equipment',
    'Calculators',
    'Cycles',
    'Headphones',
    'Power banks',
    'Mini-fridge',
    'Hostel mattresses',
    'Table/Chair',
    'Pendrive / Router',
    'Clothes / Hoodies',
    'Shoes',
    'Sports items',
    'Drawing Tools',
    'Laptop stands',
    'Scientific instruments',
    'Electronics & Gadgets',
    'Hostel & Room Essentials',
    'Others'
];
