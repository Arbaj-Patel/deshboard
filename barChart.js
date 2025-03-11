const ctx = document.getElementById('barChart').getContext('2d');
Chart.defaults.font.size = 16

let mydata = {
    type: 'bar',
    data: {
        labels: ['C', 'JAVA', 'PYTHON', 'JS', 'C++', 'GoLang'],
        datasets: [{
            label: 'Student take course',
            data: [1000,2000,3000,4000,5000,6000],
            backgroundColor: [
                'rgba(244, 11, 61, 0.5)',
                'rgba(54, 163, 235, 0.69)',
                'rgba(255, 207, 86, 0.74)',
                'rgba(75, 192, 192, 0.67)',
                'rgba(153, 102, 255, 0.51)',
                'rgba(245, 129, 12, 0.59)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive:false,
        layout:{
            padding:20
        },
        tooltips:{
           bodyFontStyle:"bold",
        },
       labels:{
         fontColor:"white",
         boxWidth:20,
       },
       animation: {
          duration: 4000,
          easing: 'easeInOutBounce',
      },
    }
}


const myChart = new Chart(ctx,mydata) ;


