# Panel Ve Çark Sunucusu Kurulumu

Panel (`/yonetim/`) ve çarkıfelek numara kaydı tek bir Google Apps Script üzerinden çalışır. Kurulum bir kez yapılır, müşteri GitHub'ı hiç görmez.

## 1. E-Tablo Ve Apps Script

1. Google Drive'da yeni bir E-Tablo aç: **Antalya Abiye Çark Kayıtları**.
2. Menüden **Uzantılar → Apps Script**.
3. Açılan editördeki her şeyi sil, `Kod.gs` dosyasının tamamını yapıştır, kaydet.

## 2. GitHub Erişim Anahtarı (Sadece Biz Yaparız)

1. github.com → Settings → Developer settings → Fine-grained tokens → Generate new token.
2. Repository access: sadece `abdulkadirozkan7/antalyaabiye`.
3. Permissions: **Contents: Read and write**, **Actions: Read-only**.
4. Oluşan anahtarı kopyala.

## 3. Ayarlar

1. Apps Script editöründe fonksiyon listesinden `kurulum` seç → **Çalıştır**. İzin isterse onayla.
2. Sol menü **Proje Ayarları → Komut Dosyası Özellikleri** → `GITHUB_TOKEN` adında yeni özellik ekle, değer olarak anahtarı yapıştır.
3. `sifreBelirle` fonksiyonundaki `YENI_SIFRE = ''` satırına panel şifresini yaz, `sifreBelirle`'yi çalıştır, sonra satırı tekrar boşalt ve kaydet.
   - Kullanıcı adı: `zafer` (değiştirmek için özelliklerdeki `YONETICI_KULLANICI`).

## 4. Yayınla

1. **Dağıt → Yeni dağıtım → Tür: Web uygulaması**.
2. Yürütme: **Ben**, Erişim: **Herkes**.
3. Çıkan `https://script.google.com/macros/s/.../exec` adresini kopyala.
4. `data/site.json` içindeki `ayarlar.yonetimApi` alanına bu adresi yaz ve kaydet. Çark da aynı adresi kullanır.

Kod güncellenirse: **Dağıt → Dağıtımları yönet → Düzenle → Yeni sürüm**. Adres değişmez.

## Notlar

- Şifre GitHub'da hiçbir yerde tutulmaz, sadece Apps Script'te şifrelenmiş (hash) olarak durur.
- 5 hatalı girişten sonra o kullanıcı 15 dakika kilitlenir. Oturum 12 saat sürer.
- Panel fotoğrafları tarayıcıda WebP'ye çevirir ve küçültür (ürün 1800 px, banner 1920 px). Videolar en fazla 20 MB.
- Çark numaraları E-Tablodaki **Çark Kayıtları** sayfasına düşer. SMS göndermeden önce numaraların İYS'ye yüklenmesi gerekir.
