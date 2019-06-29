import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import './App.scss';

import { YearlyCompounds, yearly_compounds, get_years } from './helpers/Calculations';

export const App = () => {
  const [years, setYears] = useState(15);
  const [initialDeposit, setInitialDeposit] = useState(150);
  const [monthlyContributions, setMonthlyContributions] = useState(25);
  const [annualInterestRate, setAnnualInterestRate] = useState(7);

  useEffect(() => {
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const options: YearlyCompounds = {
      years: years,
      principal: initialDeposit,
      monthlyContribution: monthlyContributions,
      interestRate: annualInterestRate / 100.0,
    }

    const yearlyCompounds = yearly_compounds(options)

    const labels: string[] = get_years(options.years);

    new Chart(context, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '$ per year',
          data: yearlyCompounds,
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderWidth: 2,
          borderColor: "red"
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          position: 'bottom'
        },
      }
    });
  }, [years, initialDeposit, monthlyContributions, annualInterestRate]);

  const handleYearsChange = (years: number) => {
    setYears(years);
  }
  const handleInitialDepositChange = (deposit: number) => {
    setInitialDeposit(deposit);
  }

  const handleMonthlyContributionsChange = (contribution: number) => {
    setMonthlyContributions(contribution);
  }

  const handleAnnualInterestRateChange = (annualRate: number) => {
    setAnnualInterestRate(annualRate)
  }

  return (
    <div className="container">
      <h1 className="title">Compound Interests with monthly contributions</h1>
      <div className="field is-grouped">
        <div className="control">
          <label className="label">Years</label>
          <input className="input"
            min="0"
            type="number"
            placeholder="years"
            value={years}
            onChange={(e) => handleYearsChange(parseInt(e.target.value))} />
        </div>
        <div className="control">
          <label className="label">Initial Deposit</label>
          <input className="input"
            min="0"
            type="number"
            placeholder="Initial deposit $"
            value={initialDeposit}
            onChange={(e) => handleInitialDepositChange(parseInt(e.target.value))} />
        </div>
        <div className="control">
          <label className="label">Monthly Contributions</label>
          <input className="input"
            min="0"
            type="number"
            placeholder="Monthly contributions $"
            value={monthlyContributions}
            onChange={(e) => handleMonthlyContributionsChange(parseInt(e.target.value))} />
        </div>
        <div className="control">
          <label className="label">Annual Interest rate</label>
          <input className="input"
            type="number"
            placeholder="Annual Interest rate %"
            value={annualInterestRate}
            onChange={(e) => handleAnnualInterestRateChange(parseInt(e.target.value))} />
        </div>
      </div>
      <div>
        <canvas id="chart" width="400" height="250"></canvas>
      </div>
    </div>
  )
}


export default App;
