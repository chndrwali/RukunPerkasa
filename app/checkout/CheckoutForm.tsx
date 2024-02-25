'use client';

import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatPrice';
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Heading from '../components/Heading';
import Button from '../components/Button';

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handleSetPaymentSuccess }) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [clientSecret, handleSetPaymentSuccess, stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((result) => {
        if (!result.error) {
          toast.success('Pembayaran Berhasil');

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }

        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Masukan detail anda untuk proses pembayaran" />
      </div>
      <h2 className="font-semibold mb-2">Informasi Alamat Anda </h2>
      <AddressElement
        options={{
          mode: 'shipping',
          allowedCountries: ['US', 'ID', 'SG'],
        }}
      />
      <h2 className="font-semibold mt-4 mb-2">Informasi Pembayaran </h2>
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <div className="py-4 text-center text-slate-700 text-xl font-bold"> Total : {formattedPrice}</div>
      <Button label={isLoading ? 'Sedang proses' : 'Bayar sekarang'} disabled={isLoading || !stripe || !elements} onClick={() => {}} />
    </form>
  );
};

export default CheckoutForm;
