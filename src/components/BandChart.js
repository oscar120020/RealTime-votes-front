import React, { useContext, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";
import { SocketContext } from "../context/SocketContext";

export const BandChart = () => {
  Chart.register(...registerables);
  const {socket} = useContext(SocketContext)
  let mychart;

  useEffect(() => {
    socket.on("current-bands", (data) =>{
        if(mychart){
            mychart.destroy()
        }
        createChart(data)
    })
  }, [socket])

  const createChart = (bands) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    mychart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: bands.sort((a, b) => b.votes - a.votes).map(band => band.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands.sort((a, b) => b.votes - a.votes).map(band => band.votes),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        animation: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  return <canvas id="myChart"></canvas>;
};
