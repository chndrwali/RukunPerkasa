'use client';

import { useCart } from '@/hooks/useCart';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import CheckoutForm from './CheckoutForm';
import Button from '../components/Button';
import { Alert, CircularProgress } from '@mui/material';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const router = useRouter();

  console.log('paymentIntent', paymentIntent);
  console.log('clientSecret', clientSecret);

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartProducts,
          payment_intend_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push('/login');
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.log('Error', error);
          toast.error('Ada yang salah');
        });
    }
  }, [cartProducts, handleSetPaymentIntent, paymentIntent, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);
  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
        </Elements>
      )}
      {loading && (
        <div className="flex flex-col justify-center items-center h-full">
          <CircularProgress color="primary" />
          <p className="text-center">Proses Checkout...</p>;
        </div>
      )}
      {error && (
        <Alert variant="filled" severity="error">
          Ada yang salah
        </Alert>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <Alert variant="filled" severity="success">
            Pembayaran Berhasil
          </Alert>
          <div className="max-w-[220px] w-full">
            <Button label="Lihat Orderan Anda" onClick={() => router.push('/orders')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
