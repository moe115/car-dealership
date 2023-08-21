import React, { Component } from 'react'
import Title from './Title';
import "./Services.css"
import { FaCar, FaChartLine, FaBusinessTime, FaRoad } from 'react-icons/fa';

export default class Services extends Component {

  state = {
    services: [
      {
        icon: <FaCar />,
        title: 'Test drive our cars!',
        info: 'yes, you heard it right ! buyers can test drive any car before buying it'

      },
      {
        icon: <FaChartLine />,
        title: 'Performance enhancements',
        info: 'our cars are modern , tested and serviced !'

      },
      {
        icon: <FaBusinessTime />,
        title: 'open hours ',
        info: ' 9am to 7pm : everyday of the week '

      },
      {
        // icon: <FaRoad />,
        // title: 'Test drive our cars!',
        // info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, illum?'

      }
    ]
  }

  render() {

    let { services } = this.state;

    const servicesList = services.map((service, index) => {
      let { icon, title, info } = service;

      return (
        <article key={index} className="service">
          <span>{icon}</span>
          <h6>{title}</h6>
          <p>{info}</p>
        </article>
      )
    });

    return (
      <section className="services">
        <Title title='Our Services' />
        <div className="services-center">
          {servicesList}
        </div>
      </section>
    )
  }
}
