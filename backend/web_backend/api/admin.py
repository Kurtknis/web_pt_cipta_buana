from django.contrib import admin
from .models import Konsultasi, Proyek, Gambar, GambarProyek, Biaya, Klien, Kontak

# Register your models here.

admin.site.register(Konsultasi)

'''
class GambarProyekInline(admin.TabularInline):
    model = GambarProyek
    extra = 1

@admin.register(Proyek)
class ProyekAdmin(admin.ModelAdmin):
    inlines = [GambarProyekInline]

admin.site.register(Gambar)
admin.site.register(GambarProyek)
admin.site.register(Biaya)
admin.site.register(Klien)
admin.site.register(Kontak)
'''