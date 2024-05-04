import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {CategoryScale, Chart as ChartJS ,LineElement, LinearScale, PointElement } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import moment from "moment";
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,PointElement
)
function LineChart(props) {
  const [coinData, setCoinData] = useState([]);
  const [days, setDays] = useState(1);
  
  let cur = props.id.id;
  const apiBaseURL = `https://api.coingecko.com/api/v3/coins/${cur}/market_chart`;
  
  const handleFetchData = async (days) => {
    
    const url = `${apiBaseURL}?vs_currency=usd&days=${days}`;
    
    try {
        const options = {
            method: "GET", 
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": "CG-XuGzvNKA2vQJxcY17KbzfTnE	",
            },
          };
      const response = await fetch(url , options );
      const data = await response.json();
      setCoinData(data.prices.map(val => ({ x: val[0] , y: val[1] })));
      console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
console.log(coinData);

  const handleDay = () => {
    setDays(1);
    handleFetchData(1);
  };

  const handleMonth = () => {
    setDays(30);
    handleFetchData(30);
  };

  const handle3Month = () => {
    setDays(90);
    handleFetchData(90);
  };

  const handleYear = () => {
    setDays(365);
    handleFetchData(365);
  };

  useEffect(() => {
    handleFetchData(days); 
  }, []); 


  let data=  {
    labels: coinData.map(value=> moment(value.x).format("MMM,DD")),
    datasets: [{
        label: cur,
        data: coinData.map(val=>  (val.y)),
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
        ],
        borderWidth: 1
    }]
}

let options= {
    // maintainAspectRatio: true,
    scales: {
        y: {
            beginAtZero: true
        }
    } ,  tension: 0.1
    
}

  return (
    <div className="linechart">
    <Line 
    options={options}
    data={data}
    height={400}
     />
      <button className={ days == 1 ? "active" : "" } onClick={handleDay}>24 hours</button>
      <button  className={ days == 30 ? "active" : "" } onClick={handleMonth}>30 days</button>
      <button className={ days == 90 ? "active" : "" } onClick={handle3Month}>3 months</button>
      <button className={ days == 365 ? "active" : "" } onClick={handleYear}>1 year</button>
    </div>
  );
}

LineChart.propTypes = {
  id: PropTypes.object.isRequired, // Assuming id is an object with an id property
};

export default LineChart;
