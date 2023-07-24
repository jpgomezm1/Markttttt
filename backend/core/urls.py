from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [    
    path('admin/', admin.site.urls),
    path('user/',include('django.contrib.auth.urls')),
    path('user/',include('apps.user.urls')),
    path('api/stores/',include('apps.stores.urls')),
    path('api/products/',include('apps.products.urls')),
    path('lists/',include('apps.lists.urls')),
    path('orders/',include('apps.orders.urls')),
    path('mail/',include('apps.mail.urls')),
    path('stores/',include('apps.stores.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]