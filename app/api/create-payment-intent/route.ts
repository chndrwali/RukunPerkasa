import Stripe from 'stripe';
import getCurrentUser from '@/actions/getCurrentUser';
import { CartProductType } from '@/app/product/[productId]/ProductDetails';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

const calculatedOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;

    return acc + itemTotal;
  }, 0);

  const price: any = Math.floor(totalPrice);

  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intend_id } = body;
  const total = calculatedOrderAmount(items) * 100;
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: 'usd',
    status: 'complete',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intend_id,
    products: items,
  };

  if (payment_intend_id) {
    const current_intent = await stripe.paymentIntents.retrieve(payment_intend_id);

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(payment_intend_id, { amount: total });
      //update the order

      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: {
            paymentIntentId: payment_intend_id,
          },
        }),
        prisma.order.update({
          where: { paymentIntentId: payment_intend_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json({ error: 'Invalid Payment Intent' }, { status: 400 });
      }

      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    //create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    //create the order
    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }
}
