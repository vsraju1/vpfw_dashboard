import React from 'react'
import './Homepage.css'
import Card from '../../Components/DashboardCard/DashboardCard.jsx'
import Header from '../../Components/Header/Header.jsx'

const data = {
    title: 'expenses',
    today: 28600,
    week: 365200,
    month: 1245000
}
const income = {
    title: 'Income',
    today: 10000,
    week: 456780,
    month: 1567890
}
const pendingWorks = {
    title: 'Pending works',
    today: 1,
    week: 2,
    month: 20
}
const overAll = {
    title: 'Overall(Inc - Exp)',
    today: income.today - data.today,
    week: income.week - data.week,
    month: income.month - data.month
}
const works = {
    title: 'Total works',
    today: 2,
    week: 12,
    month: 36
}
const completedWorks = {
    title: 'Completed works',
    today: 2,
    week: 12,
    month: 36
}
const salary = {
    title: 'salaries',
    today: 4600,
    week: 23500,
    month: 186000
}
const links = {
    title: 'Links',
    today: 4600,
    week: 23500,
    month: 186000
}



const Homepage = () => {
  return (
    <>
    <Header />
    {/* <div className='container'>
        <Card data={data} color="red" classNam="expences"/>
        <Card data={income} color="green" classNam="income"/>
        <Card data={pendingWorks} color="red" classNam="pending"/>
        <Card data={overAll} color="green" classNam="overall"/>
        <Card data={works} color="green" classNam="total"/>
        <Card data={completedWorks} color="blueviolet" classNam="completed"/>
        <Card data={salary} color="red" classNam="salary"/>
        <Card data={links} color="cyan" classNam="links"/>
    </div> */}
    </>
  )
}

export default Homepage