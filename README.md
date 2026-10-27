# UYGULAMA 2 | Mini Ürün Kataloğu

**Öğrenci Adı Soyadı:** Serkan Yaylacı  
**Öğrenci Numarası:** 2410238523  
**Ders:** Mobil Programlama  
**Konu:** Expo Router Dinamik Ürün Sayfaları, Props Tabanlı Kart Bileşenleri ve Koşullu Stok Yönetimi  

---

## 📌 Senaryo ve Projenin Amacı
Küçük bir teknoloji mağazasının ürünlerini mobil vitrin üzerinden müşterilerine sergilemesi senaryosu üzerine kurulmuştur. Föyün *"Bu uygulama ayrı Expo projesi veya ayrılmış çalışma klasörü olarak hazırlanmalıdır"* şartı doğrultusunda tam bağımsız bir proje olarak geliştirilmiştir.

Uygulamada ürünler dinamik bir listede sunulmakta, kategoriye göre filtrelenebilmekte, her ürün kartına tıklandığında ürünün kendine özel dinamik detay ekranı açılmakta ve stok durumuna göre kullanıcıya özel geri bildirim verilmektedir.

---

## 📱 Ekranlar ve Navigasyon Akışı

```text
app/
├── _layout.jsx        # Root Stack Navigasyonu (Başlık ve tema yönetimi)
├── index.jsx          # Ürün Kataloğu Vitrini (FlatList, Yatay Kategori Çubuğu, Arama)
└── urun/
    └── [id].jsx       # Dinamik Ürün Detayı (/urun/[id] - useLocalSearchParams)
```

1. **Ürün Listesi Ekranı (`/` - `app/index.jsx`):**
   - 6 adet teknoloji ürünü `FlatList` ile dikey olarak listelenir.
   - En üstte yatay kaydırılabilir kategori filtreleri yer alır (`Tümü`, `Aksesuar`, `Ses`, `Ekran`, `Depolama`).
   - Arama çubuğu sayesinde ürün adına veya markaya göre anlık filtreleme yapılır.
   - Her bir ürün `ProductCard` bileşeni ile gösterilir.

2. **Dinamik Ürün Detayı (`/urun/[id]` - `app/urun/[id].jsx`):**
   - `useLocalSearchParams()` kancası kullanılarak URL'den `id` parametresi yakalanır.
   - Ürünün adı, markası, değerlendirme puanı, satış fiyatı, açıklaması ve stok durumu gösterilir.
   - Detaydan ürün listesine dönmek için geri butonu sunulur.

---

## 📦 Veri Sözleşmesi (`data/products.js`)

Föyde zorunlu tutulan başlangıç ürünlerine ekleme yapılarak zengin bir katalog oluşturulmuştur:

| ID | Ürün Adı | Fiyat | Kategori | Stok Durumu | Açıklama |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **p1** | Kablosuz Fare | 450 ₺ | Aksesuar | 8 (Stokta) | Bluetooth 5.2 ergonomik sessiz fare |
| **p2** | Mekanik Klavye | 1.800 ₺ | Aksesuar | **0 (Stokta yok)** | RGB aydınlatmalı, Red Switch Türkçe Q |
| **p3** | Gürültü Engelleyici Kulaklık | 2.400 ₺ | Ses | 5 (Stokta) | Aktif Gürültü Engelleme (ANC) özellikli |
| **p4** | 27 inç 4K Ultra HD Monitör | 8.500 ₺ | Ekran | 3 (Stokta) | IPS panel, %99 sRGB, Type-C 65W PD |
| **p5** | USB-C Çoklayıcı Hub 7-in-1 | 650 ₺ | Aksesuar | 14 (Stokta) | 4K HDMI, 3x USB 3.0, PD hızlı şarj |
| **p6** | Taşınabilir NVMe SSD 1TB | 3.200 ₺ | Depolama | **0 (Stokta yok)** | 1050 MB/s okuma/yazma hızı |

---

## 🎨 Tasarım Kararları ve Gerekçeleri (Föy C Bölümü)

1. **Tipografi ve Hiyerarşi:**
   - E-ticaret alışkanlıklarına uygun olarak ürün adı 22px kalın yazı tipiyle öne çıkarılmış, satış fiyatı ise müşterinin kararını hızlandırmak için 28px boyutunda ve koyu mavi renkle (`#0284c7`) vurgulanmıştır.
2. **Renk Paleti:**
   - Teknoloji mağazası kimliğini temsil etmek için profesyonel gökyüzü mavisi (`#0284c7`), açık gri arka plan (`#f8fafc`) ve temiz beyaz kartlar kullanılmıştır.
3. **Koşullu Stok Tasarımı (Föy Kuralı):**
   - **Stok 0 ise:** Kırmızı uyarı kutusu (`#FEF2F2`), kırmızı ikon (`❌`) ve kalın **“Stokta yok”** metni gösterilir. Sepete ekle butonu devre dışı bırakılır ve buton metni *"Stok Gelince Haber Ver"* olur.
   - **Stok > 0 ise:** Yeşil onay kutusu (`#ECFDF5`), yeşil ikon (`✅`) ve **“Stokta (X adet)”** metni gösterilir.

---

## 🛡️ Hata Ekranı ve Parametre Koruması
- URL üzerinden katalogda yer almayan bir ID girildiğinde (Örn: `/urun/p999`), uygulama çökmez.
- Kullanıcıya *"🔍 Ürün Bulunamadı"* başlığı ve *"← Kataloğa Geri Dön"* butonu içeren temiz bir hata sayfası gösterilir.

---

## 🧪 İlgili Test Senaryoları ve Sonuçları

| Test No | Senaryo | Beklenen Sonuç | Gerçekleşen Sonuç | Durum |
| :---: | :--- | :--- | :--- | :---: |
| **T5** | Stok=0 olan ürünü aç (`p2` Mekanik Klavye) | “Stokta yok” yazısı görünür | Kırmızı şerit içinde "Stokta yok" yazdırıldı | **GEÇTİ [X]** |
| **T6** | İkinci bir ürüne geç (`p1` $\rightarrow$ `p3`) | Doğru ürün ayrıntıları görünür | Kulaklık sayfasına geçildiğinde Sony kulaklık bilgileri açıldı | **GEÇTİ [X]** |

---

## 🚀 Kurulum ve Çalıştırma

```bash
# Proje dizinine geçin
cd "c:\Mobil Programlama\Uygulama2-MiniUrunKatalogu_serkan_yaylaci_2410238523"

# Expo geliştirici sunucusunu başlatın
npx expo start
```

- **Tarayıcıda test etmek için:** Terminalde `w` tuşuna basın.
- **Android Emülatör için:** `a` tuşuna basın.
- **Expo Go ile telefonda test etmek için:** Terminaldeki QR kodu taratın.
