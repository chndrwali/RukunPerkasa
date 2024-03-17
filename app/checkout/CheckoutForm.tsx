import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatPrice';
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Heading from '../components/Heading';
import Button from '../components/Button';
import { Modal } from '@mui/material';

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handleSetPaymentSuccess }) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol visibilitas modal
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

    // Buka modal konfirmasi sebelum submit pembayaran
    setIsModalOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsModalOpen(false);

    if (!stripe || !elements) {
      return;
    }

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
      <Button label={isLoading ? 'Sedang proses' : 'Bayar sekarang'} disabled={isLoading || !stripe || !elements} onClick={handleSubmit} />

      {/* Modal konfirmasi pembayaran */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="bg-white p-6 rounded-md" style={{ width: '300px' }}>
          <h2 className="text-lg font-semibold mb-2">Konfirmasi Pembayaran</h2>
          <p className="mb-4">Apakah Anda yakin ingin melanjutkan pembayaran?</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2  hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            >
              Batal
            </button>

            <button
              onClick={handleConfirmPayment}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-700 focus:outline-none focus:ring focus:blue-blue-300 focus:ring-opacity-40"
            >
              Lanjutkan
            </button>
          </div>
        </div>
      </Modal>
    </form>
  );
};

export default CheckoutForm;
