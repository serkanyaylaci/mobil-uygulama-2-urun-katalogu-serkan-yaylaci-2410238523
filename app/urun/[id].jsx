import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getProductById } from '../../data/products';

/**
 * UYGULAMA 2: Dinamik Ürün Detayı Ekranı (/urun/[id])
 * Föy Gereksinimleri:
 * - [id].jsx ekranında useLocalSearchParams kullanımı
 * - Seçilen ürüne ait ad, fiyat, açıklama, stok bilgisi
 * - Stok 0 ise "Stokta yok" (kırmızı uyarı), diğer durumda "Stokta" yazdırılması (T5 Test Senaryosu)
 * - Ürün bulunmadığında hata ekranı gösterilmesi
 * - Geri gezinme butonu
 * - Öğrenci tasarım kararı ve açıklaması
 */
export default function UrunDetayEkrani() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const product = getProductById(id);

  // ÜRÜN BULUNAMADIĞINDA HATA EKRANI (Föy Kuralı)
  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>🔍</Text>
          <Text style={styles.errorTitle}>Ürün Bulunamadı</Text>
          <Text style={styles.errorText}>
            ID'si "{id}" olan ürün katalog veritabanında bulunmamaktadır.
          </Text>

          <Pressable
            style={styles.backBtnPrimary}
            onPress={() => router.replace('/urunler')}
          >
            <Text style={styles.backBtnPrimaryText}>← Kataloğa Geri Dön</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const inStock = product.stock > 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* ÜRÜN VİTRİN KARTI */}
      <View style={styles.showcaseCard}>
        {/* Kategori & Marka */}
        <View style={styles.badgeRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{product.category}</Text>
          </View>
          {product.brand && (
            <View style={styles.brandBadge}>
              <Text style={styles.brandBadgeText}>{product.brand}</Text>
            </View>
          )}
        </View>

        {/* Ürün Adı */}
        <Text style={styles.productName}>{product.name}</Text>

        {/* Puan ve Ürün Kodu */}
        <View style={styles.ratingRow}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingScore}>{product.rating || '4.8'}</Text>
          <Text style={styles.ratingCount}>/ 5.0 Değerlendirme</Text>
          <Text style={styles.codeText}>• Kod: {product.id}</Text>
        </View>

        {/* FİYAT BÖLÜMÜ */}
        <View style={styles.priceContainer}>
          <Text style={styles.pricePrefix}>Tavsiye Edilen Satış Fiyatı</Text>
          <Text style={styles.priceMain}>
            ₺{Number(product.price).toLocaleString('tr-TR')}
          </Text>
        </View>

        {/* STOK DURUMU (FÖY KURALI) */}
        <View
          style={[
            styles.stockBanner,
            inStock ? styles.stockBannerIn : styles.stockBannerOut,
          ]}
        >
          <Text style={styles.stockIcon}>{inStock ? '✅' : '❌'}</Text>
          <View style={styles.stockTextCol}>
            <Text
              style={[
                styles.stockTitle,
                { color: inStock ? '#047857' : '#991b1b' },
              ]}
            >
              {/* FÖY ŞARTI: Stok 0 ise "Stokta yok", diğer durumda "Stokta" */}
              {inStock ? 'Stokta' : 'Stokta yok'}
            </Text>
            <Text
              style={[
                styles.stockSub,
                { color: inStock ? '#065f46' : '#b91c1c' },
              ]}
            >
              {inStock
                ? `Depomuzda mevcut: ${product.stock} adet hızlı kargo`
                : 'Ürün şu anda temin edilememektedir (T5 Test Senaryosu)'}
            </Text>
          </View>
        </View>
      </View>

      {/* AÇIKLAMA BÖLÜMÜ */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>📄 Ürün Özellikleri & Açıklaması</Text>
        <Text style={styles.descriptionText}>{product.description}</Text>
      </View>

      {/* ÖĞRENCİ TASARIM KARARI (FÖY GEREKSİNİMİ) */}
      <View style={styles.designDecisionCard}>
        <Text style={styles.designTitle}>💡 Tasarım Kararı ve Tercihler</Text>
        <Text style={styles.designText}>
          <Text style={styles.bold}>Tipografi & Hiyerarşi:</Text> Fiyat ve stok
          durumu doğrudan göze çarpacak biçimde yüksek kontrastlı (₺ vurgusu,
          açık yeşil/kırmızı arka plan) tasarlandı.
        </Text>
        <Text style={styles.designText}>
          <Text style={styles.bold}>Renk Paleti:</Text> Teknoloji mağazası
          kimliğini yansıtmak amacıyla açık mavi (#0284c7) ve gri tonları
          tercih edildi.
        </Text>
      </View>

      {/* AKSİYON BUTONLARI */}
      <Pressable
        style={[
          styles.cartBtn,
          !inStock && styles.cartBtnDisabled,
        ]}
        disabled={!inStock}
        onPress={() => alert('Ürün sepete eklendi!')}
      >
        <Text style={styles.cartBtnText}>
          {inStock ? 'Sepete Ekle 🛒' : 'Stok Gelince Haber Ver 🔔'}
        </Text>
      </Pressable>

      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>← Ürün Listesine Geri Dön</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  showcaseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
  },
  brandBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  brandBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284c7',
  },
  productName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 28,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  ratingStar: {
    color: '#f59e0b',
    fontSize: 14,
  },
  ratingScore: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },
  ratingCount: {
    fontSize: 12,
    color: '#64748b',
  },
  codeText: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 6,
  },
  priceContainer: {
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pricePrefix: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 2,
  },
  priceMain: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0284c7',
  },
  stockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    gap: 10,
    borderWidth: 1,
  },
  stockBannerIn: {
    backgroundColor: '#ecfdf5',
    borderColor: '#a7f3d0',
  },
  stockBannerOut: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  stockIcon: {
    fontSize: 20,
  },
  stockTextCol: {
    flex: 1,
  },
  stockTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  stockSub: {
    fontSize: 11,
    marginTop: 1,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  designDecisionCard: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  designTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 6,
  },
  designText: {
    fontSize: 12,
    color: '#14532d',
    lineHeight: 18,
    marginBottom: 4,
  },
  bold: {
    fontWeight: '700',
  },
  cartBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  cartBtnDisabled: {
    backgroundColor: '#94a3b8',
  },
  cartBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  backBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  backBtnText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  errorIcon: {
    fontSize: 42,
    marginBottom: 10,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  errorText: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  backBtnPrimary: {
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backBtnPrimaryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
