const ROOT = 'http://localhost:8000';
const caseUrl = slug => ROOT + `/assets/cases/${slug}/`;
const cover = slug => caseUrl(slug) + 'cover.jpg';
const logo = slug => caseUrl(slug) + 'logo.png';
const fakeData = (slug, props = {}) => {
  return {
    slug,
    cover: cover(slug),
    ...props
  };
};

export default [
  fakeData('vynilly', {
    title: 'Vinyl-ly',
    shortTitle: 'Vinyl-ly',
    header: {
      type: 'prototype',
      title: 'Vinyl_-ly'
    },
    quote: {
      text: 'Record collecting is an infinite journey backwards',
      author: 'Zach Cowie',
      logo: logo('vynilly')
    },
    sections: [
      { image: caseUrl('vynilly') + 'showcase_1.png' }
    ],
    info: {
      technique: ['react', 'webpack', 'babel'],
      description: 'A music player combining new technology with some old school feelings',
      link: { link: { url: 'https://github.com/DanieloFleming/vinyl-ly', label: 'Github' } }
    }
  }),
  fakeData('tanya-heath', {
    title: 'Tanya Heath',
    shortTitle: 'T-Heat',
    header: {
      type: 'Website',
      title: 'Tanya Heath'
    },
    quote: {
      text: 'High heels were invented by a woman who had been kissed on the forehead',
      author: 'Christopher Morley',
      logo: logo('tanya-heath')
    },
    sections: [
      { image: caseUrl('tanya-heath') + 'showcase_1.png' },
      {
        background: '#fff5ed',
        image: caseUrl('tanya-heath') + 'showcase_2.png',
        maxWidth: '700px'
      }
    ],
    info: {
      technique: ['html/css', 'php', 'magento'],
      description: 'A webshop for buying custom shoes and heel products by Tanya Heath',
      link: { link: { url: 'http://tanyaheath.nl/', label: 'Visited Site' } }
    }
  }),
  fakeData('rz-basketball', {
    title: 'RZ BasketBall',
    shortTitle: 'RZ-Ball',
    header: {
      type: 'website',
      title: 'RZ Basket_Ball'
    },
    quote: {
      text: 'These young guys are playing checkers. I\'m out there playing chess',
      author: 'Kobe Bryant',
      logo: logo('rz-basketball')
    },
    sections: [
      { image: caseUrl('rz-basketball') + 'showcase_1.png' },
      {
        background: '#1f8742',
        image: caseUrl('rz-basketball') + 'showcase_2.png'
      },
      { image: caseUrl('rz-basketball') + 'showcase_3.png' },
      {
        component: 'html',
        className: 'dark',
        style: { paddingBottom: 0 },
        content: '<h2 style="font-size: 48px"data-delay="0">#WEARERZ</h2>'
      },
      {
        component: 'html',
        className: 'dark',
        style: {
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          paddingTop: '2rem'
        },
        content: `
          <img data-delay="0" src="${caseUrl('rz-basketball')}insta/11.jpg" style="width:calc(20% - 10px);  height: auto; margin: 5px">
          <img data-delay="0.15" src="${caseUrl('rz-basketball')}insta/1.jpg" style="width:calc(20% - 10px);  height: auto; margin: 5px">
          <img data-delay="0.30" src="${caseUrl('rz-basketball')}insta/2.jpg" style="width:calc(20% - 10px);  height: auto; margin: 5px">
          <img data-delay="0.45" src="${caseUrl('rz-basketball')}insta/3.jpg" style="width:calc(20% - 10px);  height: auto; margin: 5px">
          <img data-delay="0.60" src="${caseUrl('rz-basketball')}insta/4.jpg" style="width:calc(20% - 10px);  height: auto; margin: 5px">
          <img data-delay="0.75" src="${caseUrl('rz-basketball')}insta/5.jpg" style="width:calc(20% - 10px);  height: auto; margin: 5px">
          <img data-delay="0.90" src="${caseUrl('rz-basketball')}insta/6.jpg" style="width:calc(20% - 10px);  height: auto; margin: 5px">
          <img data-delay="1.05" src="${caseUrl('rz-basketball')}insta/7.jpg" style="width:calc(20% - 10px);  height: auto; margin: 5px">
          <img data-delay="1.20" src="${caseUrl('rz-basketball')}insta/8.jpg" style="width:calc(20% - 10px);  height: auto; margin: 5px">
          <img data-delay="1.35" src="${caseUrl('rz-basketball')}insta/9.jpg" style="width:calc(20% - 10px);  height: auto; margin: 5px">
       `
      }
    ],
    info: {
      technique: ['html/css', 'javascript', 'php', 'wordpress'],
      description: 'The homepage for Rotterdam-Zuid Basketball',
      collaboration: [
        { link: { url: 'http://sapphirewebstudio.com/', label: 'Joey Teng' } },
        { link: { url: 'http://superbruut.nl/', label: 'Thijs Janssen' } }
      ],
      link: { link: { url: 'http://www.rotterdamzuid.com/', label: 'Visit Side' } }
    }
  }),
  fakeData('noted', {
    title: 'Noted',
    shortTitle: 'N-oted',
    header: {
      type: 'application',
      title: 'Noted'
    },
    quote: {
      text: 'As it was written, so it shall be done.',
      author: 'George Patton',
      logo: logo('noted')
    }
  }),
  fakeData('cafe-de-kroeg', {
    title: 'Cafe de Kroeg',
    shortTitle: 'De-Kroeg',
    header: {
      type: 'Website',
      title: 'Cafe De Kroeg'
    },
    quote: {
      text: 'Beauty is in the eye of the beer holder',
      author: 'Kinky Friedman',
      logo: caseUrl('cafe-de-kroeg') + 'logo.jpg'
    }
  }),
  fakeData('lucidicy', {
    title: 'Luci_dicy',
    shortTitle: 'Luci-Dicy',
    header: {
      type: 'Application',
      title: 'Luci_dicy'
    },
    quote: {
      text: 'You white folks see UFO\'s in your dreams. You don\'t hear about Martians in Harlem',
      author: 'Paul Mooney',
      logo: logo('lucidicy')
    }
  })
];
