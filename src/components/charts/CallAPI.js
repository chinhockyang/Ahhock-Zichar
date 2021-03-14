import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function () {
        return {
            datapacket: {},
            datacollection: {
                labels: [],
                datasets: []
            },
            options: {
                legend: { display: true },
                title: {
                  display: true,
                  text: 'PSI Twenty Four Hourly (By Region)'
                },
                responsive: true,
                maintainAspectRatio: false,                
            }
        }
      },
      methods: {
        fetchItems: function () {
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
            .then(response => {
                let item = response.data;
                for (let i of item["region_metadata"]) {                    
                    this.datapacket[i.name] = [];
                }

                item["items"].forEach(data => { 
                    let time = data["timestamp"];                    
                    let psi = data["readings"]["psi_twenty_four_hourly"];                    
                    for (let i in psi) {                                        
                        this.datapacket[i].push(psi[i]);
                    }
                    this.datacollection.labels.push(time);          
                })
                
                for (let i in this.datapacket) {                                        
                    let r = String(Math.floor(Math.random() * 255));
                    let g = String(Math.floor(Math.random() * 255));
                    let b = String(Math.floor(Math.random() * 255));                    
                    this.datacollection.datasets.push(
                        {
                            data: this.datapacket[i],
                            label: i,
                            borderColor: "rgb(" + r + "," + g + "," + b + ")",
                            fill:false
                        }
                    )
                }
                this.renderChart(this.datacollection, this.options)
            })
        }
      },
      created () {
        this.fetchItems()
      }      
};