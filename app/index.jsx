import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/products';

/**
 * UYGULAMA 2: Mini Ürün Kataloğu Listesi (/urunler)
 * Föy Gereksinimleri:
 * - En az 5 ürün (6 adet teknoloji ürünü tanımlandı)
 * - Kartta ad, fiyat, kategori ve stok
 * - FlatList kullanımı
 * - ProductCard bileşeni kullanımı
 * - router.push ile /urun/<id> ekranını açma
 */
export default function UrunListesiEkrani() {
  const [products] = useState(getProducts());
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Tümü', 'Aksesuar', 'Ses', 'Ekran', 'Depolama'];

  // Filtreleme
  const filteredProducts = products.filter((p) => {
    const matchCat =
      selectedCategory === 'Tümü' ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      query === '' ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query));

    return matchCat && matchSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* MAĞAZA BAŞLIĞI */}
      <View style={styles.header}>
        <Text style={styles.storeTag}>TEKNOKATALOG • MOBİL MAĞAZA</Text>
        <Text style={styles.title}>Ürün Kataloğu</Text>
        <Text style={styles.subtitle}>
          En son teknoloji çevre birimleri ve aksesuarlar
        </Text>
      </View>

      {/* ARAMA ÇUBUĞU */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Ürün adı veya marka ara..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Text style={styles.clearSearch}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* KATEGORİ YATAY FİLTRE */}
      <View style={styles.categoriesWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.categoryChip,
                selectedCategory === item && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === item && styles.categoryChipTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* ÜRÜN LİSTESİ (FlatList) */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>Ürün Bulunamadı</Text>
            <Text style={styles.emptyText}>
              Arama kriterlerinize uygun teknoloji ürünü listelenemedi.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  storeTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0284c7',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    height: 42,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
  },
  clearSearch: {
    fontSize: 14,
    color: '#94a3b8',
    padding: 4,
  },
  categoriesWrapper: {
    marginBottom: 8,
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryChipActive: {
    backgroundColor: '#0284c7',
    borderColor: '#0284c7',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: '#64748b',
  },
});
