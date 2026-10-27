// UYGULAMA 2: MİNİ ÜRÜN KATALOĞU VERİLERİ
// Föy gereksinimi: En az 5 ürün; kartta ad, fiyat, kategori ve stok.
// Stok 0 durumu test senaryosu T5 için kontrol edilecektir.

export const products = [
  {
    id: 'p1',
    name: 'Kablosuz Fare',
    price: 450,
    category: 'Aksesuar',
    stock: 8,
    description: 'Bluetooth 5.2 ve 2.4GHz kablosuz bağlantılı, ergonomik sessiz tıklamalı optik fare. Şarj edilebilir bataryası ile 60 güne kadar kullanım sunar.',
    brand: 'LogiTech',
    rating: 4.7,
  },
  {
    id: 'p2',
    name: 'Mekanik Klavye',
    price: 1800,
    category: 'Aksesuar',
    stock: 0, // Test Senaryosu T5: "Stokta yok" durumu
    description: 'RGB aydınlatmalı, Red Switch mekanik tuşlu, Türkçe Q dizilimli profesyonel oyuncu ve yazılımcı klavyesi. Alüminyum kasa gövdeye sahiptir.',
    brand: 'Keychron',
    rating: 4.9,
  },
  {
    id: 'p3',
    name: 'Gürültü Engelleyici Kulaklık',
    price: 2400,
    category: 'Ses',
    stock: 5,
    description: 'Aktif Gürültü Engelleme (ANC) özellikli, 40 saat çalma süreli, yüksek çözünürlüklü Hi-Res ses sertifikalı Bluetooth kulaküstü kulaklık.',
    brand: 'Sony',
    rating: 4.8,
  },
  {
    id: 'p4',
    name: '27 inç 4K Ultra HD Monitör',
    price: 8500,
    category: 'Ekran',
    stock: 3,
    description: 'IPS panel, %99 sRGB renk doğruluğu, Type-C 65W güç iletimi ve DisplayPort bağlantı desteğine sahip tasarımcı ve yazılımcı monitörü.',
    brand: 'Dell',
    rating: 4.6,
  },
  {
    id: 'p5',
    name: 'USB-C Çoklayıcı Hub 7-in-1',
    price: 650,
    category: 'Aksesuar',
    stock: 14,
    description: '4K HDMI çıkışı, 3 adet USB 3.0 portu, SD/MicroSD kart okuyucu ve 100W PD hızlı şarj destekli alüminyum gövdeli çoklayıcı adaptör.',
    brand: 'Anker',
    rating: 4.5,
  },
  {
    id: 'p6',
    name: 'Taşınabilir NVMe SSD 1TB',
    price: 3200,
    category: 'Depolama',
    stock: 0, // Bir başka stok 0 örneği
    description: '1050 MB/s okuma ve yazma hızına sahip, düşmelere ve suya dayanıklı cep boyutunda ultra hızlı harici depolama diski.',
    brand: 'Samsung',
    rating: 4.9,
  },
];

export const getProducts = () => products;

export const getProductById = (id) => {
  return products.find((p) => String(p.id) === String(id));
};
