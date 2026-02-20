from django.contrib import admin
from .models import Consultation, Project, HomePortfolio, HomeComparisonImage, ImageProject, Furniture, Price, Client, Contact

# Register your models here.

admin.site.register(Consultation)


class ImageProjectInline(admin.TabularInline):
    model = ImageProject
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    inlines = [ImageProjectInline]

admin.site.register(HomePortfolio)
admin.site.register(HomeComparisonImage)
admin.site.register(ImageProject)
admin.site.register(Price)
admin.site.register(Client)
admin.site.register(Contact)
admin.site.register(Furniture)
