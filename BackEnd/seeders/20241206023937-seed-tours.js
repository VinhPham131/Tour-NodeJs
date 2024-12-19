'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tours', [
      {
        id: 1,
        image: "1.jpg",
        sale_off: 10,
        place: "Cuba",
        title: "Cuba Sailing Adventure",
        cost: "100",
        region: "North America",
        description: "Embark on an unforgettable Cuba Sailing Adventure, where azure waters, unspoiled beaches, and vibrant Cuban culture converge to create a once-in-a-lifetime journey. This unique sailing experience takes you along the pristine coastlines and secluded islands.",
        rating: 5.00,
        reviews_count: 4,
        arrive_day: new Date("2024-12-09T17:00:00.000Z"),
        depart_day: new Date("2024-12-14T17:00:00.000Z"),
        type: "Adventure",
        group_size: 50,
        language: "English",
        thumbnails: JSON.stringify([
          "https://media.istockphoto.com/id/89909597/fr/photo/de-la-planche-%C3%A0-voile-dans-le-centre-de-vill%C3%A9giature-des-cara%C3%AFbes.webp?a=1&b=1&s=612x612&w=0&k=20&c=3PzrOzJ2_O8Y2uEhYdCaYe1SfiDnIHg_Fa23pnN-1do=",
          "https://media.istockphoto.com/id/2160601707/fr/photo/une-voile-blanche-solitaire-dans-la-mer-turquoise-%C3%A0-c%C3%B4t%C3%A9-dune-plage-de-sable.webp?a=1&b=1&s=612x612&w=0&k=20&c=83Fspv7JRH-zvunbrRiZwH2N2ajJ2ZcKSFQFKx-ibbQ=",
          "https://media.istockphoto.com/id/90083557/fr/photo/voile-montre-un-d%C3%A9but-de-leau.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZuTDgNjVGyxifJ_GnBcheHLmg8Qud67fa5m7fNzzqwA=",
          "https://media.istockphoto.com/id/187825648/fr/photo/chat-de-mer.webp?a=1&b=1&s=612x612&w=0&k=20&c=Up5TImJBI-SxBQiXLuuAyCjLpbyKG8FqIwYa1sEFMg4="
        ]),        
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        image: "2.jpg",
        sale_off: 5,
        place: "USA",
        title: "Tour in New York",
        cost: "20",
        region: "North America",
        description: "Visit historic landmarks and enjoy Italian cuisine.",
        rating: 5.00,
        reviews_count: 20,
        arrive_day: new Date("2024-12-11T17:00:00.000Z"),
        depart_day: new Date("2024-12-15T17:00:00.000Z"),
        type: "Romantic",
        group_size: 40,
        language: "Italian",
        thumbnails: JSON.stringify([
          "https://images.unsplash.com/photo-1585869388887-72e92fccd798?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1532952626554-d0cace1cd3fc?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1532952626554-d0cace1cd3fc?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://newyorktourshuttle.com/wp-content/uploads/2019/03/tour-sol9.jpg"
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        image: "3.jpg",
        sale_off: null,
        place: "Greece",
        title: "Discover Greece",
        cost: "150",
        region: "Europe",
        description: "Explore the beauty of Greece with a group of like-minded travelers.",
        rating: 5.00,
        reviews_count: 15,
        arrive_day: new Date("2024-12-20T17:00:00.000Z"),
        depart_day: new Date("2024-12-23T17:00:00.000Z"),
        type: "Romantic",
        group_size: 40,
        language: "Greek",
        thumbnails: JSON.stringify([
          "https://images.unsplash.com/photo-1636323562550-dd95dd4e3407?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RGlzY292ZXIlMjBHcmVlY2V8ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1650955674235-c08e94547edb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RGlzY292ZXIlMjBHcmVlY2V8ZW58MHx8MHx8fDA%3D",
          "https://cdn.scenicglobal.com/webfile/ECYC-2D17.jpg",
          "https://greekcitytimes.com/wp-content/uploads/2024/11/greece-1024x600.jpeg"
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        image: "4.jpg",
        sale_off: null,
        place: "Vietnam",
        title: "Museum of Modern Art",
        cost: "200",
        region: "Asia",
        description: "Explore the Museum of Modern Art in the heart of Hanoi.",
        rating: 5.00,
        reviews_count: 10,
        arrive_day: new Date("2024-12-25T17:00:00.000Z"),
        depart_day: new Date("2024-12-30T17:00:00.000Z"),
        type: "Cultural",
        group_size: 40,
        language: "Vietnamese",
        thumbnails: JSON.stringify([
          "https://vietnam.travel/sites/default/files/inline-images/Kh%C3%B4ng%20gian%20The%20Factory%20v%E1%BB%9Bi%20tri%E1%BB%83n%20l%C3%A3m%20_Nh%E1%BA%B7t%20l%C3%A1%20r%E1%BB%ABng%20x%C6%B0a_%2C%20ngh%E1%BB%87%20s%C4%A9%20V%C3%B5%20Tr%C3%A2n%20Ch%C3%A2u.jpg",
          "https://vnfam.vn/static/media/anh-truoc-mat-bao-tang.c767f73c.jpg",
          "https://image.vietnam.travel/sites/default/files/2022-07/Kh%C3%B4ng%20gian%20The%20Factory%20v%E1%BB%9Bi%20tri%E1%BB%83n%20l%C3%A3m%20_Giao%20di%E1%BB%87n_%2C%20ngh%E1%BB%87%20s%C4%A9%20Oanh%20Phi%20Phi%20_0.jpg?v=1733283901",
          "https://welcometosaigon.com/wp-content/uploads/2021/12/Ho-Chi-Minh-City-Museum-of-Fine-Arts.jpg"
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        image: "5.jpg",
        sale_off: 20,
        place: "Bali",
        title: "Peek Mountain View",
        cost: "58",
        region: "Asia",
        description: "Experience the serene beauty of Bali mountains.",
        rating: 4.00,
        reviews_count: 0,
        arrive_day: new Date("2024-12-01T17:00:00.000Z"),
        depart_day: new Date("2024-12-05T17:00:00.000Z"),
        type: "Adventure",
        group_size: 40,
        language: "English",
        thumbnails: JSON.stringify([
          "https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UGVlayUyME1vdW50YWluJTIwVmlld3xlbnwwfHwwfHx8MA%3D%3D",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/541510517.jpg?k=e5c40d7f4d631f4e226f2ad239c7dd83495c0980afc786e5b2dd43d36a3e3dbe&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/541506826.jpg?k=93d2d47b5bb0986ac82f29c9963d9fc8bd3fd94111cc923aa09db90aff919115&o=&hp=1"
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        image: "6.jpg",
        sale_off: 25,
        place: "Bangkok",
        title: "Hot Balloon Journey",
        cost: "40",
        region: "Asia",
        description: "An unforgettable hot air balloon experience.",
        rating: 4.00,
        reviews_count: 0,
        arrive_day: new Date("2024-12-06T17:00:00.000Z"),
        depart_day: new Date("2024-12-10T17:00:00.000Z"),
        type: "Adventure",
        group_size: 50,
        language: "English",
        thumbnails: JSON.stringify([
          "https://www.hotairballoonbangkok.com/images/0-l-hot-air-baloon-ride-near-bangkok-airventures-hot-air-ballon.jpg",
          "https://www.explore.com/img/gallery/heres-why-a-hot-air-balloon-ride-in-cappadocia-should-be-on-your-bucket-list/l-intro-1673969469.jpg",
          "https://live.staticflickr.com/65535/51008593020_84f2fe46a6_o.jpg",
          "https://visitathertontablelands.com/wp-content/uploads/2020/02/Hot-air-balloon-Mareeba-2-1260x700.jpg"
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tours', null, {});
  }
};
