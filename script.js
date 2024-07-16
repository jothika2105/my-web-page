document.addEventListener('DOMContentLoaded', () => {
    const categories = {
        "Kirana Stores": [
            {
                "name": "Sujatha Kirana Store",
                "image": "images/1.jpg",
                "address": "3rd Street, Vasuki Nagar, Kodungaiyur, Chennai, Tamil Nadu - 600118",
                "size": "500 sq ft",
                "potential": "Medium",
                "monthlyRevenue": "Rs. 50,000",
                "nearbyStores": [
                    { "x": 0.1, "y": 0.2 },
                    { "x": 0.2, "y": 0.3 }
                ],
                "dailyAvgCustomers": [50, 60, 70, 80, 90, 100, 110],
                "hhIncomeDistribution": [5, 10, 15, 20, 25, 30]
            },
            {
                "name": "Agalya Kirana Store",
                "image": "images/2.jpg",
                "address": "2nd Avenue, Anna Nagar, Chennai, Tamil Nadu - 600040",
                "size": "600 sq ft",
                "potential": "High",
                "monthlyRevenue": "Rs. 60,000",
                "nearbyStores": [
                    { "x": 0.3, "y": 0.4 },
                    { "x": 0.4, "y": 0.5 }
                ],
                "dailyAvgCustomers": [60, 70, 80, 90, 100, 110, 120],
                "hhIncomeDistribution": [10, 15, 20, 25, 30, 35]
            },
            {
                "name": "Markandeyaa Kirana Store",
                "image": "images/3.jpg",
                "address": "1st Main Road, T. Nagar, Chennai, Tamil Nadu - 600017",
                "size": "700 sq ft",
                "potential": "Low",
                "monthlyRevenue": "Rs. 70,000",
                "nearbyStores": [
                    { "x": 0.5, "y": 0.6 },
                    { "x": 0.6, "y": 0.7 }
                ],
                "dailyAvgCustomers": [30, 40, 50, 60, 70, 80, 90],
                "hhIncomeDistribution": [15, 20, 25, 30, 35, 40]
            },
            {
                "name": "Vijaya Kirana Store",
                "image": "images/4.jpg",
                "address": "5th Avenue, Shanti Nagar, Chennai, Tamil Nadu - 600054",
                "size": "800 sq ft",
                "potential": "Very High",
                "monthlyRevenue": "Rs. 80,000",
                "nearbyStores": [
                    { "x": 0.7, "y": 0.8 },
                    { "x": 0.8, "y": 0.9 }
                ],
                "dailyAvgCustomers": [40, 50, 60, 70, 80, 90, 100],
                "hhIncomeDistribution": [20, 25, 30, 35, 40, 45]
            }
        ],
        "Super mart": [
            {
                "name": "Shop Name 1",
                "image": "images/shop1.jpg",
                "address": "Address 1",
                "size": "600 sq ft",
                "potential": "High",
                "monthlyRevenue": "Rs. 60,000",
                "nearbyStores": [
                    { "x": 0.3, "y": 0.4 },
                    { "x": 0.4, "y": 0.5 }
                ],
                "dailyAvgCustomers": [60, 70, 80, 90, 100, 110, 120],
                "hhIncomeDistribution": [10, 15, 20, 25, 30, 35]
            },
            {
                "name": "Shop Name 2",
                "image": "images/shop2.jpg",
                "address": "Address 2",
                "size": "700 sq ft",
                "potential": "Medium",
                "monthlyRevenue": "Rs. 50,000",
                "nearbyStores": [
                    { "x": 0.1, "y": 0.2 },
                    { "x": 0.2, "y": 0.3 }
                ],
                "dailyAvgCustomers": [50, 60, 70, 80, 90, 100, 110],
                "hhIncomeDistribution": [5, 10, 15, 20, 25, 30]
            }
        ]
    };

    const categoryList = document.querySelector('.category-list');
    const shopList = document.querySelector('.shop-list');
    const shopDetails = document.querySelector('.shop-details');
    const shopImage = document.getElementById('shop-image');
    const shopName = document.getElementById('shop-name');
    const shopAddress = document.getElementById('shop-address');
    const shopSize = document.getElementById('shop-size');
    const shopPotential = document.getElementById('shop-potential');
    const shopCreditRating = document.getElementById('shop-credit-rating');
    const shopRevenue = document.getElementById('shop-revenue');
    const shopSec = document.getElementById('shop-sec');

    // Populate category list
    for (const category in categories) {
        const label = document.createElement('label');
        const shopCount = categories[category].length;
        label.innerHTML = `<input type="checkbox" value="${category}"> ${category} (${shopCount})`;
        categoryList.appendChild(label);

        label.querySelector('input').addEventListener('change', function() {
            if (this.checked) {
                displayShops(category);
            } else {
                clearShops();
            }
        });
    }

    function displayShops(category) {
        clearShops();
        const shops = categories[category];
        shops.forEach(shop => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = shop.name;
            link.addEventListener('click', (event) => {
                event.preventDefault();
                displayShopDetails(shop);
            });
            shopList.appendChild(link);
        });
    }

    function clearShops() {
        while (shopList.firstChild) {
            shopList.removeChild(shopList.firstChild);
        }
        shopDetails.style.display = 'none';
    }

    function displayShopDetails(shop) {
        shopImage.src = shop.image;
        shopName.textContent = shop.name;
        shopAddress.textContent = shop.address;
        shopSize.textContent = shop.size;
        shopPotential.textContent = shop.potential;
        shopCreditRating.textContent = shop.creditRating;
        shopRevenue.textContent = shop.monthlyRevenue;
        shopSec.textContent = shop.sec;

        displayChart('nearby-stores-chart', 'scatter', shop.nearbyStores, {
            title: 'Nearest Same Stores in 0.5 km Radius',
            xLabel: 'Latitude',
            yLabel: 'Longitude',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)'
        });

        displayChart('daily-customers-chart', 'bar', shop.dailyAvgCustomers, {
            title: 'Daily Avg (of last Qtr) Customers at Store',
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)'
        });

        displayChart('income-distribution-chart', 'pie', shop.hhIncomeDistribution, {
            title: 'HHs by Income in 0.5 km radius around Store',
            labels: ['Above Rs. 20L', 'Rs. 10L - 20L', 'Rs. 5L - 10L', 'Below Rs. 90K', 'Rs. 2L - 5L', 'Rs. 90K - 2L'],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]
        });

        shopDetails.style.display = 'block';
    }

    function displayChart(id, type, data, options) {
        const ctx = document.getElementById(id).getContext('2d');
        new Chart(ctx, {
            type: type,
            data: {
                labels: options.labels || [],
                datasets: [{
                    data: data,
                    backgroundColor: options.backgroundColor,
                    borderColor: options.borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: options.title
                },
                scales: options.xLabel && options.yLabel ? {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: options.xLabel
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: options.yLabel
                        }
                    }]
                } : {}
            }
        });
    }
});
