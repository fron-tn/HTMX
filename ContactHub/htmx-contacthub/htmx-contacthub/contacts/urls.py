from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='index'),
    path('search/', views.search_contacts, name='search'),
    path('create/', views.create_contact, name='create-contact'),
    path(
    "delete/<int:pk>/",
    views.contact_delete,
    name="contact_delete",
),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)