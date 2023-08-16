from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from apps.support import *

from django.core.exceptions import ObjectDoesNotExist

from django.core.mail import send_mail
from django.conf import settings

@api_view(['POST'])
def subscribe(request,email):
    try:
        MailSubscribers.objects.create(email=email)
        send_mail(
        'Gracias por suscribirte a Markt',
        'Te suscribiste a las noticias y promociones de Markt',
        settings.EMAIL_HOST_USER,
        [email]
        )
        return Response({"message":"grax"})
    except Exception as e:
        return get_error(e)
    

@api_view(['POST'])
def unsubscribe(request,email):
    try:
        MailSubscribers.objects.get(email=email).delete()
        send_mail(
            'Esperamos que vuelvas pronto',
            'Has dejado de ser suscriptor a las noticias y promociones de Markt',
            settings.EMAIL_HOST_USER,
            [email]
        )
        return Response({"message":"suerte"})
    except Exception as e:
        return get_error(e)