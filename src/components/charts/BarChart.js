import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: function () {
        return {
            datapacket: {},
            datacollection: {
                labels: [],
                datasets: [{
                    label: "Number",
                    backgroundColor: [],
                    data: []
                  }]
            },
            options: {
                legend: { display: false },
                title: {
                  display: true,
                  text: 'Count of Each Food'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }                
            }
        }
      },
      methods: {
        fetchItems: function () {
            database.collection('menu').get().then((querySnapShot)=>{   
                let item = {};                
                querySnapShot.forEach(doc=>{                  
                    item=doc.data()
                    item.id=doc.id;                    
                    this.datapacket[item.name] = 0;                                        
                    this.datacollection.labels.push(item.name)
                    let r = String(Math.floor(Math.random() * 255));
                    let g = String(Math.floor(Math.random() * 255));
                    let b = String(Math.floor(Math.random() * 255));
                    this.datacollection.datasets[0].backgroundColor.push("rgb(" + r + "," + g + "," + b + ")");
                }) });
                
                database.collection('orders').get().then(querySnapShot => {                    
                    querySnapShot.forEach(doc => {                 
                        let item = doc.data();                                                
                        for (let i in item) {                           
                            this.datapacket[i] += parseInt(item[i]);
                        }                        
                })

                for (let i in this.datapacket) {                    
                    this.datacollection.datasets[0].data.push(this.datapacket[i]);
                }

                this.renderChart(this.datacollection, this.options)
            })
        }
      },
      created () {
        this.fetchItems()
      }
};