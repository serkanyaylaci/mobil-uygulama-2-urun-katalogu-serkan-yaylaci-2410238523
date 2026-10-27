import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * ProductCard Bileşeni (Uygulama 2: Mini Ürün Kataloğu)
 * Föy Gereksinimi:
 * - Props üzerinden tek ürün alır.
 * - Kartta ad, fiyat, kategori ve stok yer alır.
 * - Stok 0 ise "Stokta yok" (kırmızı), diğer durumda "Stokta" (yeşil) yazdırılır.
 * - Basınca router.push ile /urun/<id> ekranına yönlendirir.
 */
export default function ProductCard({ product }) {
  const router = useRouter();

  if (!product) return null;

  const inStock = product.stock > 0;

  const handlePress = () => {
    router.push(`/urun/${product.id}`);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={handlePress}
    >
      {/* ÜST: KATEGORİ & STOK ROZETİ */}
      <View style={styles.headerRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>

        {/* STOK DURUMU ROZETİ (Föy kuralı: 0 ise "Stokta yok", aksi halde "Stokta") */}
        <View
          style={[
            styles.stockBadge,
            inStock ? styles.stockIn : styles.stockOut,
          ]}
        >
          <View
            style={[
              styles.stockDot,
              { backgroundColor: inStock ? '#10b981' : '#ef4444' },
            ]}
          />
          <Text
            style={[
              styles.stockText,
              { color: inStock ? '#047857' : '#b91c1c' },
            ]}
          >
            {inStock ? `Stokta (${product.stock})` : 'Stokta yok'}
          </Text>
        </View>
      </View>

      {/* ORTA: ÜRÜN ADI & MARKA */}
      <View style={styles.titleArea}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        {product.brand && (
          <Text style={styles.brand}>{product.brand}</Text>
        )}
      </View>

      {/* AÇIKLAMA */}
      {product.description && (
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
      )}

      {/* ALT: FİYAT VE DETAY BUTONU */}
      <View style={styles.footerRow}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Fiyat</Text>
          <Text style={styles.priceText}>
            ₺{Number(product.price).toLocaleString('tr-TR')}
          </Text>
        </View>

        <View style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>İncele →</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardPressed: {
    backgroundColor: '#f8fafc',
    transform: [{ scale: 0.99 }],
    borderColor: '#cbd5e1',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 5,
  },
  stockIn: {
    backgroundColor: '#ecfdf5',
  },
  stockOut: {
    backgroundColor: '#fef2f2',
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  stockText: {
    fontSize: 11,
    fontWeight: '700',
  },
  titleArea: {
    marginBottom: 6,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 22,
  },
  brand: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10,
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0284c7', // Mağaza mavisi
  },
  actionBtn: {
    backgroundColor: '#f0f9ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  actionBtnText: {
    color: '#0369a1',
    fontSize: 13,
    fontWeight: '700',
  },
});
