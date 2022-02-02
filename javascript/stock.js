export const STOCK = [
    {
        nombre: 'Monitor Samsung 24" T350H FHD IPS 75Hz',
        precio: 26920,
        url: 'https://images.samsung.com/is/image/samsung/latin-uhd-u28r550uql-lu28r550uqlxzx-frontblack-207614989?$720_576_PNG$'
    },
    {
        nombre: 'Mouse Logitech G403 Hero Gaming',
        precio: 2130,
        url: 'https://resource.logitechg.com/d_transparent.gif/content/dam/products/gaming/mice/g403-prodigy-wired-gaming-mouse/g403-prodigy-gaming-mouse64709.png'
    },
    {
        nombre: 'SILLA GAMER CORSAIR T3 RUSH GREY / GREY',
        precio: 69999,
        url: 'https://i.pinimg.com/originals/02/ac/94/02ac947de264f32b8d4cb4f7cfb3b67d.png'
    },
    {
        nombre: 'Monitor curvo Asus TUF VG24VQ led negro',
        precio: 35000,
        url: 'https://www.asus.com/media/global/gallery/diftvhwfwrtmwria_setting_xxx_0_90_end_800.png'
    },
    {
        nombre: 'Monitor Acer KG1 KG271 led negro',
        precio: 53230,
        url: 'https://one-tech.es/wp-content/uploads/2019/09/acer_Nitro_XV273U-1000x831.png'
    },
    {
        nombre: 'Monitor gamer Gigabyte G27F led',
        precio: 56530,
        url: 'https://www.gigabyte.com/FileUpload/Global/KeyFeature/1468/innergigabyteimages//bg1_m.png'
    },
    {
        nombre: 'Monitor gamer BenQ XL Series XL2430 TN',
        precio: 59999,
        url: 'https://www.benq.com/content/dam/zowie/en/product/monitor/xl/xl/xl2546-refurb/gallery/01-xl2546-xl-black-front.png'
    },
    {
        nombre: 'Notebook Lenovo IdeaPad 15ALC6 AMD Ryzen 5 5500U',
        precio: 111999,
        url: 'https://www.lenovo.com/medias/lenovo-laptop-v310-14-hero.png?context=bWFzdGVyfHJvb3R8NTYwMjJ8aW1hZ2UvcG5nfGg2Ni9oOTUvOTMxMzM5MzYzOTQ1NC5wbmd8Y2E2YzdjZmU4MzU1MTBkM2NiNTRjZjg4Mjk2MDNiOGVmNDYwZmVkMzI2MzU3ZTVlNTdlYzQ0Mzc0M2RlYjIwMA'
    },
    {
        nombre: 'Apple Macbook Air 13" Chip M1, 256 GB SSDo',
        precio: 180000,
        url: 'https://media.croma.com/image/upload/v1606585888/Croma%20Assets/Computers%20Peripherals/Laptop/Images/9009479057438.png'
    },
    {
        nombre: 'Mouse Razer DeathAdder Essential negro',
        precio: 3699,
        url: 'https://assets.razerzone.com/eeimages/products/25919/daelite_gallery02.png'
    },
    {
        nombre: 'Mouse Gaming G703 Lightspeed Wireless',
        precio: 8999,
        url: 'https://logitechar.vteximg.com.br/arquivos/ids/157137-1000-1000/910-005639-1.png?v=637064255984200000'
    }
]

STOCK.sort(function (a, b) {
    if (a.precio > b.precio) {
      return 1;
    }
    if (a.precio < b.precio) {
      return -1;
    }
    return 0;
  });
  STOCK.forEach((element,index) =>{
    element.id = index
})
export default STOCK