from rest_framework.decorators import api_view
from rest_framework.response import Response
from store.models import Category

from django.shortcuts import get_object_or_404
from rest_framework import status

from rest_framework import viewsets
from payment.models import Payment
from api.serializers.payment_serializers import PaymentSerializer, ShippingAddressSerializer

#dev_8_2_Fruit
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    

