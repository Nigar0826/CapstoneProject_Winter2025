$(document).ready(function () {
    $.ajax({
      url: '/api/analytics/sales-summary',
      method: 'GET',
      success: function (data) {
        $('#totalSalesAmount').text(
            data.totalSales && data.totalSales.length > 0 ? data.totalSales[0].total_sales : 0
          );
          $('#totalOrdersCount').text(
            data.totalOrders && data.totalOrders.length > 0 ? data.totalOrders[0].total_orders : 0
          );
          
        // Populate sales by product table
        let salesByProductTable = '';
        data.salesByProduct.forEach(product => {
          salesByProductTable += `<tr><td>${product.name}</td><td>$${product.sales}</td></tr>`;
        });
        $('#salesByProductTable').html(salesByProductTable);
  
        // Populate sales by customer table
        let salesByCustomerTable = '';
        data.salesByCustomer.forEach(customer => {
          salesByCustomerTable += `<tr><td>${customer.name}</td><td>$${customer.sales}</td></tr>`;
        });
        $('#salesByCustomerTable').html(salesByCustomerTable);
  
        // Sales by product chart
        new Chart(document.getElementById('salesByProductChart'), {
          type: 'bar',
          data: {
            labels: data.salesByProduct.map(p => p.name),
            datasets: [{
              label: 'Sales by Product',
              data: data.salesByProduct.map(p => p.sales),
              backgroundColor: ['#4A6FA5', '#A0C4FF', '#FF6B6B', '#FFE066', '#82C91E'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
  
        // Sales by customer chart
        new Chart(document.getElementById('salesByCustomerChart'), {
          type: 'pie',
          data: {
            labels: data.salesByCustomer.map(c => c.name),
            datasets: [{
              label: 'Sales by Customer',
              data: data.salesByCustomer.map(c => c.sales),
              backgroundColor: ['#4A6FA5', '#A0C4FF', '#FF6B6B', '#FFE066', '#82C91E'],
              borderWidth: 1
            }]
          }
        });
  
        // Populate sales by month table
        let salesByMonthTable = '';
        data.salesByMonth.forEach(month => {
          salesByMonthTable += `<tr><td>${month.month}</td><td>$${month.sales}</td></tr>`;
        });
        $('#salesByMonthTable').html(salesByMonthTable);
  
        // Sales by month chart
        new Chart(document.getElementById('salesByMonthChart'), {
          type: 'line',
          data: {
            labels: data.salesByMonth.map(m => m.month),
            datasets: [{
              label: 'Sales by Month',
              data: data.salesByMonth.map(m => m.sales),
              borderColor: '#4A6FA5',
              backgroundColor: 'rgba(74, 111, 165, 0.2)',
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      error: function (error) {
        console.error('Error fetching analytics data:', error);
      }
    });
  });
  
  